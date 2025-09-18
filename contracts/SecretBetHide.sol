// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@fhevm/solidity/contracts/FHE.sol";
import "@fhevm/solidity/contracts/access/Permissioned.sol";

/**
 * @title SecretBetHide
 * @dev A fully homomorphic encryption (FHE) powered betting platform
 * @notice This contract enables private betting with encrypted data processing
 */
contract SecretBetHide is Permissioned {
    using FHE for euint32;
    using FHE for euint64;
    using FHE for ebool;

    // Events
    event BetPlaced(
        address indexed bettor,
        uint256 indexed betId,
        bytes32 encryptedAmount,
        bytes32 encryptedOdds
    );
    
    event BetResolved(
        uint256 indexed betId,
        bool won,
        bytes32 encryptedPayout
    );
    
    event OracleUpdated(
        address indexed oracle,
        bool isActive
    );

    // Structs
    struct Bet {
        address bettor;
        euint32 amount;        // Encrypted bet amount
        euint32 odds;         // Encrypted odds
        euint32 payout;        // Encrypted potential payout
        ebool isResolved;      // Encrypted resolution status
        ebool isWon;           // Encrypted win status
        uint256 timestamp;
        string eventId;
    }

    struct Event {
        string eventId;
        string description;
        euint32 homeOdds;      // Encrypted home team odds
        euint32 awayOdds;      // Encrypted away team odds
        euint32 drawOdds;      // Encrypted draw odds
        ebool isActive;        // Encrypted active status
        uint256 endTime;
        address oracle;
    }

    // State variables
    mapping(uint256 => Bet) public bets;
    mapping(string => Event) public events;
    mapping(address => bool) public oracles;
    mapping(address => uint256[]) public userBets;
    
    uint256 public nextBetId = 1;
    uint256 public totalBets;
    uint256 public totalVolume;
    
    address public owner;
    uint256 public platformFee = 250; // 2.5% in basis points
    uint256 public constant MAX_FEE = 1000; // 10% max fee

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier onlyOracle() {
        require(oracles[msg.sender], "Not an oracle");
        _;
    }

    modifier validEvent(string memory _eventId) {
        require(bytes(events[_eventId].eventId).length > 0, "Event does not exist");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Place a new encrypted bet
     * @param _eventId The event identifier
     * @param _encryptedAmount Encrypted bet amount
     * @param _encryptedOdds Encrypted odds
     * @param _encryptedPayout Encrypted potential payout
     */
    function placeBet(
        string memory _eventId,
        euint32 _encryptedAmount,
        euint32 _encryptedOdds,
        euint32 _encryptedPayout
    ) external validEvent(_eventId) {
        require(FHE.decrypt(events[_eventId].isActive), "Event is not active");
        
        uint256 betId = nextBetId++;
        bets[betId] = Bet({
            bettor: msg.sender,
            amount: _encryptedAmount,
            odds: _encryptedOdds,
            payout: _encryptedPayout,
            isResolved: FHE.asEbool(false),
            isWon: FHE.asEbool(false),
            timestamp: block.timestamp,
            eventId: _eventId
        });
        
        userBets[msg.sender].push(betId);
        totalBets++;
        
        // Update total volume (encrypted)
        totalVolume = FHE.decrypt(totalVolume) + FHE.decrypt(_encryptedAmount);
        
        emit BetPlaced(msg.sender, betId, FHE.asBytes32(_encryptedAmount), FHE.asBytes32(_encryptedOdds));
    }

    /**
     * @dev Resolve a bet with encrypted result
     * @param _betId The bet identifier
     * @param _encryptedWon Encrypted win status
     * @param _encryptedPayout Encrypted actual payout
     */
    function resolveBet(
        uint256 _betId,
        ebool _encryptedWon,
        euint32 _encryptedPayout
    ) external onlyOracle {
        require(_betId < nextBetId, "Invalid bet ID");
        require(!FHE.decrypt(bets[_betId].isResolved), "Bet already resolved");
        
        bets[_betId].isResolved = FHE.asEbool(true);
        bets[_betId].isWon = _encryptedWon;
        bets[_betId].payout = _encryptedPayout;
        
        emit BetResolved(_betId, FHE.decrypt(_encryptedWon), FHE.asBytes32(_encryptedPayout));
    }

    /**
     * @dev Create a new betting event
     * @param _eventId Unique event identifier
     * @param _description Event description
     * @param _encryptedHomeOdds Encrypted home team odds
     * @param _encryptedAwayOdds Encrypted away team odds
     * @param _encryptedDrawOdds Encrypted draw odds
     * @param _endTime Event end timestamp
     */
    function createEvent(
        string memory _eventId,
        string memory _description,
        euint32 _encryptedHomeOdds,
        euint32 _encryptedAwayOdds,
        euint32 _encryptedDrawOdds,
        uint256 _endTime
    ) external onlyOwner {
        require(bytes(events[_eventId].eventId).length == 0, "Event already exists");
        
        events[_eventId] = Event({
            eventId: _eventId,
            description: _description,
            homeOdds: _encryptedHomeOdds,
            awayOdds: _encryptedAwayOdds,
            drawOdds: _encryptedDrawOdds,
            isActive: FHE.asEbool(true),
            endTime: _endTime,
            oracle: msg.sender
        });
    }

    /**
     * @dev Update event status
     * @param _eventId Event identifier
     * @param _encryptedIsActive Encrypted active status
     */
    function updateEventStatus(
        string memory _eventId,
        ebool _encryptedIsActive
    ) external onlyOracle validEvent(_eventId) {
        events[_eventId].isActive = _encryptedIsActive;
    }

    /**
     * @dev Add or remove oracle
     * @param _oracle Oracle address
     * @param _isActive Oracle status
     */
    function setOracle(address _oracle, bool _isActive) external onlyOwner {
        oracles[_oracle] = _isActive;
        emit OracleUpdated(_oracle, _isActive);
    }

    /**
     * @dev Update platform fee
     * @param _newFee New fee in basis points
     */
    function setPlatformFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= MAX_FEE, "Fee too high");
        platformFee = _newFee;
    }

    /**
     * @dev Get user's bet history
     * @param _user User address
     * @return Array of bet IDs
     */
    function getUserBets(address _user) external view returns (uint256[] memory) {
        return userBets[_user];
    }

    /**
     * @dev Get bet details (encrypted)
     * @param _betId Bet identifier
     * @return Encrypted bet data
     */
    function getBet(uint256 _betId) external view returns (
        address bettor,
        euint32 amount,
        euint32 odds,
        euint32 payout,
        ebool isResolved,
        ebool isWon,
        uint256 timestamp,
        string memory eventId
    ) {
        Bet memory bet = bets[_betId];
        return (
            bet.bettor,
            bet.amount,
            bet.odds,
            bet.payout,
            bet.isResolved,
            bet.isWon,
            bet.timestamp,
            bet.eventId
        );
    }

    /**
     * @dev Get event details (encrypted)
     * @param _eventId Event identifier
     * @return Encrypted event data
     */
    function getEvent(string memory _eventId) external view returns (
        string memory description,
        euint32 homeOdds,
        euint32 awayOdds,
        euint32 drawOdds,
        ebool isActive,
        uint256 endTime,
        address oracle
    ) {
        Event memory event = events[_eventId];
        return (
            event.description,
            event.homeOdds,
            event.awayOdds,
            event.drawOdds,
            event.isActive,
            event.endTime,
            event.oracle
        );
    }

    /**
     * @dev Calculate encrypted payout
     * @param _amount Encrypted bet amount
     * @param _odds Encrypted odds
     * @return Encrypted payout amount
     */
    function calculatePayout(
        euint32 _amount,
        euint32 _odds
    ) external pure returns (euint32) {
        // Payout = amount * odds / 100
        return _amount.mul(_odds).div(100);
    }

    /**
     * @dev Emergency pause function
     */
    function emergencyPause() external onlyOwner {
        // Implementation for emergency pause
        // This would set a global pause state
    }

    /**
     * @dev Withdraw platform fees
     */
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        payable(owner).transfer(balance);
    }
}
