import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Shield, TrendingUp } from "lucide-react";

interface BetSlipProps {
  match: string;
  odds: string;
  type: string;
  isEncrypted?: boolean;
}

export const BetSlip = ({ match, odds, type, isEncrypted = true }: BetSlipProps) => {
  return (
    <Card className="p-6 gradient-bet-slip border-border/20 bet-slip-shadow hover:shadow-neon transition-all duration-300 group">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isEncrypted && <Lock className="w-4 h-4 text-neon-blue animate-pulse-neon" />}
            <span className="text-sm font-orbitron text-neon-green">
              {isEncrypted ? "ENCRYPTED" : "LIVE"}
            </span>
          </div>
          <TrendingUp className="w-4 h-4 text-accent group-hover:animate-glow" />
        </div>

        {/* Match Info */}
        <div className="space-y-2">
          <h3 className="font-orbitron font-bold text-foreground">{match}</h3>
          <p className="text-sm text-muted-foreground">{type}</p>
        </div>

        {/* Odds */}
        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-primary/20">
          <span className="text-sm text-muted-foreground">Odds</span>
          <span className="font-orbitron font-bold text-neon-blue text-lg">{odds}</span>
        </div>

        {/* Bet Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Wager Amount</label>
          <div className="relative">
            <Input 
              placeholder="0.00" 
              className="bg-input/50 border-border/50 focus:border-primary focus:ring-primary/20 font-orbitron"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">ETH</span>
          </div>
        </div>

        {/* Privacy Notice */}
        {isEncrypted && (
          <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-primary">
              Your bet is encrypted until event resolution. Line manipulation is impossible.
            </p>
          </div>
        )}

        {/* Action Button */}
        <Button className="w-full neon-glow hover:shadow-accent-glow transition-all duration-300 font-orbitron font-bold">
          Place Encrypted Bet
        </Button>
      </div>
    </Card>
  );
};