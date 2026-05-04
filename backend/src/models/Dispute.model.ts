import mongoose, { Schema, Document } from 'mongoose';

export interface IDispute extends Document {
  disputeId: string;
  tradeId: string;
  initiator: string;
  respondent: string;
  reason: string;
  status: 'open' | 'evidence_submission' | 'under_review' | 'resolved';
  evidence: Array<{
    submittedBy: string;
    type: 'receipt' | 'screenshot' | 'transaction_id' | 'other';
    url: string;
    description: string;
    timestamp: Date;
  }>;
  arbiterDecision?: {
    winner: string;
    reasoning: string;
    timestamp: Date;
  };
  createdAt: Date;
  resolvedAt?: Date;
}

const DisputeSchema = new Schema<IDispute>({
  disputeId: { type: String, required: true, unique: true },
  tradeId: { type: String, required: true },
  initiator: { type: String, required: true },
  respondent: { type: String, required: true },
  reason: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['open', 'evidence_submission', 'under_review', 'resolved'],
    default: 'open'
  },
  evidence: [{
    submittedBy: String,
    type: { type: String, enum: ['receipt', 'screenshot', 'transaction_id', 'other'] },
    url: String,
    description: String,
    timestamp: { type: Date, default: Date.now }
  }],
  arbiterDecision: {
    winner: String,
    reasoning: String,
    timestamp: Date
  },
  resolvedAt: Date
}, {
  timestamps: true
});

export const Dispute = mongoose.model<IDispute>('Dispute', DisputeSchema);
