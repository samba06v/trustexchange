import { Request, Response } from 'express';
import { Merchant } from '../models/Merchant.model.js';
import { v4 as uuidv4 } from 'uuid';

export class MerchantController {
  registerMerchant = async (req: Request, res: Response) => {
    try {
      const { walletAddress, name } = req.body;

      const existingMerchant = await Merchant.findOne({ walletAddress });
      if (existingMerchant) {
        return res.status(400).json({ success: false, error: 'Merchant already registered' });
      }

      const merchant = await Merchant.create({
        walletAddress,
        name,
        verified: false,
        tier: 'basic'
      });

      res.status(201).json({ success: true, data: merchant });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  getMerchantProfile = async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;
      const merchant = await Merchant.findOne({ walletAddress });

      if (!merchant) {
        return res.status(404).json({ success: false, error: 'Merchant not found' });
      }

      res.json({ success: true, data: merchant });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  createOffer = async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;
      const { type, currency, minAmount, maxAmount, rate, paymentMethods } = req.body;

      const merchant = await Merchant.findOne({ walletAddress });
      if (!merchant) {
        return res.status(404).json({ success: false, error: 'Merchant not found' });
      }

      const offer = {
        id: uuidv4(),
        type,
        currency,
        minAmount,
        maxAmount,
        rate,
        paymentMethods,
        active: true
      };

      merchant.offers.push(offer);
      await merchant.save();

      res.status(201).json({ success: true, data: offer });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  updateOffer = async (req: Request, res: Response) => {
    try {
      const { walletAddress, offerId } = req.params;
      const updates = req.body;

      const merchant = await Merchant.findOne({ walletAddress });
      if (!merchant) {
        return res.status(404).json({ success: false, error: 'Merchant not found' });
      }

      const offer = merchant.offers.find(o => o.id === offerId);
      if (!offer) {
        return res.status(404).json({ success: false, error: 'Offer not found' });
      }

      Object.assign(offer, updates);
      await merchant.save();

      res.json({ success: true, data: offer });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  getActiveOffers = async (req: Request, res: Response) => {
    try {
      const merchants = await Merchant.find({ 'offers.active': true });
      
      const activeOffers = merchants.flatMap(merchant =>
        merchant.offers
          .filter(offer => offer.active)
          .map(offer => ({
            ...offer,
            merchantName: merchant.name,
            merchantAddress: merchant.walletAddress,
            merchantRating: merchant.rating,
            merchantVerified: merchant.verified
          }))
      );

      res.json({ success: true, data: activeOffers });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}
