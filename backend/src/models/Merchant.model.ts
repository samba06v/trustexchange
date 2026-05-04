import mongoose, { Schema, Document } from 'mongoose';

export interface IMerchant extends Document {
  walletAddress: string;
  name: string;
  verified: boolean;
  rating: number;
  totalTrades: number;
  successfulTrades: number;
  tier: 'basic' | 'premium' | 'enterprise';
  offers: Array<{
    id: string;
    type: 'buy' | 'sell';
    currency: string;
    minAmount: number;
    maxAmount: number;
    rate: number;
    paymentMethods: string[];
    active: boolean;
  }>;
  createdAt: Date;
}

const MerchantSchema = new Schema<IMerchant>({
  walletAddress: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  verified: { type: Boolean, default: false },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  totalTrades: { type: Number, default: 0 },
  successfulTrades: { type: Number, default: 0 },
  tier: { type: String, enum: ['basic', 'premium', 'enterprise'], default: 'basic' },
  offers: [{
    id: String,
    type: { type: String, enum: ['buy', 'sell'] },
    currency: String,
    minAmount: Number,
    maxAmount: Number,
    rate: Number,
    paymentMethods: [String],
    active: { type: Boolean, default: true }
  }]
}, {
  timestamps: true
});

export const Merchant = mongoose.model<IMerchant>('Merchant', MerchantSchema);
