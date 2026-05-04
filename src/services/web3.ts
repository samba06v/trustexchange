import { ethers } from 'ethers';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;

  async connectWallet(): Promise<{ address: string; chainId: number }> {
    if (!window.ethereum) {
      toast.error('Please install MetaMask!');
      throw new Error('MetaMask not installed');
    }

    try {
      this.provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      this.signer = await this.provider.getSigner();
      const network = await this.provider.getNetwork();
      
      toast.success('Wallet connected successfully!');
      
      return {
        address: accounts[0],
        chainId: Number(network.chainId),
      };
    } catch (error: any) {
      toast.error('Failed to connect wallet');
      throw error;
    }
  }

  async getBalance(address: string): Promise<string> {
    if (!this.provider) throw new Error('Provider not initialized');
    
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  async signMessage(message: string): Promise<string> {
    if (!this.signer) throw new Error('Signer not initialized');
    
    return await this.signer.signMessage(message);
  }

  async switchNetwork(chainId: number): Promise<void> {
    if (!window.ethereum) throw new Error('MetaMask not installed');

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        toast.error('Please add this network to MetaMask');
      }
      throw error;
    }
  }

  getEscrowContract(contractAddress: string) {
    if (!this.signer) throw new Error('Signer not initialized');

    const abi = [
      'function createEscrow(bytes32 escrowId, address buyer, uint256 amount) external',
      'function confirmPayment(bytes32 escrowId) external',
      'function confirmFiatReceived(bytes32 escrowId) external',
      'function raiseDispute(bytes32 escrowId, string reason) external',
      'function getEscrowDetails(bytes32 escrowId) external view returns (address, address, uint256, uint8, bool, bool)',
    ];

    return new ethers.Contract(contractAddress, abi, this.signer);
  }

  getUSDTContract(tokenAddress: string) {
    if (!this.signer) throw new Error('Signer not initialized');

    const abi = [
      'function approve(address spender, uint256 amount) external returns (bool)',
      'function balanceOf(address account) external view returns (uint256)',
      'function transfer(address to, uint256 amount) external returns (bool)',
    ];

    return new ethers.Contract(tokenAddress, abi, this.signer);
  }
}

export const web3Service = new Web3Service();
