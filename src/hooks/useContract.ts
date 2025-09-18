import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { parseEther, encodeFunctionData } from 'viem';

// Contract ABI for SecretBetHide
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_eventId", "type": "string"},
      {"internalType": "uint32", "name": "_encryptedAmount", "type": "uint32"},
      {"internalType": "uint32", "name": "_encryptedOdds", "type": "uint32"},
      {"internalType": "uint32", "name": "_encryptedPayout", "type": "uint32"}
    ],
    "name": "placeBet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_betId", "type": "uint256"},
      {"internalType": "bool", "name": "_encryptedWon", "type": "bool"},
      {"internalType": "uint32", "name": "_encryptedPayout", "type": "uint32"}
    ],
    "name": "resolveBet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_eventId", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "uint32", "name": "_encryptedHomeOdds", "type": "uint32"},
      {"internalType": "uint32", "name": "_encryptedAwayOdds", "type": "uint32"},
      {"internalType": "uint32", "name": "_encryptedDrawOdds", "type": "uint32"},
      {"internalType": "uint256", "name": "_endTime", "type": "uint256"}
    ],
    "name": "createEvent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "bets",
    "outputs": [
      {"internalType": "address", "name": "bettor", "type": "address"},
      {"internalType": "uint32", "name": "amount", "type": "uint32"},
      {"internalType": "uint32", "name": "odds", "type": "uint32"},
      {"internalType": "uint32", "name": "payout", "type": "uint32"},
      {"internalType": "bool", "name": "isResolved", "type": "bool"},
      {"internalType": "bool", "name": "isWon", "type": "bool"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
      {"internalType": "string", "name": "eventId", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string", "name": "", "type": "string"}],
    "name": "events",
    "outputs": [
      {"internalType": "string", "name": "eventId", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint32", "name": "homeOdds", "type": "uint32"},
      {"internalType": "uint32", "name": "awayOdds", "type": "uint32"},
      {"internalType": "uint32", "name": "drawOdds", "type": "uint32"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"},
      {"internalType": "address", "name": "oracle", "type": "address"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "userBets",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalBets",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract address (will be set after deployment)
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

export const useSecretBetContract = () => {
  const { address } = useAccount();
  const { writeContract, isPending, error } = useWriteContract();

  // Place an encrypted bet
  const placeEncryptedBet = async (
    eventId: string,
    encryptedAmount: number,
    encryptedOdds: number,
    encryptedPayout: number
  ) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'placeBet',
        args: [eventId, encryptedAmount, encryptedOdds, encryptedPayout],
      });
      return hash;
    } catch (err) {
      console.error('Error placing bet:', err);
      throw err;
    }
  };

  // Create a new event
  const createEvent = async (
    eventId: string,
    description: string,
    homeOdds: number,
    awayOdds: number,
    drawOdds: number,
    endTime: number
  ) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'createEvent',
        args: [eventId, description, homeOdds, awayOdds, drawOdds, endTime],
      });
      return hash;
    } catch (err) {
      console.error('Error creating event:', err);
      throw err;
    }
  };

  // Resolve a bet
  const resolveBet = async (
    betId: number,
    won: boolean,
    payout: number
  ) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'resolveBet',
        args: [betId, won, payout],
      });
      return hash;
    } catch (err) {
      console.error('Error resolving bet:', err);
      throw err;
    }
  };

  return {
    placeEncryptedBet,
    createEvent,
    resolveBet,
    isPending,
    error,
  };
};

// Hook for reading contract data
export const useContractData = () => {
  const { address } = useAccount();

  // Get user's bets
  const { data: userBets, refetch: refetchUserBets } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'userBets',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Get total bets
  const { data: totalBets } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'totalBets',
  });

  // Get specific bet details
  const getBetDetails = (betId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'bets',
      args: [betId],
    });
  };

  // Get event details
  const getEventDetails = (eventId: string) => {
    return useReadContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'events',
      args: [eventId],
    });
  };

  return {
    userBets,
    totalBets,
    getBetDetails,
    getEventDetails,
    refetchUserBets,
  };
};

// FHE encryption utilities
export const useFHEEncryption = () => {
  // Simple encryption simulation (in real implementation, use FHE library)
  const encryptData = (data: number): number => {
    // This is a placeholder - in real implementation, use FHE encryption
    return data * 1000 + Math.floor(Math.random() * 100);
  };

  const decryptData = (encryptedData: number): number => {
    // This is a placeholder - in real implementation, use FHE decryption
    return Math.floor(encryptedData / 1000);
  };

  return {
    encryptData,
    decryptData,
  };
};
