#!/bin/bash

echo "🚀 TrustExchange Setup Script"
echo "=============================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js not found. Please install Node.js 18+ first.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) found${NC}"

# Check MongoDB
echo -e "${BLUE}Checking MongoDB...${NC}"
if ! command -v mongod &> /dev/null; then
    echo -e "${YELLOW}MongoDB not found. Please install MongoDB or use Docker.${NC}"
    echo "Docker command: docker run -d -p 27017:27017 --name mongodb mongo:latest"
fi

echo ""
echo -e "${BLUE}Installing Frontend Dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

echo ""
echo -e "${BLUE}Installing Backend Dependencies...${NC}"
cd backend
npm install
cd ..
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

echo ""
echo -e "${BLUE}Installing Smart Contract Dependencies...${NC}"
cd contracts
npm install
cd ..
echo -e "${GREEN}✓ Smart contract dependencies installed${NC}"

echo ""
echo -e "${BLUE}Creating environment files...${NC}"

# Create frontend .env
if [ ! -f .env ]; then
    cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_ESCROW_CONTRACT_ADDRESS=
VITE_USDT_CONTRACT_ADDRESS=
EOF
    echo -e "${GREEN}✓ Created .env${NC}"
else
    echo -e "${YELLOW}⚠ .env already exists, skipping${NC}"
fi

# Create backend .env
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✓ Created backend/.env${NC}"
else
    echo -e "${YELLOW}⚠ backend/.env already exists, skipping${NC}"
fi

# Create deployments directory
mkdir -p contracts/deployments
mkdir -p backend/logs

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your MongoDB URI and API keys"
echo "2. Start MongoDB: mongod or docker run -d -p 27017:27017 mongo"
echo "3. Compile contracts: cd contracts && npx hardhat compile"
echo "4. Deploy contracts: cd contracts && npx hardhat run scripts/deploy.js --network localhost"
echo "5. Start backend: cd backend && npm run dev"
echo "6. Start frontend: npm run dev"
echo ""
echo "Happy coding! 🎉"
