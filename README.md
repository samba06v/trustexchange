# TrustExchange - Web3 P2P Escrow Trading Platform

![TrustExchange Banner](https://img.shields.io/badge/Web3-P2P%20Trading-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-blue?style=for-the-badge)

## 🚀 Overview

TrustExchange is a decentralized, trustless peer-to-peer trading ecosystem engineered to facilitate secure exchanges of USDT and other stablecoins with fiat currency. Built for the Rockverse Hackathon 2026.

### Key Features

- ✅ **Trustless Escrow** - Smart contracts eliminate custodial intermediaries
- 🔒 **Zero Custody Risk** - Users retain private keys until trade execution
- 🌐 **Decentralized** - No single point of failure
- ⚡ **Real-time Tracking** - Live trade status updates via WebSocket
- 🛡️ **Dispute Resolution** - Decentralized arbiter panel
- 📊 **Analytics Dashboard** - Comprehensive trading insights

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 19 + TypeScript
- Three.js / React Three Fiber (3D UI)
- Framer Motion (Animations)
- TailwindCSS 4
- Zustand (State Management)
- Ethers.js (Web3 Integration)
- Socket.IO Client (Real-time)

**Backend:**
- Node.js + Express
- TypeScript
- MongoDB (Database)
- Socket.IO (WebSocket Server)
- JWT Authentication
- Winston (Logging)

**Smart Contracts:**
- Solidity 0.8.20
- Hardhat (Development)
- OpenZeppelin (Security)
- EVM Compatible (Ethereum, Polygon, Arbitrum)

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB 6+
- MetaMask or compatible Web3 wallet
- Git

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/trustexchange.git
cd trustexchange
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Install Smart Contract Dependencies

```bash
cd contracts
npm install
cd ..
```

### 5. Environment Configuration

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_ESCROW_CONTRACT_ADDRESS=0x...
VITE_USDT_CONTRACT_ADDRESS=0x...
```

**Backend (backend/.env):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/trustexchange
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development

# Blockchain
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY
ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_API_KEY
ESCROW_CONTRACT_ADDRESS=0x...
PRIVATE_KEY=your-deployer-private-key
```

### 6. Start MongoDB

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or install locally
mongod --dbpath /path/to/data
```

### 7. Compile Smart Contracts

```bash
cd contracts
npx hardhat compile
```

### 8. Deploy Smart Contracts (Testnet)

```bash
npx hardhat run scripts/deploy.js --network polygon
```

### 9. Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

### 10. Start Frontend

```bash
# In root directory
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🎯 Usage

### For Traders

1. **Connect Wallet** - Click "Connect Wallet" and select MetaMask
2. **Browse Offers** - View active buy/sell offers from merchants
3. **Initiate Trade** - Select an offer and enter amount
4. **Escrow Funds** - Seller deposits USDT to smart contract
5. **Send Fiat** - Buyer sends fiat via bank transfer/UPI/PayPal
6. **Confirm & Release** - Seller confirms fiat receipt, funds released to buyer

### For Merchants

1. **Register** - Create merchant profile
2. **Create Offers** - Set pricing, limits, and payment methods
3. **Manage Trades** - Track active trades in dashboard
4. **Analytics** - View trading volume and success rates

### Dispute Resolution

1. **Raise Dispute** - Either party can raise dispute with reason
2. **Submit Evidence** - Upload receipts, screenshots, transaction IDs
3. **Arbiter Review** - Decentralized panel reviews evidence
4. **Resolution** - Funds released to rightful owner

## 🔐 Security Features

- ✅ **Audited Smart Contracts** - Pre-deployment security audits
- ✅ **Reentrancy Guards** - Protection against reentrancy attacks
- ✅ **Time-locks** - Automatic refund after 7 days if buyer doesn't confirm
- ✅ **Multi-sig Release** - Requires both parties or arbiter approval
- ✅ **Rate Limiting** - API protection against DDoS
- ✅ **Input Validation** - Comprehensive validation on all inputs

## 📊 API Documentation

### Trade Endpoints

```
POST   /api/trades/initiate          - Create new trade
POST   /api/trades/:id/escrow        - Confirm escrow deposit
POST   /api/trades/:id/fiat-sent     - Buyer confirms fiat sent
POST   /api/trades/:id/release       - Release funds to buyer
GET    /api/trades/:id               - Get trade details
GET    /api/trades/user/:address     - Get user's trades
```

### Merchant Endpoints

```
POST   /api/merchants/register       - Register as merchant
GET    /api/merchants/:address       - Get merchant profile
POST   /api/merchants/:address/offers - Create offer
PUT    /api/merchants/:address/offers/:id - Update offer
GET    /api/merchants/offers/active  - Get all active offers
```

### Dispute Endpoints

```
POST   /api/disputes/create          - Create dispute
POST   /api/disputes/:id/evidence    - Submit evidence
GET    /api/disputes/:id             - Get dispute details
POST   /api/disputes/:id/resolve     - Resolve dispute (arbiter only)
```

## 🧪 Testing

### Run Smart Contract Tests

```bash
cd contracts
npx hardhat test
```

### Run Backend Tests

```bash
cd backend
npm test
```

## 🚢 Deployment

### Deploy to Production

1. **Build Frontend:**
```bash
npm run build
```

2. **Deploy Backend:**
```bash
cd backend
npm run build
npm start
```

3. **Deploy Smart Contracts:**
```bash
cd contracts
npx hardhat run scripts/deploy.js --network ethereum
```

### Recommended Hosting

- **Frontend:** Vercel, Netlify, or AWS S3 + CloudFront
- **Backend:** AWS EC2, DigitalOcean, or Heroku
- **Database:** MongoDB Atlas
- **Smart Contracts:** Ethereum Mainnet, Polygon, or Arbitrum

## 📈 Business Model

- **Maker/Taker Fees:** ~0.1% per trade
- **Premium Merchant Tiers:** SaaS subscription for advanced features
- **Dispute Penalty Fees:** Small fee on losing party (deters frivolous claims)

## 🗺️ Roadmap

- ✅ Phase 1: Core escrow functionality
- ✅ Phase 2: Dispute resolution system
- 🔄 Phase 3: Multi-chain support (Polygon, Arbitrum, BSC)
- 📅 Phase 4: Mobile app (React Native)
- 📅 Phase 5: Fiat on-ramp integration
- 📅 Phase 6: DAO governance

## 👥 Team AstraForge

- **Lead Developer** - Full-stack & Smart Contract Development
- **UI/UX Designer** - 3D Interface Design
- **Blockchain Architect** - Smart Contract Security
- **Backend Engineer** - API & WebSocket Infrastructure

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📞 Support

- **Discord:** [Join our community](https://discord.gg/trustexchange)
- **Twitter:** [@TrustExchange](https://twitter.com/trustexchange)
- **Email:** support@trustexchange.io

## ⚠️ Disclaimer

This is a hackathon project. Use at your own risk. Always conduct thorough security audits before deploying to mainnet with real funds.

---

Built with ❤️ by Team AstraForge for Rockverse Hackathon 2026
