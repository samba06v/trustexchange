#!/bin/bash

# TrustExchange Vercel Deployment Script
# This script helps deploy both frontend and backend to Vercel

echo "🚀 TrustExchange Vercel Deployment Script"
echo "=========================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found!"
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is installed"
echo ""

# Ask which part to deploy
echo "What would you like to deploy?"
echo "1) Backend only"
echo "2) Frontend only"
echo "3) Both (Backend first, then Frontend)"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🔧 Deploying Backend..."
        cd backend
        vercel --prod
        cd ..
        echo "✅ Backend deployment complete!"
        ;;
    2)
        echo ""
        echo "🎨 Deploying Frontend..."
        cd frontend
        vercel --prod
        cd ..
        echo "✅ Frontend deployment complete!"
        ;;
    3)
        echo ""
        echo "🔧 Deploying Backend first..."
        cd backend
        vercel --prod
        echo "✅ Backend deployed!"
        echo ""
        echo "⏳ Waiting 5 seconds before deploying frontend..."
        sleep 5
        cd ..
        
        echo ""
        echo "🎨 Deploying Frontend..."
        cd frontend
        vercel --prod
        cd ..
        echo "✅ Frontend deployed!"
        echo ""
        echo "🎉 Both deployments complete!"
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "=========================================="
echo "✅ Deployment Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Check your Vercel dashboard for deployment URLs"
echo "2. Update frontend .env.production with backend URL"
echo "3. Configure environment variables in Vercel dashboard"
echo "4. Test your deployed application"
echo ""
echo "📚 For detailed instructions, see VERCEL_DEPLOYMENT.md"
echo "=========================================="
