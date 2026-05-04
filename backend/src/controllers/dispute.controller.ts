import { Request, Response } from 'express';
import { Dispute } from '../models/Dispute.model.js';
import { Trade } from '../models/Trade.model.js';
import { v4 as uuidv4 } from 'uuid';

export class DisputeController {
  createDispute = async (req: Request, res: Response) => {
    try {
      const { tradeId, initiator, reason } = req.body;

      const trade = await Trade.findOne({ tradeId });
      if (!trade) {
        return res.status(404).json({ success: false, error: 'Trade not found' });
      }

      const respondent = trade.buyer === initiator ? trade.seller : trade.buyer;

      const dispute = await Dispute.create({
        disputeId: uuidv4(),
        tradeId,
        initiator,
        respondent,
        reason,
        status: 'open',
        evidence: []
      });

      trade.status = 'disputed';
      trade.disputeId = dispute.disputeId;
      await trade.save();

      const io = req.app.get('io');
      io.to(respondent).emit('dispute:created', dispute);

      res.status(201).json({ success: true, data: dispute });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  submitEvidence = async (req: Request, res: Response) => {
    try {
      const { disputeId } = req.params;
      const { submittedBy, type, url, description } = req.body;

      const dispute = await Dispute.findOne({ disputeId });
      if (!dispute) {
        return res.status(404).json({ success: false, error: 'Dispute not found' });
      }

      dispute.evidence.push({
        submittedBy,
        type,
        url,
        description,
        timestamp: new Date()
      });

      dispute.status = 'evidence_submission';
      await dispute.save();

      const otherParty = dispute.initiator === submittedBy ? dispute.respondent : dispute.initiator;
      const io = req.app.get('io');
      io.to(otherParty).emit('dispute:evidence_submitted', { disputeId, evidence: dispute.evidence });

      res.json({ success: true, data: dispute });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  getDisputeDetails = async (req: Request, res: Response) => {
    try {
      const { disputeId } = req.params;
      const dispute = await Dispute.findOne({ disputeId });

      if (!dispute) {
        return res.status(404).json({ success: false, error: 'Dispute not found' });
      }

      res.json({ success: true, data: dispute });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  resolveDispute = async (req: Request, res: Response) => {
    try {
      const { disputeId } = req.params;
      const { winner, reasoning } = req.body;

      const dispute = await Dispute.findOne({ disputeId });
      if (!dispute) {
        return res.status(404).json({ success: false, error: 'Dispute not found' });
      }

      dispute.status = 'resolved';
      dispute.arbiterDecision = {
        winner,
        reasoning,
        timestamp: new Date()
      };
      dispute.resolvedAt = new Date();
      await dispute.save();

      const io = req.app.get('io');
      io.to(dispute.initiator).emit('dispute:resolved', dispute);
      io.to(dispute.respondent).emit('dispute:resolved', dispute);

      res.json({ success: true, data: dispute });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}
