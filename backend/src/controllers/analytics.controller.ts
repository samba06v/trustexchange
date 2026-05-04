import { Request, Response } from 'express';
import { Trade } from '../models/Trade.model.js';
import { Merchant } from '../models/Merchant.model.js';
import { Dispute } from '../models/Dispute.model.js';

export class AnalyticsController {
  getPlatformStats = async (req: Request, res: Response) => {
    try {
      const totalTrades = await Trade.countDocuments();
      const completedTrades = await Trade.countDocuments({ status: 'completed' });
      const activeTrades = await Trade.countDocuments({ status: { $in: ['initiated', 'escrowed', 'fiat_sent'] } });
      const disputedTrades = await Trade.countDocuments({ status: 'disputed' });
      
      const totalVolume = await Trade.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$cryptoAmount' } } }
      ]);

      const successRate = totalTrades > 0 ? (completedTrades / totalTrades) * 100 : 0;

      res.json({
        success: true,
        data: {
          totalTrades,
          completedTrades,
          activeTrades,
          disputedTrades,
          totalVolume: totalVolume[0]?.total || 0,
          successRate: successRate.toFixed(2)
        }
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  getMerchantAnalytics = async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;

      const merchant = await Merchant.findOne({ walletAddress });
      if (!merchant) {
        return res.status(404).json({ success: false, error: 'Merchant not found' });
      }

      const trades = await Trade.find({
        $or: [{ buyer: walletAddress }, { seller: walletAddress }]
      });

      const completedTrades = trades.filter(t => t.status === 'completed');
      const totalVolume = completedTrades.reduce((sum, t) => sum + t.cryptoAmount, 0);
      const avgTradeSize = completedTrades.length > 0 ? totalVolume / completedTrades.length : 0;

      res.json({
        success: true,
        data: {
          totalTrades: trades.length,
          completedTrades: completedTrades.length,
          totalVolume,
          avgTradeSize,
          rating: merchant.rating,
          tier: merchant.tier
        }
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}
