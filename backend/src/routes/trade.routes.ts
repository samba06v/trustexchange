import { Router } from 'express';
import { TradeController } from '../controllers/trade.controller.js';

const router = Router();
const tradeController = new TradeController();

router.post('/initiate', tradeController.initiateTrade);
router.post('/:tradeId/escrow', tradeController.confirmEscrow);
router.post('/:tradeId/fiat-sent', tradeController.confirmFiatSent);
router.post('/:tradeId/release', tradeController.releaseFunds);
router.get('/:tradeId', tradeController.getTradeDetails);
router.get('/user/:walletAddress', tradeController.getUserTrades);

export default router;
