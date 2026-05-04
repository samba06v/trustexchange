@echo off
REM TrustExchange Vercel Deployment Script for Windows
REM This script helps deploy both frontend and backend to Vercel

echo.
echo ========================================
echo 🚀 TrustExchange Vercel Deployment
echo ========================================
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vercel CLI not found!
    echo 📦 Installing Vercel CLI...
    npm install -g vercel
)

echo ✅ Vercel CLI is installed
echo.

REM Ask which part to deploy
echo What would you like to deploy?
echo 1) Backend only
echo 2) Frontend only
echo 3) Both (Backend first, then Frontend)
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo 🔧 Deploying Backend...
    cd backend
    call vercel --prod
    cd ..
    echo ✅ Backend deployment complete!
) else if "%choice%"=="2" (
    echo.
    echo 🎨 Deploying Frontend...
    cd frontend
    call vercel --prod
    cd ..
    echo ✅ Frontend deployment complete!
) else if "%choice%"=="3" (
    echo.
    echo 🔧 Deploying Backend first...
    cd backend
    call vercel --prod
    echo ✅ Backend deployed!
    echo.
    echo ⏳ Waiting 5 seconds before deploying frontend...
    timeout /t 5 /nobreak >nul
    cd ..
    
    echo.
    echo 🎨 Deploying Frontend...
    cd frontend
    call vercel --prod
    cd ..
    echo ✅ Frontend deployed!
    echo.
    echo 🎉 Both deployments complete!
) else (
    echo ❌ Invalid choice. Exiting.
    exit /b 1
)

echo.
echo ========================================
echo ✅ Deployment Complete!
echo.
echo 📝 Next Steps:
echo 1. Check your Vercel dashboard for deployment URLs
echo 2. Update frontend .env.production with backend URL
echo 3. Configure environment variables in Vercel dashboard
echo 4. Test your deployed application
echo.
echo 📚 For detailed instructions, see VERCEL_DEPLOYMENT.md
echo ========================================
echo.
pause
