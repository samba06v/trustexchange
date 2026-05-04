#!/bin/bash

echo "🔍 TrustExchange Setup Verification"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    VERSION=$(node -v)
    echo -e "${GREEN}✓ $VERSION${NC}"
else
    echo -e "${RED}✗ Not found${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    VERSION=$(npm -v)
    echo -e "${GREEN}✓ v$VERSION${NC}"
else
    echo -e "${RED}✗ Not found${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check MongoDB
echo -n "Checking MongoDB... "
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}✓ Installed${NC}"
elif docker ps | grep -q mongodb; then
    echo -e "${GREEN}✓ Running in Docker${NC}"
else
    echo -e "${YELLOW}⚠ Not found (Docker recommended)${NC}"
fi

# Check frontend dependencies
echo -n "Checking frontend dependencies... "
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓ Installed${NC}"
else
    echo -e "${RED}✗ Not installed${NC}"
    echo "  Run: npm install"
    ERRORS=$((ERRORS + 1))
fi

# Check backend dependencies
echo -n "Checking backend dependencies... "
if [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}✓ Installed${NC}"
else
    echo -e "${RED}✗ Not installed${NC}"
    echo "  Run: cd backend && npm install"
    ERRORS=$((ERRORS + 1))
fi

# Check contracts dependencies
echo -n "Checking contracts dependencies... "
if [ -d "contracts/node_modules" ]; then
    echo -e "${GREEN}✓ Installed${NC}"
else
    echo -e "${RED}✗ Not installed${NC}"
    echo "  Run: cd contracts && npm install"
    ERRORS=$((ERRORS + 1))
fi

# Check environment files
echo -n "Checking .env file... "
if [ -f ".env" ]; then
    echo -e "${GREEN}✓ Exists${NC}"
else
    echo -e "${YELLOW}⚠ Not found${NC}"
    echo "  Create .env file with required variables"
fi

echo -n "Checking backend/.env file... "
if [ -f "backend/.env" ]; then
    echo -e "${GREEN}✓ Exists${NC}"
else
    echo -e "${YELLOW}⚠ Not found${NC}"
    echo "  Copy backend/.env.example to backend/.env"
fi

# Check if ports are available
echo -n "Checking port 5173 (frontend)... "
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠ In use${NC}"
else
    echo -e "${GREEN}✓ Available${NC}"
fi

echo -n "Checking port 5000 (backend)... "
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠ In use${NC}"
else
    echo -e "${GREEN}✓ Available${NC}"
fi

echo -n "Checking port 27017 (MongoDB)... "
if lsof -Pi :27017 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}✓ MongoDB running${NC}"
else
    echo -e "${YELLOW}⚠ Not running${NC}"
    echo "  Start MongoDB: docker run -d -p 27017:27017 mongo"
fi

echo ""
echo "===================================="

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "You're ready to start:"
    echo "1. cd backend && npm run dev"
    echo "2. npm run dev (in another terminal)"
    echo "3. Open http://localhost:5173"
else
    echo -e "${RED}❌ $ERRORS error(s) found${NC}"
    echo ""
    echo "Please fix the errors above and run this script again."
fi

echo ""
