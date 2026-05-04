# TrustExchange Development Guide

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6+
- MetaMask browser extension
- Git

### One-Command Setup

```bash
chmod +x setup.sh
./setup.sh
```

## Development Workflow

### 1. Start MongoDB

**Option A: Docker (Recommended)**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option B: Local Installation**
```bash
mongod --dbpath /path/to/data
```

### 2. Start Backend Server

```bash
cd backend
npm run dev
```

Server runs on `http://localhost:5000`

### 3. Start Frontend

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Compile Smart Contracts

```bash
cd contracts
npx hardhat compile
```

### 5. Deploy to Local Network

**Terminal 1: Start Hardhat Node**
```bash
cd contracts
npx hardhat node
```

**Terminal 2: Deploy Contracts**
```bash
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract addresses to your `.env` file.

## Project Structure

```
trustexchange/
├── src/                          # Frontend source
│   ├── components/               # React components
│   ├── services/                 # API & Web3 services
│   ├── store/                    # Zustand state management
│   ├── utils/                    # Utility functions
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # Entry point
├── backend/                      # Backend source
│   ├── src/
│   │   ├── controllers/          # Route controllers
│   │   ├── models/               # MongoDB models
│   │   ├── routes/               # API routes
│   │   ├── services/             # Business logic
│   │   ├── sockets/              # WebSocket handlers
│   │   ├── middleware/           # Express middleware
│   │   ├── config/               # Configuration
│   │   ├── utils/                # Utilities
│   │   └── server.ts             # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── contracts/                    # Smart contracts
│   ├── contracts/
│   │   ├── TrustExchangeEscrow.sol
│   │   └── MockUSDT.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── test/                     # Contract tests
│   ├── hardhat.config.js
│   └── package.json
├── public/                       # Static assets
├── docker-compose.yml            # Docker setup
├── package.json                  # Frontend dependencies
└── README.md                     # Documentation
```

## Code Style Guide

### TypeScript/JavaScript

**Use functional components with hooks:**
```typescript
import { useState, useEffect } from 'react';

