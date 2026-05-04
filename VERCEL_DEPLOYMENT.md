# 🚀 Vercel Deployment Guide - TrustExchange

Complete guide to deploy TrustExchange frontend and backend to Vercel.

## 📋 Prerequisites

1. **Vercel Account** - Sign up at https://vercel.com
2. **GitHub Account** - For repository connection
3. **MongoDB Atlas** - Free cloud database (https://www.mongodb.com/cloud/atlas)
4. **Vercel CLI** (Optional) - `npm install -g vercel`

---

## 🎯 Deployment Strategy

We'll deploy in two parts:
1. **Backend** - Separate Vercel project (API + WebSocket)
2. **Frontend** - Separate Vercel project (React UI)

---

## 📦 Part 1: Deploy Backend

### Step 1: Prepare Backend for Vercel

The backend needs a serverless entry point. Create this file:

**File**: `trustexchange-main/backend/api/index.ts`

```typescript
import '../src/server.js';
```

Or use the existing `src/server.ts` directly (already configured in vercel.json).

### Step 2: Push to GitHub

```bash
cd trustexchange-main
git init
git add .
git commit -m "Initial commit - TrustExchange"
git branch -M main
git remote add origin https://github.com/yourusername/trustexchange.git
git push -u origin main
```

### Step 3: Deploy Backend to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure project:
   - **Project Name**: `trustexchange-backend`
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/trustexchange
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
   POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY
   ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_API_KEY
   ESCROW_CONTRACT_ADDRESS=0x...
   PRIVATE_KEY=0x...
   ```

6. Click **"Deploy"**

7. **Note your backend URL**: `https://trustexchange-backend.vercel.app`

#### Option B: Via Vercel CLI

```bash
cd trustexchange-main/backend

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? trustexchange-backend
# - Directory? ./
# - Override settings? No
```

### Step 4: Configure Backend Environment Variables

After deployment, add environment variables:

```bash
# Via CLI
vercel env add MONGODB_URI production
vercel env add JWT_SECRET production
vercel env add ETHEREUM_RPC_URL production
# ... add all other variables

# Or via Dashboard:
# Go to Project Settings > Environment Variables
```

---

## 🎨 Part 2: Deploy Frontend

### Step 1: Update Frontend Environment Variables

Update `trustexchange-main/frontend/.env.production`:

```env
VITE_API_URL=https://trustexchange-backend.vercel.app/api
VITE_SOCKET_URL=https://trustexchange-backend.vercel.app
VITE_ESCROW_CONTRACT_ADDRESS=0x...
VITE_USDT_CONTRACT_ADDRESS=0x...
```

### Step 2: Deploy Frontend to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Import your GitHub repository (same repo)
4. Configure project:
   - **Project Name**: `trustexchange-frontend`
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   ```
   VITE_API_URL=https://trustexchange-backend.vercel.app/api
   VITE_SOCKET_URL=https://trustexchange-backend.vercel.app
   VITE_ESCROW_CONTRACT_ADDRESS=0x...
   VITE_USDT_CONTRACT_ADDRESS=0x...
   ```

6. Click **"Deploy"**

7. **Your frontend URL**: `https://trustexchange-frontend.vercel.app`

#### Option B: Via Vercel CLI

```bash
cd trustexchange-main/frontend

# Deploy
vercel --prod

# Follow prompts
```

---

## 🔧 Part 3: Configure CORS

Update backend CORS settings to allow your frontend domain.

**File**: `trustexchange-main/backend/src/server.ts`

```typescript
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [
      'https://trustexchange-frontend.vercel.app',
      'https://trustexchange.vercel.app',
      'https://yourdomain.com'
    ] 
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});
```

Commit and push changes - Vercel will auto-redeploy.

---

## 🗄️ Part 4: Setup MongoDB Atlas

### Step 1: Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Log in
3. Create a **Free M0 Cluster**
4. Choose a cloud provider and region
5. Click **"Create Cluster"**

### Step 2: Configure Database Access

1. Go to **Database Access**
2. Click **"Add New Database User"**
3. Create username and password
4. Set privileges to **"Read and write to any database"**
5. Click **"Add User"**

### Step 3: Configure Network Access

1. Go to **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - For production, restrict to Vercel IPs
4. Click **"Confirm"**

### Step 4: Get Connection String

1. Go to **Database** > **Connect**
2. Choose **"Connect your application"**
3. Copy the connection string:
   ```
   mongodb+srv://username:<password>@cluster.mongodb.net/trustexchange?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add this to Vercel backend environment variables as `MONGODB_URI`

---

## 🔐 Part 5: Environment Variables Checklist

### Backend Environment Variables (Vercel)

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/trustexchange
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY
ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_API_KEY
ESCROW_CONTRACT_ADDRESS=0x...
PRIVATE_KEY=0x...
```

### Frontend Environment Variables (Vercel)

```env
VITE_API_URL=https://trustexchange-backend.vercel.app/api
VITE_SOCKET_URL=https://trustexchange-backend.vercel.app
VITE_ESCROW_CONTRACT_ADDRESS=0x...
VITE_USDT_CONTRACT_ADDRESS=0x...
```

---

## 🧪 Part 6: Test Deployment

### Test Backend

```bash
# Health check
curl https://trustexchange-backend.vercel.app/health

# Expected response:
# {"status":"ok","timestamp":"2026-05-04T10:00:00.000Z"}
```

### Test Frontend

1. Open: `https://trustexchange-frontend.vercel.app`
2. Check:
   - ✅ Page loads
   - ✅ 3D animations work
   - ✅ "Connect Wallet" button appears
   - ✅ No console errors

### Test API Connection

1. Open browser console on frontend
2. Check Network tab
3. Verify API calls to backend succeed

---

## 🌐 Part 7: Custom Domain (Optional)

### Add Custom Domain to Frontend

1. Go to Vercel Dashboard > Your Frontend Project
2. Click **"Settings"** > **"Domains"**
3. Add your domain: `trustexchange.io`
4. Follow DNS configuration instructions
5. Update backend CORS to include your domain

### Add Custom Domain to Backend

1. Go to Vercel Dashboard > Your Backend Project
2. Click **"Settings"** > **"Domains"**
3. Add subdomain: `api.trustexchange.io`
4. Update frontend `.env` to use new API URL

---

## 📝 Deployment Checklist

### Pre-Deployment
- ✅ MongoDB Atlas cluster created
- ✅ Database user created
- ✅ Network access configured
- ✅ Connection string obtained
- ✅ Smart contracts deployed (if using blockchain)
- ✅ RPC URLs obtained (Alchemy/Infura)
- ✅ Code pushed to GitHub

### Backend Deployment
- ✅ Backend deployed to Vercel
- ✅ Environment variables added
- ✅ Health endpoint working
- ✅ MongoDB connection successful
- ✅ API endpoints responding

### Frontend Deployment
- ✅ Frontend deployed to Vercel
- ✅ Environment variables added
- ✅ Backend URL configured
- ✅ Page loads successfully
- ✅ API calls working
- ✅ WebSocket connection working

### Post-Deployment
- ✅ CORS configured correctly
- ✅ All features tested
- ✅ MetaMask connection works
- ✅ Custom domains configured (optional)
- ✅ SSL certificates active

---

## 🚨 Common Issues & Solutions

### Issue: CORS Errors

**Solution**: Update backend CORS configuration to include frontend URL:

```typescript
origin: ['https://trustexchange-frontend.vercel.app']
```

### Issue: Environment Variables Not Working

**Solution**: 
1. Check variable names match exactly
2. Redeploy after adding variables
3. For frontend, variables must start with `VITE_`

### Issue: MongoDB Connection Failed

**Solution**:
1. Check connection string is correct
2. Verify password doesn't contain special characters (URL encode if needed)
3. Ensure IP whitelist includes 0.0.0.0/0
4. Check database user has correct permissions

### Issue: WebSocket Not Connecting

**Solution**:
- Vercel has limitations with WebSockets
- Consider using Vercel's Edge Functions
- Or deploy backend to Railway/Render for better WebSocket support

### Issue: Build Fails

**Solution**:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify TypeScript compiles locally: `npm run build`
4. Check Node.js version compatibility

### Issue: 404 on Routes

**Solution**: Ensure `vercel.json` has proper rewrites for SPA:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically:
# 1. Detects push
# 2. Builds project
# 3. Deploys to production
# 4. Updates URL
```

### Branch Deployments

- `main` branch → Production deployment
- Other branches → Preview deployments
- Pull requests → Automatic preview URLs

---

## 📊 Monitoring & Analytics

### Vercel Analytics

1. Go to Project > Analytics
2. View:
   - Page views
   - Unique visitors
   - Performance metrics
   - Error rates

### Vercel Logs

1. Go to Project > Deployments
2. Click on a deployment
3. View **"Functions"** tab for logs
4. Check for errors and warnings

---

## 🎯 Production Optimization

### Frontend Optimization

1. **Enable Vercel Analytics**:
   ```bash
   npm install @vercel/analytics
   ```

2. **Add to `main.tsx`**:
   ```typescript
   import { Analytics } from '@vercel/analytics/react';
   
   <Analytics />
   ```

3. **Enable Speed Insights**:
   ```bash
   npm install @vercel/speed-insights
   ```

### Backend Optimization

1. **Use Edge Functions** for better performance
2. **Enable caching** for static responses
3. **Optimize database queries**
4. **Add rate limiting** (already configured)

---

## 🔒 Security Checklist

- ✅ Use strong JWT secret (min 32 characters)
- ✅ Never commit `.env` files
- ✅ Use environment variables for secrets
- ✅ Enable HTTPS only (Vercel does this automatically)
- ✅ Configure CORS properly
- ✅ Use MongoDB Atlas IP whitelist
- ✅ Rotate API keys regularly
- ✅ Enable Vercel password protection for staging

---

## 📞 Support & Resources

### Vercel Documentation
- https://vercel.com/docs
- https://vercel.com/docs/concepts/projects/environment-variables
- https://vercel.com/docs/concepts/functions/serverless-functions

### MongoDB Atlas
- https://docs.atlas.mongodb.com/

### TrustExchange Docs
- `README.md` - Project overview
- `ARCHITECTURE.md` - System architecture
- `DEPLOYMENT_STATUS.md` - Deployment status

---

## 🎉 Deployment Complete!

Your TrustExchange platform is now live on Vercel!

### Your URLs
- **Frontend**: https://trustexchange-frontend.vercel.app
- **Backend**: https://trustexchange-backend.vercel.app
- **API**: https://trustexchange-backend.vercel.app/api
- **Health**: https://trustexchange-backend.vercel.app/health

### Next Steps
1. Test all features in production
2. Configure custom domain
3. Set up monitoring and alerts
4. Share with users!

---

**Happy Deploying! 🚀**

*Last Updated: May 4, 2026*
