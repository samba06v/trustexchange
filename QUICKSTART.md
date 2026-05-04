# TrustExchange - Quick Start Guide

Get TrustExchange running in 5 minutes! ⚡

## Prerequisites

- Node.js 18+ installed
- MetaMask browser extension
- Terminal/Command prompt

## Step 1: Clone & Setup (2 minutes)

```bash
# Clone the repository
git clone https://github.com/yourusername/trustexchange.git
cd trustexchange

# Run automated setup
chmod +x setup.sh
./setup.sh
```

This installs all dependencies for frontend, backend, and smart contracts.

## Step 2: Start MongoDB (30 seconds)

**Option A: Docker (Easiest)**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option B: Local MongoDB**
```bash
mongod --dbpath /path/to/data
```

## Step 3: Configure Environment (1 minute)

Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/trustexchange
JWT_SECRET=your-secret-key-here
```

That's it! Other settings have defaults.

## Step 4: Start Backend (30 seconds)

```bash
cd backend
npm run dev
```

You should see:
```
🚀 TrustExchange Backend running on port 5000
📡 WebSocket server ready
✅ MongoDB Connected
```

## Step 5: Start Frontend (30 seconds)

Open a new terminal:

```bash
npm run dev
```

You should see:
```
VITE ready in 500ms
➜ Local: http://localhost:5173/
```

## Step 6: Open in Browser

Visit: **http://localhost:5173**

You should see the TrustExchange landing page with:
- 3D animated globe
- Smooth scrolling sections
- "Connect Wallet" button

## Step 7: Connect Wallet

1. Click "Connect Wallet" button
2. Select "MetaMask"
3. Approve the connection
4. You're connected! 🎉

## Optional: Deploy Smart Contracts

If you want to test the full blockchain functionality:

**Terminal 1: Start Local Blockchain**
```bash
cd contracts
npx hardhat node
```

**Terminal 2: Deploy Contracts**
```bash
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```

Copy the contract addresses and update your `.env` file.

## Troubleshooting

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
docker ps | grep mongodb

# Restart MongoDB
docker restart mongodb
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### MetaMask Not Connecting
1. Refresh the page
2. Check MetaMask is unlocked
3. Try disconnecting and reconnecting

## What's Next?

### Explore the Platform
- Browse the landing page sections
- Check out the "How It Works" flow
- View the tech stack
- Read about dispute resolution

### Test Trading (Coming Soon)
- Create a merchant account
- Post buy/sell offers
- Initiate test trades
- Test dispute flow

### Development
- Read [DEVELOPMENT.md](DEVELOPMENT.md) for detailed dev guide
- Check [ARCHITECTURE.md](ARCHITECTURE.md) for system design
- Review [README.md](README.md) for full documentation

## Quick Commands Reference

```bash
# Start everything
docker run -d -p 27017:27017 mongo  # Terminal 1
cd backend && npm run dev            # Terminal 2
npm run dev                          # Terminal 3

# Stop everything
docker stop mongodb
# Ctrl+C in backend terminal
# Ctrl+C in frontend terminal

# Reset database
docker rm -f mongodb
docker run -d -p 27017:27017 --name mongodb mongo

# Rebuild frontend
npm run build

# View logs
cd backend && tail -f logs/combined.log
```

## Architecture at a Glance

```
┌─────────────┐
│   Browser   │ ← You are here!
│ localhost:  │
│    5173     │
└──────┬──────┘
       │
       ├─────────────┐
       │             │
       ▼             ▼
┌──────────┐  ┌──────────┐
│ Backend  │  │  Web3    │
│   :5000  │  │ MetaMask │
└────┬─────┘  └──────────┘
     │
     ▼
┌──────────┐
│ MongoDB  │
│  :27017  │
└──────────┘
```

## Support

- **Issues?** Check [DEVELOPMENT.md](DEVELOPMENT.md)
- **Questions?** Open a GitHub issue
- **Discord:** [Join community](https://discord.gg/trustexchange)

## Success Checklist

- ✅ MongoDB running
- ✅ Backend server running (port 5000)
- ✅ Frontend running (port 5173)
- ✅ Can open http://localhost:5173
- ✅ Can connect MetaMask wallet
- ✅ See 3D animations and smooth scrolling

If all checked, you're ready to go! 🚀

---

**Time to complete:** ~5 minutes
**Difficulty:** Easy
**Next:** Read [DEVELOPMENT.md](DEVELOPMENT.md) for advanced features
