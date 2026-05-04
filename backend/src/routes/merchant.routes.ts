import { Router } from 'express';
import { MerchantController } from '../controllers/merchant.controller.js';

const router = Router();
const merchantController = new MerchantController();

router.post('/register', merchantController.registerMerchant);
router.get('/:walletAddress', merchantController.getMerchantProfile);
router.post('/:walletAddress/offers', merchantController.createOffer);
router.put('/:walletAddress/offers/:offerId', merchantController.updateOffer);
router.get('/offers/active', merchantController.getActiveOffers);

export default router;
