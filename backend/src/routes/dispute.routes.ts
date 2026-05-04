import { Router } from 'express';
import { DisputeController } from '../controllers/dispute.controller.js';

const router = Router();
const disputeController = new DisputeController();

router.post('/create', disputeController.createDispute);
router.post('/:disputeId/evidence', disputeController.submitEvidence);
router.get('/:disputeId', disputeController.getDisputeDetails);
router.post('/:disputeId/resolve', disputeController.resolveDispute);

export default router;
