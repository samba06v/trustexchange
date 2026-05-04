# TrustExchange Architecture Documentation

## System Overview

TrustExchange is a decentralized P2P escrow trading platform built on a three-tier architecture:

1. **Frontend Layer** - React-based Web3 application
2. **Backend Layer** - Node.js API and WebSocket server
3. **Blockchain Layer** - Solidity smart contracts on EVM chains

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Wallet  │  │  Trading │  │ Dispute  │  │Analytics │   │
│  │   UI     │  │    UI    │  │    UI    │  │    UI    │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │              │             │          │
│       └─────────────┴──────────────┴─────────────┘          │
│                          │                                   │
└──────────────────────────┼───────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌───────────────┐  ┌──────────────┐  ┌──────────────┐
│   Web3.js/    │  │   REST API   │  │  WebSocket   │
│   Ethers.js   │  │   (Express)  │  │  (Socket.IO) │
└───────┬───────┘  └──────┬───────┘  └──────┬───────┘
        │                 │                  │
        │          ┌──────┴──────┐          │
        │          │   MongoDB   │          │
        │          └─────────────┘          │
        │                                   │
        ▼                                   ▼
┌─────────────────────────────────────────────────┐
│         Blockchain Layer (EVM)                  │
│  ┌──────────────────┐  ┌──────────────────┐   │
│  │ TrustExchange    │  │   USDT Token     │   │
│  │ Escrow Contract  │  │   Contract       │   │
│  └──────────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────┘
```

## Component Details

### 1. Frontend Layer

#### Technology Stack
- **Framework:** React 19 with TypeScript
- **3D Graphics:** Three.js + React Three Fiber
- **Animations:** Framer Motion
- **Styling:** TailwindCSS 4
- **State Management:** Zustand
- **Web3 Integration:** Ethers.js v6
- **Real-time:** Socket.IO Client

#### Key Components

**Wallet Integration**
- MetaMask connection
- WalletConnect support
- Multi-chain support (Ethereum, Polygon, Arbitrum)
- Balance tracking
- Transaction signing

**Trading Interface**
- Browse active offers
- Initiate trades
- Track trade status
- Confirm payments
- Release funds

**Dispute System**
- Raise disputes
- Submit evidence
- View arbiter decisions

**Analytics Dashboard**
- Trading volume
- Success rates
- Merchant ratings
- Platform statistics

### 2. Backend Layer

#### Technology Stack
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB
- **Real-time:** Socket.IO
- **Authentication:** JWT
- **Logging:** Winston

#### API Endpoints

**Trade Management**
```
POST   /api/trades/initiate
POST   /api/trades/:id/escrow
POST   /api/trades/:id/fiat-sent
POST   /api/trades/:id/release
GET    /api/trades/:id
GET    /api/trades/user/:address
```

**Merchant Management**
```
POST   /api/merchants/register
GET    /api/merchants/:address
POST   /api/merchants/:address/offers
PUT    /api/merchants/:address/offers/:id
GET    /api/merchants/offers/active
```

**Dispute Management**
```
POST   /api/disputes/create
POST   /api/disputes/:id/evidence
GET    /api/disputes/:id
POST   /api/disputes/:id/resolve
```

**Analytics**
```
GET    /api/analytics/platform
GET    /api/analytics/merchant/:address
```

#### WebSocket Events

**Client → Server**
- `join` - Join room for wallet address
- `trade:update` - Update trade status
- `notification:send` - Send notification

**Server → Client**
- `trade:new` - New trade initiated
- `trade:escrowed` - Funds escrowed
- `trade:fiat_sent` - Fiat payment sent
- `trade:completed` - Trade completed
- `dispute:created` - Dispute raised
- `dispute:evidence_submitted` - Evidence submitted
- `dispute:resolved` - Dispute resolved
- `notification:received` - General notification

### 3. Blockchain Layer

#### Smart Contract Architecture

**TrustExchangeEscrow.sol**

Main escrow contract handling:
- Escrow creation
- Fund locking
- Payment confirmation
- Fund release
- Dispute management
- Fee collection

**Key Functions:**

```solidity
// Create escrow
function createEscrow(bytes32 escrowId, address buyer, uint256 amount)

