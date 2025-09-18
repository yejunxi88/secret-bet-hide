import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSecretBetContract, useFHEEncryption } from '@/hooks/useContract';
import { useAccount } from 'wagmi';
import { Shield, Lock, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface BettingEvent {
  id: string;
  description: string;
  homeTeam: string;
  awayTeam: string;
  homeOdds: number;
  awayOdds: number;
  drawOdds: number;
  endTime: number;
}

const mockEvents: BettingEvent[] = [
  {
    id: 'match-1',
    description: 'Champions League Final',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeOdds: 1.85,
    awayOdds: 2.10,
    drawOdds: 3.20,
    endTime: Date.now() + 86400000, // 24 hours
  },
  {
    id: 'match-2',
    description: 'Premier League Derby',
    homeTeam: 'Manchester United',
    awayTeam: 'Manchester City',
    homeOdds: 2.50,
    awayOdds: 2.80,
    drawOdds: 3.10,
    endTime: Date.now() + 172800000, // 48 hours
  },
];

export const EncryptedBetting = () => {
  const { address, isConnected } = useAccount();
  const { placeEncryptedBet, isPending } = useSecretBetContract();
  const { encryptData } = useFHEEncryption();
  
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [betAmount, setBetAmount] = useState<string>('');
  const [selectedOutcome, setSelectedOutcome] = useState<string>('');
  const [isPlacingBet, setIsPlacingBet] = useState(false);

  const handlePlaceBet = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!selectedEvent || !betAmount || !selectedOutcome) {
      toast.error('Please fill in all fields');
      return;
    }

    const event = mockEvents.find(e => e.id === selectedEvent);
    if (!event) {
      toast.error('Invalid event selected');
      return;
    }

    setIsPlacingBet(true);

    try {
      const amount = parseFloat(betAmount);
      const odds = selectedOutcome === 'home' ? event.homeOdds : 
                   selectedOutcome === 'away' ? event.awayOdds : event.drawOdds;
      
      // Encrypt the bet data using FHE
      const encryptedAmount = encryptData(amount);
      const encryptedOdds = encryptData(odds);
      const encryptedPayout = encryptData(amount * odds);

      // Place the encrypted bet on-chain
      const txHash = await placeEncryptedBet(
        selectedEvent,
        encryptedAmount,
        encryptedOdds,
        encryptedPayout
      );

      toast.success(`Bet placed successfully! Transaction: ${txHash}`);
      
      // Reset form
      setSelectedEvent('');
      setBetAmount('');
      setSelectedOutcome('');
      
    } catch (error) {
      console.error('Error placing bet:', error);
      toast.error('Failed to place bet. Please try again.');
    } finally {
      setIsPlacingBet(false);
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            Encrypted Betting
          </CardTitle>
          <CardDescription>
            Connect your wallet to place encrypted bets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Please connect your wallet to access encrypted betting features
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500" />
          Encrypted Betting
        </CardTitle>
        <CardDescription>
          Place bets with complete privacy using FHE encryption
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Event Selection */}
        <div className="space-y-2">
          <Label htmlFor="event">Select Event</Label>
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger>
              <SelectValue placeholder="Choose an event" />
            </SelectTrigger>
            <SelectContent>
              {mockEvents.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.description} - {event.homeTeam} vs {event.awayTeam}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bet Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount">Bet Amount (ETH)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.1"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            min="0.001"
            step="0.001"
          />
        </div>

        {/* Outcome Selection */}
        {selectedEvent && (
          <div className="space-y-2">
            <Label>Select Outcome</Label>
            <div className="grid grid-cols-3 gap-2">
              {(() => {
                const event = mockEvents.find(e => e.id === selectedEvent);
                if (!event) return null;
                
                return (
                  <>
                    <Button
                      variant={selectedOutcome === 'home' ? 'default' : 'outline'}
                      onClick={() => setSelectedOutcome('home')}
                      className="flex flex-col items-center p-4 h-auto"
                    >
                      <span className="font-medium">{event.homeTeam}</span>
                      <span className="text-sm text-muted-foreground">
                        {event.homeOdds}x
                      </span>
                    </Button>
                    <Button
                      variant={selectedOutcome === 'draw' ? 'default' : 'outline'}
                      onClick={() => setSelectedOutcome('draw')}
                      className="flex flex-col items-center p-4 h-auto"
                    >
                      <span className="font-medium">Draw</span>
                      <span className="text-sm text-muted-foreground">
                        {event.drawOdds}x
                      </span>
                    </Button>
                    <Button
                      variant={selectedOutcome === 'away' ? 'default' : 'outline'}
                      onClick={() => setSelectedOutcome('away')}
                      className="flex flex-col items-center p-4 h-auto"
                    >
                      <span className="font-medium">{event.awayTeam}</span>
                      <span className="text-sm text-muted-foreground">
                        {event.awayOdds}x
                      </span>
                    </Button>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Encryption Info */}
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                FHE Encryption Active
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Your bet data will be encrypted using Fully Homomorphic Encryption 
                before being sent to the blockchain. No one can see your bet details.
              </p>
            </div>
          </div>
        </div>

        {/* Place Bet Button */}
        <Button
          onClick={handlePlaceBet}
          disabled={!selectedEvent || !betAmount || !selectedOutcome || isPlacingBet || isPending}
          className="w-full"
          size="lg"
        >
          {isPlacingBet || isPending ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-spin" />
              Placing Encrypted Bet...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Place Encrypted Bet
            </>
          )}
        </Button>

        {/* Potential Payout */}
        {selectedEvent && betAmount && selectedOutcome && (
          <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              Potential Payout: {(() => {
                const event = mockEvents.find(e => e.id === selectedEvent);
                if (!event) return '0 ETH';
                const odds = selectedOutcome === 'home' ? event.homeOdds : 
                           selectedOutcome === 'away' ? event.awayOdds : event.drawOdds;
                return `${(parseFloat(betAmount) * odds).toFixed(4)} ETH`;
              })()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
