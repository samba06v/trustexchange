import { ethers } from 'ethers';
import { logger } from '../utils/logger.js';

export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private escrowContract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
    
    // Escrow contract ABI (simplified)
    const escrowABI = [
      'function createEscrow(address seller, uint256 amount) external returns (bytes32)',
      'function releaseFunds(bytes32 escrowId) external',
      'function refund(bytes32 escrowId) external',
      'function getEscrowDetails(bytes32 escrowId) external view returns (address, address, uint256, uint8)',
      'event EscrowCreated(bytes32 indexed escrowId, address indexed buyer, address indexed seller, uint256 amount)',
      'event FundsReleased(bytes32 indexed escrowId, address indexed recipient)',
      'event Refunded(bytes32 indexed escrowId, address indexed buyer)'
    ];

    this.escrowContract = new ethers.Contract(
      process.env.ESCROW_CONTRACT_ADDRESS || '',
      escrowABI,
      this.provider
    );
  }

  async verifyEscrowTransaction(txHash: string, expectedAmount: number): Promise<boolean> {
    try {
      const tx = await this.provider.getTransaction(txHash);
      if (!tx) return false;

      const receipt = await tx.wait();
      if (!receipt || receipt.status !== 1) return false;

      // Verify the transaction is to our escrow contract
      if (tx.to?.toLowerCase() !== process.env.ESCROW_CONTRACT_ADDRESS?.toLowerCase()) {
        return false;
      }

      logger.info(`Escrow transaction verified: ${txHash}`);
      return true;
    } catch (error) {
      logger.error('Error verifying escrow transaction:', error);
      return false;
    }
  }

  async getEscrowDetails(escrowId: string) {
    try {
      const details = await this.escrowContract.getEscrowDetails(escrowId);
      return {
        buyer: details[0],
        seller: details[1],
        amount: ethers.formatUnits(details[2], 6), // USDT has 6 decimals
        status: details[3]
      };
    } catch (error) {
      logger.error('Error getting escrow details:', error);
      throw error;
    }
  }

  async listenToEscrowEvents() {
    this.escrowContract.on('EscrowCreated', (escrowId, buyer, seller, amount, event) => {
      logger.info('New escrow created:', { escrowId, buyer, seller, amount: ethers.formatUnits(amount, 6) });
    });

    this.escrowContract.on('FundsReleased', (escrowId, recipient, event) => {
      logger.info('Funds released:', { escrowId, recipient });
    });
  }
}
