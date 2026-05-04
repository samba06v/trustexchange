import { Request, Response } from 'express';
import { Trade } from '../models/Trade.model.js';
import { BlockchainService } from '../services/blockchain.service.js';
import { v4 as uuidv4 } from 'uuid';

export class TradeController {
  private blockchainService: BlockchainService;

  constructor() {
    this.blockchainService = new BlockchainService();
  }

  initiateTrade = async (req: Request, res: Response) => {
    try {
      const { buyer, seller, amount, currency, cryptoAmount, paymentMethod, paymentDetails } = req.body;

      const trade = await Trade.create({
        tradeId: uuidv4(),
        buyer,
        seller,
        amount,
        currency,
        cryptoAmount,
        cryptoCurrency: 'USDT',
        paymentMethod,
        paymentDetails,
        status: 'initiated'
      });

      const io = req.app.get('io');
      io.to(seller).emit('trade:new', trade);

      res.status(201).json({ success: true, data: trade });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  confirmEscrow = async (req: Request, res: Response) => {
    try {
      const { tradeId } = req.params;
      const { txHash } = req.body;

      const trade = await Trade.findOne({ tradeId });
      if (!trade) {
        return res.status(404).json({ success: false, error: 'Trade not found' });
      }

      // Verify transaction on blockchain
      const isValid = await this.blockchainService.verifyEscrowTransaction(txHash, trade.cryptoAmount);
      
      if (!isValid) {
        return res.status(400).json({ success: false, error: 'Invalid escrow transaction' });
      }

      trade.status = 'escrowed';
      trade.escrowTxHash = txHash;
      await trade.save();

      const io = req.app.get('io');
      io.to(trade.buyer).emit('trade:escrowed', trade);

      res.json({ success: true, data: trade });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  confirmFiatSent = async (req: Request, res: Response) => {
    try {
      const { tradeId } = req.params;

      const trade = await Trade.findOne({ tradeId });
      if (!trade) {
        return res.status(404).json({ success: false, error: 'Trade not found' });
      }

      trade.status = 'fiat_sent';
      await trade.save();

      const io = req.app.get('io');
      io.to(trade.seller).emit('trade:fiat_sent', trade);

      res.json({ success: true, data: trade });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  releaseFunds = async (req: Request, res: Response) => {
    try {
      const { tradeId } = req.params;
      const { txHash } = req.body;

      const trade = await Trade.findOne({ tradeId });
      if (!trade) {
        return res.status(404).json({ success: false, error: 'Trade not found' });
      }

      trade.status = 'completed';
      trade.releaseTxHash = txHash;
      trade.completedAt = new Date();
      await trade.save();

      const io = req.app.get('io');
      io.to(trade.buyer).emit('trade:completed', trade);

      res.json({ success: true, data: trade });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  getTradeDetails = async (req: Request, res: Response) => {
    try {
      const { tradeId } = req.params;
      const trade = await Trade.findOne({ tradeId });

      if (!trade) {
        return res.status(404).json({ success: false, error: 'Trade not found' });
      }

      res.json({ success: true, data: trade });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  getUserTrades = async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;
      const trades = await Trade.find({
        $or: [{ buyer: walletAddress }, { seller: walletAddress }]
      }).sort({ createdAt: -1 });

      res.json({ success: true, data: trades });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}
