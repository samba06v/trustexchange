# 🚀 Quick Start Guide - TrustExchange

## ✅ Current Status: RUNNING!

Both frontend and backend servers are now running successfully!

## 🌐 Access Your Application

### 1. Open Frontend
**URL**: http://localhost:5173

Click the link or paste it in your browser to see:
- Beautiful landing page with 3D animations
- Navigation menu
- "Connect Wallet" button
- Feature sections with smooth scrolling

### 2. Backend API
**URL**: http://localhost:5000
**Health Check**: http://localhost:5000/health

## 📋 What's Working

✅ **Frontend Server** - Running on port 5173
✅ **Backend Server** - Running on port 5000  
✅ **WebSocket Server** - Real-time communication ready
✅ **API Endpoints** - All REST endpoints available
✅ **CORS Configuration** - Frontend can communicate with backend
⚠️ **MongoDB** - Not connected (install needed for database features)

## ⚠️ MongoDB Not Installed

The servers are running, but database operations won't work until MongoDB is installed.

### Quick MongoDB Setup Options:

#### Option 1: MongoDB Atlas (Easiest - Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free cluster (M0)
4. Get connection string
5. Update `trustexchange-main/backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trustexchange
   ```
6. Restart backend server

#### Option 2: Local MongoDB (Best for Development)
1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Edition
3. Start MongoDB service:
   - Windows: MongoDB should start automatically as a service
   - Or run: `mongod` in terminal
4. Restart backend server (it will auto-connect)

#### Option 3: Docker (If you have Docker)
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```
Then restart backend server.

## 🎮 Try It Out!

### 1. Explore the Frontend
Open http://localhost:5173 and:
- Scroll through the landing page
- Check out the 3D animations
- View the "How It Works" section
- Read about features and security

### 2. Test the Backend API
Open http://localhost:5000/health in your browser or use curl:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-05-04T09:44:41.148Z"
}
```

### 3. Connect MetaMask (Optional)
1. Install MetaMask browser extension if not installed
2. Click "Connect Wallet" on the frontend
3. Approve the connection in MetaMask

## 🛠️ Development Workflow

### View Backend Logs
The backend terminal shows real-time logs. You should see:
```
🚀 TrustExchange Backend running on port 5000
📡 WebSocket server ready
🌐 Frontend should connect to: http://localhost:5000
```

### View Frontend Logs
The frontend terminal shows:
```
VITE v8.0.10  ready in 693 ms
➜  Local:   http://localhost:5173/
```

### Make Changes
- **Frontend**: Edit files in `trustexchange-main/frontend/src/` - Hot reload is enabled
- **Backend**: Edit files in `trustexchange-main/backend/src/` - Auto-restart is enabled

### Stop Servers
Press `Ctrl+C` in each terminal window

### Restart Servers
```bash
# Backend
cd trustexchange-main/backend
npm run dev

# Frontend (in new terminal)
cd trustexchange-main/frontend
npm run dev
```

## 📁 Project Structure

```
trustexchange-main/
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   └── App.tsx        # Main app component
│   └── .env               # Frontend environment variables
│
├── backend/               # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API routes
│   │   ├── models/        # Database models
│   │   └── server.ts      # Main server file
│   └── .env               # Backend environment variables
│
└── contracts/             # Smart contracts (Solidity)
    └── TrustExchangeEscrow.sol
```

## 🔧 Configuration Files Created

### Backend `.env`
Location: `trustexchange-main/backend/.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/trustexchange
JWT_SECRET=trustexchange-secret-key-for-development-2026
NODE_ENV=development
```

### Frontend `.env`
Location: `trustexchange-main/frontend/.env`
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 📚 API Endpoints

All endpoints are prefixed with `/api`

### Health Check
```bash
GET http://localhost:5000/health
```

### Trades
```bash
POST   /api/trades/initiate
POST   /api/trades/:tradeId/escrow
POST   /api/trades/:tradeId/fiat-sent
POST   /api/trades/:tradeId/release
GET    /api/trades/:tradeId
GET    /api/trades/user/:walletAddress
```

### Merchants
```bash
POST   /api/merchants/register
GET    /api/merchants/:walletAddress
POST   /api/merchants/:walletAddress/offers
PUT    /api/merchants/:walletAddress/offers/:offerId
GET    /api/merchants/offers/active
```

### Disputes
```bash
POST   /api/disputes/create
POST   /api/disputes/:id/evidence
GET    /api/disputes/:id
POST   /api/disputes/:id/resolve
```

### Analytics
```bash
GET    /api/analytics/overview
GET    /api/analytics/trades
GET    /api/analytics/merchants
```

## 🐛 Common Issues

### "Port already in use"
```bash
# Windows - Kill process on port
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend can't connect to backend
1. Check backend is running: http://localhost:5000/health
2. Check `.env` files are correct
3. Clear browser cache and reload

### MongoDB connection errors
- This is expected if MongoDB is not installed
- Server will run but database operations will fail
- Install MongoDB to fix (see options above)

## 🎯 Next Steps

1. ✅ **Servers are running** - You're here!
2. 📦 **Install MongoDB** - Enable database features
3. 🔗 **Connect MetaMask** - Test Web3 integration
4. 🧪 **Test API endpoints** - Use Postman or curl
5. 🎨 **Customize the UI** - Edit frontend components
6. 📝 **Read documentation** - Check README.md and ARCHITECTURE.md

## 📞 Need Help?

- Check `SERVER_STATUS.md` for detailed server information
- Read `README.md` for full documentation
- Check `DEVELOPMENT.md` for development guidelines
- View `ARCHITECTURE.md` for system architecture

## 🎉 You're All Set!

Your TrustExchange development environment is ready!

**Frontend**: http://localhost:5173  
**Backend**: http://localhost:5000  
**Status**: ✅ Running

Happy coding! 🚀

---

**Last Updated**: May 4, 2026
**Status**: Servers Running Successfully
