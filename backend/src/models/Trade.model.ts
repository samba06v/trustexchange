import mongoose, { Schema, Document } from 'mongoose';

export interface ITrade extends Document {
  tradeId: string;
  buyer: string;
  seller: string;
  amount: number;
  currency: string;
  cryptoAmount: number;
  cryptoCurrency: string;
  status: 'initiated' | 'escrowed' | 'fiat_sent' | 'completed' | 'disputed' | 'cancelled';
  escrowTxHash?: string;
  releaseTxHash?: string;
  paymentMethod: string;
  paymentDetails: any;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  disputeId?: string;
}

const TradeSchema = new Schema<ITrade>({
  tradeId: { type: String, required: true, unique: true },
  buyer: { type: String, required: true },
  seller: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  cryptoAmount: { type: Number, required: true },
  cryptoCurrency: { type: String, required: true, default: 'USDT' },
  status: { 
    type: String, 
    enum: ['initiated', 'escrowed', 'fiat_sent', 'completed', 'disputed', 'cancelled'],
    default: 'initiated'
  },
  escrowTxHash: String,
  releaseTxHash: String,
  paymentMethod: { type: String, required: true },
  paymentDetails: Schema.Types.Mixed,
  disputeId: String,
  completedAt: Date
}, {
  timestamps: true
});

TradeSchema.index({ buyer: 1, createdAt: -1 });
TradeSchema.index({ seller: 1, createdAt: -1 });
TradeSchema.index({ status: 1 });

export const Trade = mongoose.model<ITrade>('Trade', TradeSchema);
