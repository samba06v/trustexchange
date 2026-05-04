# 🚀 Vercel Deployment - Quick Reference Card

## ⚡ Quick Deploy Commands

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login to Vercel
```bash
vercel login
```

### Deploy Backend
```bash
cd trustexchange-main/backend
vercel --prod
```

### Deploy Frontend
```bash
cd trustexchange-main/frontend
vercel --prod
```

### Or Use Scripts
```bash
# Windows
deploy.bat

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

---

## 📋 Environment Variables

### Backend (Vercel Dashboard)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/trustexchange
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY
ESCROW_CONTRACT_ADDRESS=0x...
PRIVATE_KEY=0x...
```

### Frontend (Vercel Dashboard)
```
VITE_API_URL=https://your-backend.vercel.app/api
VITE_SOCKET_URL=https://your-backend.vercel.app
VITE_ESCROW_CONTRACT_ADDRESS=0x...
VITE_USDT_CONTRACT_ADDRESS=0x...
```

---

## 🗄️ MongoDB Atlas Setup

1. **Create Account**: https://www.mongodb.com/cloud/atlas
2. **Create Cluster**: Free M0 tier
3. **Database Access**: Add user with read/write permissions
4. **Network Access**: Allow 0.0.0.0/0 (or Vercel IPs)
5. **Get Connection String**: 
   ```
   mongodb+srv://username:password@cluster.mongodb.net/trustexchange
   ```

---

## 🔧 Vercel Project Settings

### Backend Project
- **Framework**: Other
- **Root Directory**: `backend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Frontend Project
- **Framework**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

---

## ✅ Deployment Checklist

### Before Deployment
- [ ] Push code to GitHub
- [ ] Create MongoDB Atlas cluster
- [ ] Get MongoDB connection string
- [ ] Get RPC URLs (Alchemy/Infura)
- [ ] Deploy smart contracts (if needed)
- [ ] Install Vercel CLI

### Backend Deployment
- [ ] Deploy backend to Vercel
- [ ] Add all environment variables
- [ ] Test health endpoint: `/health`
- [ ] Verify MongoDB connection
- [ ] Note backend URL

### Frontend Deployment
- [ ] Update `.env.production` with backend URL
- [ ] Deploy frontend to Vercel
- [ ] Add environment variables
- [ ] Test frontend loads
- [ ] Verify API connection

### Post-Deployment
- [ ] Update CORS in backend
- [ ] Test all features
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring

---

## 🧪 Testing Deployed Apps

### Test Backend
```bash
curl https://your-backend.vercel.app/health
```

Expected:
```json
{"status":"ok","timestamp":"2026-05-04T10:00:00.000Z"}
```

### Test Frontend
Open: `https://your-frontend.vercel.app`

Check:
- ✅ Page loads
- ✅ No console errors
- ✅ API calls work
- ✅ Connect Wallet works

---

## 🔄 Update Deployment

### Auto-Deploy (Recommended)
```bash
git add .
git commit -m "Update feature"
git push origin main
# Vercel auto-deploys
```

### Manual Deploy
```bash
cd backend  # or frontend
vercel --prod
```

---

## 🚨 Common Issues

### CORS Error
**Fix**: Update backend `server.ts`:
```typescript
origin: ['https://your-frontend.vercel.app']
```

### MongoDB Connection Failed
**Fix**: 
- Check connection string
- Verify IP whitelist (0.0.0.0/0)
- Check database user permissions

### Environment Variables Not Working
**Fix**:
- Redeploy after adding variables
- Frontend vars must start with `VITE_`
- Check spelling matches exactly

### Build Failed
**Fix**:
- Check build logs in Vercel
- Test build locally: `npm run build`
- Verify all dependencies in `package.json`

---

## 📞 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Alchemy (RPC)**: https://www.alchemy.com
- **Full Guide**: See `VERCEL_DEPLOYMENT.md`

---

## 🎯 Typical URLs

After deployment, you'll get:

- **Backend**: `https://trustexchange-backend.vercel.app`
- **Frontend**: `https://trustexchange-frontend.vercel.app`
- **API**: `https://trustexchange-backend.vercel.app/api`
- **Health**: `https://trustexchange-backend.vercel.app/health`

---

## 💡 Pro Tips

1. **Use Preview Deployments**: Every branch gets a preview URL
2. **Environment Variables**: Use Vercel dashboard for secrets
3. **Custom Domains**: Add in Project Settings > Domains
4. **Monitoring**: Enable Vercel Analytics
5. **Logs**: Check Functions tab for backend logs
6. **Rollback**: Use Vercel dashboard to rollback deployments

---

## 🔐 Security Reminders

- ✅ Never commit `.env` files
- ✅ Use strong JWT secret (32+ chars)
- ✅ Rotate API keys regularly
- ✅ Use MongoDB IP whitelist in production
- ✅ Enable HTTPS only (automatic on Vercel)
- ✅ Configure CORS properly

---

**Need detailed instructions?** See `VERCEL_DEPLOYMENT.md`

**Last Updated**: May 4, 2026