// Confirm payment
function confirmPayment(bytes32 escrowId)

// Seller confirms fiat received
function confirmFiatReceived(bytes32 escrowId)

// Raise dispute
function raiseDispute(bytes32 escrowId, string reason)

// Resolve dispute (arbiter only)
function resolveDispute(bytes32 escrowId, address winner)

// Refund (after timelock)
function refund(bytes32 escrowId)
```

**Security Features:**
- ReentrancyGuard from OpenZeppelin
- Ownable for admin functions
- Time-lock mechanism (7 days)
- Multi-signature release
- Dispute penalty fees

#### Supported Networks

- Ethereum Mainnet
- Polygon
- Arbitrum
- Binance Smart Chain (planned)
- Optimism (planned)

## Data Flow

### Trade Lifecycle

```
1. Initiation
   User → Frontend → Backend API → MongoDB
   
2. Escrow Lock
   Seller → Frontend → Web3 → Smart Contract
   Smart Contract → Event → Backend → WebSocket → Buyer
   
3. Fiat Transfer
   Buyer → Bank/UPI/PayPal → Seller
   Buyer → Frontend → Backend API → WebSocket → Seller
   
4. Confirmation & Release
   Seller → Frontend → Backend API
   Seller → Frontend → Web3 → Smart Contract
   Smart Contract → Transfer USDT → Buyer
   Smart Contract → Event → Backend → WebSocket → Both Parties
```

### Dispute Flow

```
1. Dispute Raised
   Party → Frontend → Backend API → MongoDB
   Backend → WebSocket → Other Party
   
2. Evidence Submission
   Both Parties → Frontend → Backend API → MongoDB
   Backend → WebSocket → Other Party
   
3. Arbiter Review
   Arbiter → Review Evidence → Make Decision
   
4. Resolution
   Arbiter → Frontend → Backend API → Smart Contract
   Smart Contract → Transfer to Winner
   Smart Contract → Event → Backend → WebSocket → Both Parties
```

## Security Considerations

### Frontend Security
- Input validation
- XSS prevention
- CSRF protection
- Secure wallet connection
- Transaction verification

### Backend Security
- Rate limiting
- JWT authentication
- Input sanitization
- SQL injection prevention
- CORS configuration
- Helmet.js security headers

### Smart Contract Security
- Audited by security firms
- Reentrancy guards
- Integer overflow protection
- Access control
- Time-lock mechanisms
- Emergency pause functionality

## Scalability

### Horizontal Scaling
- Load balancer for backend servers
- MongoDB replica sets
- Redis for session management
- CDN for frontend assets

### Performance Optimization
- Database indexing
- Query optimization
- Caching strategies
- WebSocket connection pooling
- Lazy loading components

## Monitoring & Logging

### Application Monitoring
- Winston for structured logging
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Uptime monitoring (Pingdom)

### Blockchain Monitoring
- Transaction tracking
- Gas price optimization
- Contract event listening
- Block confirmation tracking

## Deployment Strategy

### Development
- Local MongoDB
- Hardhat local network
- Hot reload for frontend/backend

### Staging
- MongoDB Atlas
- Testnet deployment (Goerli, Mumbai)
- CI/CD pipeline

### Production
- MongoDB Atlas (Production cluster)
- Mainnet deployment
- Auto-scaling
- Blue-green deployment
- Rollback capability

## Future Enhancements

1. **Multi-currency Support**
   - Support for multiple stablecoins (USDC, DAI, BUSD)
   - Dynamic pricing

2. **Mobile Application**
   - React Native app
   - Push notifications
   - Biometric authentication

3. **Advanced Features**
   - Recurring trades
   - Escrow templates
   - Reputation system
   - Referral program

4. **DAO Governance**
   - Token-based voting
   - Protocol upgrades
   - Fee adjustments
   - Arbiter selection

5. **Layer 2 Integration**
   - Optimistic rollups
   - ZK-rollups
   - Lower gas fees
   - Faster transactions

## Conclusion

TrustExchange provides a robust, secure, and scalable platform for P2P crypto-to-fiat trading. The architecture is designed for high availability, security, and user experience while maintaining decentralization principles.
