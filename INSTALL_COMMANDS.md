# TrustExchange - Installation Commands Reference

Quick reference for all installation and setup commands.

## 🚀 Quick Install (Recommended)

### One-Line Setup
```bash
chmod +x setup.sh && ./setup.sh
```

## 📦 Manual Installation

### 1. Install Frontend Dependencies
```bash
npm install
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 3. Install Smart Contract Dependencies
```bash
cd contracts
npm install
cd ..
```

## 🐳 Docker Installation

### Start MongoDB
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Start All Services
```bash
docker-compose up -d
```

### Stop All Services
```bash
docker-compose down
```

## 🔧 Development Commands

### Start Frontend (Development)
```bash
npm run dev
```
Runs on: `http://localhost:5173`

### Start Backend (Development)
```bash
cd backend
npm run dev
```
Runs on: `http://localhost:5000`

### Start Local Blockchain
```bash
cd contracts
npx hardhat node
```

### Compile Smart Contracts
```bash
cd contracts
npx hardhat compile
```

### Deploy Smart Contracts (Local)
```bash
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```

### Deploy Smart Contracts (Testnet)
```bash
cd contracts
npx hardhat run scripts/deploy.js --network polygon
```

## 🧪 Testing Commands

### Test Frontend
```bash
npm test
```

### Test Backend
```bash
cd backend
npm test
```

### Test Smart Contracts
```bash
cd contracts
npx hardhat test
```

### Test with Coverage
```bash
cd contracts
npx hardhat coverage
```

## 🏗️ Build Commands

### Build Frontend (Production)
```bash
npm run build
```
Output: `dist/` folder

### Build Backend (Production)
```bash
cd backend
npm run build
```
Output: `backend/dist/` folder

### Preview Production Build
```bash
npm run preview
```

## 🔍 Verification Commands

### Verify Setup
```bash
chmod +x verify-setup.sh
./verify-setup.sh
```

### Check Node Version
```bash
node -v
```
Required: v18 or higher

### Check npm Version
```bash
npm -v
```

### Check MongoDB Status
```bash
# Docker
docker ps | grep mongodb

# Local
ps aux | grep mongod
```

### Check Running Ports
```bash
# Check port 5173 (frontend)
lsof -i :5173

# Check port 5000 (backend)
lsof -i :5000

# Check port 27017 (MongoDB)
lsof -i :27017
```

## 🗄️ Database Commands

### Start MongoDB (Docker)
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Stop MongoDB (Docker)
```bash
docker stop mongodb
```

### Remove MongoDB (Docker)
```bash
docker rm -f mongodb
```

### Connect to MongoDB
```bash
mongosh mongodb://localhost:27017/trustexchange
```

### Backup Database
```bash
mongodump --db trustexchange --out ./backup
```

### Restore Database
```bash
mongorestore --db trustexchange ./backup/trustexchange
```

## 🔐 Environment Setup

### Create Frontend .env
```bash
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_ESCROW_CONTRACT_ADDRESS=
VITE_USDT_CONTRACT_ADDRESS=
EOF
```

### Create Backend .env
```bash
cp backend/.env.example backend/.env
```

Then edit `backend/.env` with your values.

## 🚢 Deployment Commands

### Deploy with Docker Compose
```bash
docker-compose up -d
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```

### Restart Services
```bash
docker-compose restart
```

### Scale Services
```bash
docker-compose up -d --scale backend=3
```

## 🧹 Cleanup Commands

### Remove node_modules
```bash
rm -rf node_modules backend/node_modules contracts/node_modules
```

### Clean Build Artifacts
```bash
rm -rf dist backend/dist contracts/artifacts contracts/cache
```

### Clean Logs
```bash
rm -rf backend/logs/*.log
```

### Full Clean
```bash
rm -rf node_modules backend/node_modules contracts/node_modules
rm -rf dist backend/dist
rm -rf contracts/artifacts contracts/cache
rm -rf backend/logs/*.log
```

## 🔄 Update Commands

### Update All Dependencies
```bash
npm update
cd backend && npm update
cd ../contracts && npm update
```

### Update Specific Package
```bash
npm update package-name
```

### Check Outdated Packages
```bash
npm outdated
```

## 🐛 Troubleshooting Commands

### Kill Process on Port
```bash
# Kill port 5173
lsof -ti:5173 | xargs kill -9

# Kill port 5000
lsof -ti:5000 | xargs kill -9
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Reset MongoDB
```bash
docker rm -f mongodb
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 📊 Monitoring Commands

### View Backend Logs
```bash
tail -f backend/logs/combined.log
```

### View Error Logs
```bash
tail -f backend/logs/error.log
```

### Monitor MongoDB
```bash
docker logs -f mongodb
```

### Check System Resources
```bash
# CPU and Memory
docker stats

# Disk usage
df -h
```

## 🔧 Git Commands

### Initialize Repository
```bash
git init
git add .
git commit -m "Initial commit"
```

### Create Branch
```bash
git checkout -b feature/your-feature
```

### Push to Remote
```bash
git remote add origin https://github.com/yourusername/trustexchange.git
git push -u origin main
```

## 🎯 Common Workflows

### Start Development (Full Stack)
```bash
# Terminal 1: MongoDB
docker run -d -p 27017:27017 --name mongodb mongo

# Terminal 2: Backend
cd backend && npm run dev

# Terminal 3: Frontend
npm run dev

# Terminal 4: Blockchain (optional)
cd contracts && npx hardhat node
```

### Deploy Smart Contracts
```bash
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
# Copy contract addresses to .env
```

### Production Build
```bash
# Build frontend
npm run build

# Build backend
cd backend && npm run build

# Deploy with Docker
docker-compose up -d
```

### Run Tests
```bash
# All tests
npm test
cd backend && npm test
cd ../contracts && npx hardhat test
```

## 📝 Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start frontend dev server |
| `cd backend && npm run dev` | Start backend dev server |
| `docker-compose up -d` | Start all services |
| `./setup.sh` | Automated setup |
| `./verify-setup.sh` | Verify installation |
| `npm run build` | Build for production |
| `npm test` | Run tests |

## 🆘 Help Commands

### Get Help
```bash
# npm help
npm help

# Hardhat help
npx hardhat help

# Docker help
docker --help
docker-compose --help
```

### Check Versions
```bash
node -v
npm -v
docker -v
mongod --version
```

---

## 💡 Pro Tips

1. **Use tmux or screen** for multiple terminals
2. **Create aliases** for common commands
3. **Use Docker** for consistent environments
4. **Run verify-setup.sh** before starting
5. **Check logs** when debugging

## 🔗 Useful Aliases

Add to your `.bashrc` or `.zshrc`:

```bash
alias te-setup='./setup.sh'
alias te-verify='./verify-setup.sh'
alias te-start='docker-compose up -d'
alias te-stop='docker-compose down'
alias te-logs='docker-compose logs -f'
alias te-frontend='npm run dev'
alias te-backend='cd backend && npm run dev'
```

---

**Keep this file handy for quick command reference!** 📚
