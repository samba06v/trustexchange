// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TrustExchangeEscrow
 * @dev Decentralized P2P escrow contract for USDT/stablecoin trading
 */
contract TrustExchangeEscrow is ReentrancyGuard, Ownable {
    IERC20 public immutable usdtToken;
    
    enum EscrowStatus { Active, Completed, Disputed, Refunded }
    
    struct Escrow {
        address buyer;
        address seller;
        uint256 amount;
        EscrowStatus status;
        uint256 createdAt;
        uint256 completedAt;
        bool buyerConfirmed;
        bool sellerConfirmed;
    }
    
    struct Dispute {
        bool active;
        address initiator;
        uint256 createdAt;
        string reason;
    }
    
    mapping(bytes32 => Escrow) public escrows;
    mapping(bytes32 => Dispute) public disputes;
    mapping(address => bool) public arbiters;
    
    uint256 public constant PLATFORM_FEE_BPS = 10; // 0.1%
    uint256 public constant DISPUTE_FEE_BPS = 50; // 0.5%
    uint256 public totalFeesCollected;
    
    event EscrowCreated(bytes32 indexed escrowId, address indexed buyer, address indexed seller, uint256 amount);
    event FundsReleased(bytes32 indexed escrowId, address indexed recipient, uint256 amount);
    event DisputeRaised(bytes32 indexed escrowId, address indexed initiator, string reason);
    event DisputeResolved(bytes32 indexed escrowId, address indexed winner, uint256 amount);
    event Refunded(bytes32 indexed escrowId, address indexed buyer, uint256 amount);
    
    constructor(address _usdtToken) {
        usdtToken = IERC20(_usdtToken);
    }
    
    modifier onlyArbiter() {
        require(arbiters[msg.sender] || msg.sender == owner(), "Not authorized arbiter");
        _;
    }
    
    function addArbiter(address _arbiter) external onlyOwner {
        arbiters[_arbiter] = true;
    }
    
    function removeArbiter(address _arbiter) external onlyOwner {
        arbiters[_arbiter] = false;
    }
    
    /**
     * @dev Create a new escrow - seller deposits USDT
     */
    function createEscrow(
        bytes32 escrowId,
        address buyer,
        uint256 amount
    ) external nonReentrant {
        require(escrows[escrowId].amount == 0, "Escrow already exists");
        require(amount > 0, "Amount must be greater than 0");
        require(buyer != address(0) && buyer != msg.sender, "Invalid buyer address");
        
        require(
            usdtToken.transferFrom(msg.sender, address(this), amount),
            "USDT transfer failed"
        );
        
        escrows[escrowId] = Escrow({
            buyer: buyer,
            seller: msg.sender,
            amount: amount,
            status: EscrowStatus.Active,
            createdAt: block.timestamp,
            completedAt: 0,
            buyerConfirmed: false,
            sellerConfirmed: false
        });
        
        emit EscrowCreated(escrowId, buyer, msg.sender, amount);
    }
    
    /**
     * @dev Buyer confirms fiat payment received
     */
    function confirmPayment(bytes32 escrowId) external {
        Escrow storage escrow = escrows[escrowId];
        require(escrow.status == EscrowStatus.Active, "Escrow not active");
        require(msg.sender == escrow.buyer, "Only buyer can confirm");
        require(!disputes[escrowId].active, "Escrow is disputed");
        
        escrow.buyerConfirmed = true;
        
        // Auto-release if both parties confirmed
        if (escrow.sellerConfirmed) {
            _releaseFunds(escrowId);
        }
    }
    
    /**
     * @dev Seller confirms they received fiat
     */
    function confirmFiatReceived(bytes32 escrowId) external {
        Escrow storage escrow = escrows[escrowId];
        require(escrow.status == EscrowStatus.Active, "Escrow not active");
        require(msg.sender == escrow.seller, "Only seller can confirm");
        require(!disputes[escrowId].active, "Escrow is disputed");
        
        escrow.sellerConfirmed = true;
        
        // Auto-release if both parties confirmed
        if (escrow.buyerConfirmed) {
            _releaseFunds(escrowId);
        }
    }
    
    /**
     * @dev Internal function to release funds to buyer
     */
    function _releaseFunds(bytes32 escrowId) internal {
        Escrow storage escrow = escrows[escrowId];
        require(escrow.status == EscrowStatus.Active, "Escrow not active");
        
        uint256 platformFee = (escrow.amount * PLATFORM_FEE_BPS) / 10000;
        uint256 amountToRelease = escrow.amount - platformFee;
        
        escrow.status = EscrowStatus.Completed;
        escrow.completedAt = block.timestamp;
        totalFeesCollected += platformFee;
        
        require(
            usdtToken.transfer(escrow.buyer, amountToRelease),
            "USDT transfer failed"
        );
        
        emit FundsReleased(escrowId, escrow.buyer, amountToRelease);
    }
    
    /**
     * @dev Raise a dispute
     */
    function raiseDispute(bytes32 escrowId, string calldata reason) external {
        Escrow storage escrow = escrows[escrowId];
        require(escrow.status == EscrowStatus.Active, "Escrow not active");
        require(
            msg.sender == escrow.buyer || msg.sender == escrow.seller,
            "Not a party to this escrow"
        );
        require(!disputes[escrowId].active, "Dispute already active");
        
        escrow.status = EscrowStatus.Disputed;
        disputes[escrowId] = Dispute({
            active: true,
            initiator: msg.sender,
            createdAt: block.timestamp,
            reason: reason
        });
        
        emit DisputeRaised(escrowId, msg.sender, reason);
    }
    
    /**
     * @dev Arbiter resolves dispute
     */
    function resolveDispute(
        bytes32 escrowId,
        address winner
    ) external onlyArbiter nonReentrant {
        Escrow storage escrow = escrows[escrowId];
        Dispute storage dispute = disputes[escrowId];
        
        require(escrow.status == EscrowStatus.Disputed, "Not disputed");
        require(dispute.active, "Dispute not active");
        require(
            winner == escrow.buyer || winner == escrow.seller,
            "Invalid winner"
        );
        
        uint256 disputeFee = (escrow.amount * DISPUTE_FEE_BPS) / 10000;
        uint256 amountToWinner = escrow.amount - disputeFee;
        
        escrow.status = EscrowStatus.Completed;
        escrow.completedAt = block.timestamp;
        dispute.active = false;
        totalFeesCollected += disputeFee;
        
        require(
            usdtToken.transfer(winner, amountToWinner),
            "USDT transfer failed"
        );
        
        emit DisputeResolved(escrowId, winner, amountToWinner);
    }
    
    /**
     * @dev Refund to seller (only if buyer doesn't confirm within timelock)
     */
    function refund(bytes32 escrowId) external nonReentrant {
        Escrow storage escrow = escrows[escrowId];
        require(escrow.status == EscrowStatus.Active, "Escrow not active");
        require(msg.sender == escrow.seller, "Only seller can refund");
        require(
            block.timestamp > escrow.createdAt + 7 days,
            "Timelock not expired"
        );
        require(!escrow.buyerConfirmed, "Buyer already confirmed");
        
        escrow.status = EscrowStatus.Refunded;
        
        require(
            usdtToken.transfer(escrow.seller, escrow.amount),
            "USDT transfer failed"
        );
        
        emit Refunded(escrowId, escrow.buyer, escrow.amount);
    }
    
    /**
     * @dev Withdraw collected fees
     */
    function withdrawFees(address recipient) external onlyOwner {
        uint256 amount = totalFeesCollected;
        totalFeesCollected = 0;
        
        require(
            usdtToken.transfer(recipient, amount),
            "USDT transfer failed"
        );
    }
    
    /**
     * @dev Get escrow details
     */
    function getEscrowDetails(bytes32 escrowId)
        external
        view
        returns (
            address buyer,
            address seller,
            uint256 amount,
            EscrowStatus status,
            bool buyerConfirmed,
            bool sellerConfirmed
        )
    {
        Escrow memory escrow = escrows[escrowId];
        return (
            escrow.buyer,
            escrow.seller,
            escrow.amount,
            escrow.status,
            escrow.buyerConfirmed,
            escrow.sellerConfirmed
        );
    }
}
