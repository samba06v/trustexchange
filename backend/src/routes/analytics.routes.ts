import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller.js';

const router = Router();
const analyticsController = new AnalyticsController();

router.get('/platform', analyticsController.getPlatformStats);
router.get('/merchant/:walletAddress', analyticsController.getMerchantAnalytics);

export default router;