export default function MyComponent() {
  const [state, setState] = useState(0);
  
  useEffect(() => {
    // Effect logic
  }, []);
  
  return <div>{state}</div>;
}
```

**Use async/await over promises:**
```typescript
// Good
async function fetchData() {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Avoid
function fetchData() {
  return api.get('/data')
    .then(response => response.data)
    .catch(error => console.error(error));
}
```

**Use TypeScript interfaces:**
```typescript
interface Trade {
  tradeId: string;
  buyer: string;
  seller: string;
  amount: number;
  status: TradeStatus;
}
```

### Solidity

**Follow Solidity style guide:**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyContract {
    // State variables
    uint256 public myVariable;
    
    // Events
    event MyEvent(address indexed user, uint256 amount);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    // Functions
    function myFunction(uint256 _param) external onlyOwner {
        myVariable = _param;
        emit MyEvent(msg.sender, _param);
    }
}
```

## Testing

### Frontend Tests

```bash
npm run test
```

### Backend Tests

```bash
cd backend
npm run test
```

### Smart Contract Tests

```bash
cd contracts
npx hardhat test
```

**Example test:**
```javascript
const { expect } = require("chai");

describe("TrustExchangeEscrow", function () {
  it("Should create escrow", async function () {
    const [owner, buyer, seller] = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("TrustExchangeEscrow");
    const escrow = await Escrow.deploy(usdtAddress);
    
    const escrowId = ethers.id("test-escrow-1");
    await escrow.connect(seller).createEscrow(escrowId, buyer.address, 1000);
    
    const details = await escrow.getEscrowDetails(escrowId);
    expect(details.buyer).to.equal(buyer.address);
  });
});
```

## Debugging

### Frontend Debugging

**Use React DevTools:**
- Install React DevTools browser extension
- Inspect component state and props

**Console logging:**
```typescript
console.log('Debug:', { variable, state });
```

**Network debugging:**
- Open browser DevTools → Network tab
- Monitor API calls and WebSocket connections

### Backend Debugging

**Use VS Code debugger:**

`.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "cwd": "${workspaceFolder}/backend",
      "console": "integratedTerminal"
    }
  ]
}
```

**Logging:**
```typescript
import { logger } from './utils/logger';

logger.info('Info message');
logger.error('Error message', { error });
logger.debug('Debug message', { data });
```

### Smart Contract Debugging

**Use Hardhat console:**
```bash
npx hardhat console --network localhost
```

**Add console.log in contracts:**
```solidity
import "hardhat/console.sol";

function myFunction() external {
    console.log("Value:", myVariable);
}
```

## Common Issues & Solutions

### Issue: MetaMask not connecting

**Solution:**
1. Check if MetaMask is installed
2. Ensure you're on the correct network
3. Clear MetaMask cache
4. Reload the page

### Issue: MongoDB connection failed

**Solution:**
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
mongod --dbpath /path/to/data

# Or use Docker
docker start mongodb
```

### Issue: Smart contract deployment fails

**Solution:**
1. Check you have enough ETH for gas
2. Verify RPC URL is correct
3. Ensure private key is set in .env
4. Check network configuration in hardhat.config.js

### Issue: CORS errors

**Solution:**
Update backend CORS configuration:
```typescript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

## Git Workflow

### Branch Naming
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/component-name` - Code refactoring
- `docs/update-readme` - Documentation updates

### Commit Messages
```
feat: Add wallet connection functionality
fix: Resolve trade status update bug
refactor: Improve API error handling
docs: Update installation instructions
test: Add unit tests for escrow contract
```

### Pull Request Process
1. Create feature branch from `main`
2. Make changes and commit
3. Push to remote
4. Create pull request
5. Request code review
6. Address feedback
7. Merge after approval

## Performance Optimization

### Frontend
- Use React.memo for expensive components
- Implement code splitting with React.lazy
- Optimize images (WebP format)
- Use CDN for static assets
- Enable gzip compression

### Backend
- Add database indexes
- Implement caching (Redis)
- Use connection pooling
- Optimize queries
- Enable compression middleware

### Smart Contracts
- Minimize storage operations
- Use events for logging
- Batch operations when possible
- Optimize gas usage
- Use view/pure functions

## Deployment Checklist

### Pre-deployment
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Smart contracts audited
- [ ] Documentation updated

### Deployment
- [ ] Build frontend: `npm run build`
- [ ] Build backend: `cd backend && npm run build`
- [ ] Deploy smart contracts to mainnet
- [ ] Update contract addresses in .env
- [ ] Deploy backend to server
- [ ] Deploy frontend to CDN
- [ ] Configure DNS
- [ ] Enable SSL/TLS

### Post-deployment
- [ ] Verify all endpoints working
- [ ] Test wallet connection
- [ ] Test trade flow end-to-end
- [ ] Monitor error logs
- [ ] Set up monitoring alerts
- [ ] Backup database

## Resources

### Documentation
- [React Documentation](https://react.dev)
- [Ethers.js Documentation](https://docs.ethers.org)
- [Hardhat Documentation](https://hardhat.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Documentation](https://expressjs.com)

### Tools
- [Remix IDE](https://remix.ethereum.org) - Solidity IDE
- [Etherscan](https://etherscan.io) - Blockchain explorer
- [Postman](https://www.postman.com) - API testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI

### Community
- Discord: [Join our community](https://discord.gg/trustexchange)
- GitHub: [Report issues](https://github.com/trustexchange/issues)
- Twitter: [@TrustExchange](https://twitter.com/trustexchange)

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Areas for Contribution
- Bug fixes
- New features
- Documentation improvements
- Test coverage
- Performance optimizations
- UI/UX enhancements

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

Happy coding! If you have questions, reach out on Discord or open an issue on GitHub.
