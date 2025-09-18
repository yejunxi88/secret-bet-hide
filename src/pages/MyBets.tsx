import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Eye, TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react";

const activeBets = [
  {
    id: 1,
    match: "Chiefs vs Bills",
    sport: "NFL",
    type: "Moneyline",
    odds: "+150",
    amount: "0.5 ETH",
    potentialWin: "0.75 ETH",
    status: "encrypted",
    timeRemaining: "2h 15m"
  },
  {
    id: 2,
    match: "Lakers vs Warriors",
    sport: "NBA",
    type: "Point Spread (-3.5)",
    odds: "+110",
    amount: "1.2 ETH",
    potentialWin: "1.32 ETH",
    status: "encrypted",
    timeRemaining: "6h 45m"
  },
  {
    id: 3,
    match: "Arsenal vs Chelsea",
    sport: "Premier League",
    type: "Match Winner",
    odds: "+200",
    amount: "0.8 ETH",
    potentialWin: "1.6 ETH",
    status: "encrypted",
    timeRemaining: "1d 12h"
  }
];

const settledBets = [
  {
    id: 4,
    match: "Cowboys vs Eagles",
    sport: "NFL",
    type: "Moneyline",
    odds: "+180",
    amount: "0.3 ETH",
    result: "won",
    payout: "0.54 ETH",
    profit: "+0.24 ETH",
    settledAt: "2 days ago"
  },
  {
    id: 5,
    match: "Celtics vs Heat",
    sport: "NBA",
    type: "Over/Under 215.5",
    odds: "-110",
    amount: "0.6 ETH",
    result: "lost",
    payout: "0 ETH",
    profit: "-0.6 ETH",
    settledAt: "5 days ago"
  }
];

const MyBets = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="font-orbitron font-black text-4xl md:text-6xl text-foreground">
            <span className="text-neon-blue animate-glow">MY</span>{" "}
            <span className="text-accent animate-glow" style={{ animationDelay: '0.3s' }}>BETS</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your encrypted bets and view settlement history. All active bets remain hidden until event completion.
          </p>
        </div>

        {/* Portfolio Summary */}
        <Card className="p-6 gradient-bet-slip border-primary/20 neon-glow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-5 h-5 text-neon-blue" />
                <span className="font-orbitron font-bold text-neon-blue">ACTIVE BETS</span>
              </div>
              <span className="font-orbitron font-black text-2xl text-neon-blue">3</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="font-orbitron font-bold text-accent">TOTAL WAGERED</span>
              </div>
              <span className="font-orbitron font-black text-2xl text-accent">2.5 ETH</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Eye className="w-5 h-5 text-neon-green" />
                <span className="font-orbitron font-bold text-neon-green">POTENTIAL WIN</span>
              </div>
              <span className="font-orbitron font-black text-2xl text-neon-green">3.67 ETH</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-neon-green" />
                <span className="font-orbitron font-bold text-neon-green">WIN RATE</span>
              </div>
              <span className="font-orbitron font-black text-2xl text-neon-green">33%</span>
            </div>
          </div>
        </Card>

        {/* Bets Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="active" className="font-orbitron font-bold">
              Active Bets ({activeBets.length})
            </TabsTrigger>
            <TabsTrigger value="settled" className="font-orbitron font-bold">
              Bet History ({settledBets.length})
            </TabsTrigger>
          </TabsList>

          {/* Active Bets */}
          <TabsContent value="active" className="space-y-6">
            {activeBets.map((bet) => (
              <Card key={bet.id} className="p-6 gradient-bet-slip border-border/20 bet-slip-shadow hover:shadow-neon transition-all duration-300">
                <div className="space-y-4">
                  {/* Bet Header */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-orbitron font-bold text-xl text-foreground">{bet.match}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-primary/50 text-primary font-orbitron">
                          {bet.sport}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{bet.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="border-neon-blue text-neon-blue font-orbitron animate-pulse-neon">
                        <Lock className="w-3 h-3 mr-1" />
                        ENCRYPTED
                      </Badge>
                    </div>
                  </div>

                  {/* Bet Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-secondary/30 rounded-lg border border-border/30">
                      <div className="text-sm text-muted-foreground mb-1">Odds</div>
                      <div className="font-orbitron font-bold text-neon-blue">{bet.odds}</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg border border-border/30">
                      <div className="text-sm text-muted-foreground mb-1">Wagered</div>
                      <div className="font-orbitron font-bold text-foreground">{bet.amount}</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg border border-border/30">
                      <div className="text-sm text-muted-foreground mb-1">Potential Win</div>
                      <div className="font-orbitron font-bold text-neon-green">{bet.potentialWin}</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg border border-border/30">
                      <div className="text-sm text-muted-foreground mb-1">Time Remaining</div>
                      <div className="font-orbitron font-bold text-accent flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3" />
                        {bet.timeRemaining}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Settled Bets */}
          <TabsContent value="settled" className="space-y-6">
            {settledBets.map((bet) => (
              <Card key={bet.id} className="p-6 gradient-bet-slip border-border/20 bet-slip-shadow">
                <div className="space-y-4">
                  {/* Bet Header */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-orbitron font-bold text-xl text-foreground">{bet.match}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-primary/50 text-primary font-orbitron">
                          {bet.sport}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{bet.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant="outline" 
                        className={`font-orbitron ${
                          bet.result === 'won' 
                            ? 'border-neon-green text-neon-green' 
                            : 'border-red-500 text-red-500'
                        }`}
                      >
                        {bet.result === 'won' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {bet.result.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {/* Bet Details */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center p-3 bg-secondary/30 rounded-lg border border-border/30">
                      <div className="text-sm text-muted-foreground mb-1">Odds</div>
                      <div className="font-orbitron font-bold text-neon-blue">{bet.odds}</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg border border-border/30">
                      <div className="text-sm text-muted-foreground mb-1">Wagered</div>
                      <div className="font-orbitron font-bold text-foreground">{bet.amount}</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg border border-border/30">
                      <div className="text-sm text-muted-foreground mb-1">Payout</div>
                      <div className="font-orbitron font-bold text-foreground">{bet.payout}</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg border border-border/30">
                      <div className="text-sm text-muted-foreground mb-1">Profit/Loss</div>
                      <div className={`font-orbitron font-bold ${
                        bet.result === 'won' ? 'text-neon-green' : 'text-red-500'
                      }`}>
                        {bet.profit}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg border border-border/30">
                      <div className="text-sm text-muted-foreground mb-1">Settled</div>
                      <div className="font-orbitron font-bold text-muted-foreground text-sm">{bet.settledAt}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MyBets;