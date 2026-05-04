# TrustExchange - Server Status

## ✅ Servers Running Successfully!

### Backend Server
- **Status**: ✅ Running
- **Port**: 5000
- **URL**: http://localhost:5000
- **API Base**: http://localhost:5000/api
- **WebSocket**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

### Frontend Server
- **Status**: ✅ Running
- **Port**: 5173
- **URL**: http://localhost:5173
- **Framework**: Vite + React

## 📝 Important Notes

### MongoDB Status
⚠️ **MongoDB is not installed** - The backend is running without database connection.

**Options to fix:**

1. **Install MongoDB locally** (Recommended for development):
   - Download: https://www.mongodb.com/try/download/community
   - Install and start MongoDB service
   - Backend will automatically connect on restart

2. **Use MongoDB Atlas** (Cloud - Free tier available):
   - Sign up at: https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get connection string
   - Update `trustexchange-main/backend/.env`:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trustexchange
     ```

3. **Use Docker** (If Docker is installed):
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

### Current Functionality
- ✅ Frontend UI is fully accessible
- ✅ Backend API endpoints are available
- ⚠️ Database operations will fail until MongoDB is connected
- ✅ WebSocket connections work
- ✅ Static content and UI components work

## 🌐 Access Your Application

### Frontend (Main Application)
Open in your browser: **http://localhost:5173**

You should see:
- Landing page with 3D animations
- Navigation menu
- "Connect Wallet" button
- Smooth scrolling sections

### Backend API
Test the health endpoint: **http://localhost:5000/health**

Should return:
```json
{
  "status": "ok",
  "timestamp": "2026-05-04T09:42:44.984Z"
}
```

## 🔧 Development Commands

### Stop Servers
Press `Ctrl+C` in each terminal window running the servers

### Restart Backend
```bash
cd trustexchange-main/backend
npm run dev
```

### Restart Frontend
```bash
cd trustexchange-main/frontend
npm run dev
```

### View Backend Logs
Backend logs are displayed in the terminal and saved to:
- `trustexchange-main/backend/logs/combined.log`
- `trustexchange-main/backend/logs/error.log`

## 🐛 Troubleshooting

### Port Already in Use
If you get "port already in use" error:

**Windows:**
```bash
# Kill process on port 5000 (backend)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 5173 (frontend)
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Frontend Can't Connect to Backend
1. Check backend is running on port 5000
2. Verify `.env` file in frontend:
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_SOCKET_URL=http://localhost:5000
   ```
3. Restart frontend server

### CORS Issues
Backend is configured to allow:
- http://localhost:5173 (Vite default)
- http://localhost:3000 (Alternative)

## 📚 Next Steps

1. **Install MongoDB** to enable full functionality
2. **Connect MetaMask** wallet in the frontend
3. **Explore the UI** - Check out all sections
4. **Test API endpoints** using Postman or curl
5. **Deploy smart contracts** (optional for local testing)

## 🔗 Useful Links

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/health
- MongoDB Download: https://www.mongodb.com/try/download/community
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas

## 📊 API Endpoints Available

### Trades
- POST `/api/trades/initiate` - Create new trade
- POST `/api/trades/:tradeId/escrow` - Confirm escrow
- POST `/api/trades/:tradeId/fiat-sent` - Confirm fiat sent
- POST `/api/trades/:tradeId/release` - Release funds
- GET `/api/trades/:tradeId` - Get trade details
- GET `/api/trades/user/:walletAddress` - Get user trades

### Merchants
- POST `/api/merchants/register` - Register merchant
- GET `/api/merchants/:walletAddress` - Get merchant profile
- POST `/api/merchants/:walletAddress/offers` - Create offer
- PUT `/api/merchants/:walletAddress/offers/:offerId` - Update offer
- GET `/api/merchants/offers/active` - Get active offers

### Disputes
- POST `/api/disputes/create` - Create dispute
- POST `/api/disputes/:id/evidence` - Submit evidence
- GET `/api/disputes/:id` - Get dispute details
- POST `/api/disputes/:id/resolve` - Resolve dispute

### Analytics
- GET `/api/analytics/overview` - Get analytics overview
- GET `/api/analytics/trades` - Get trade analytics
- GET `/api/analytics/merchants` - Get merchant analytics

---

**Status**: Ready for development! 🚀
**Last Updated**: May 4, 2026
