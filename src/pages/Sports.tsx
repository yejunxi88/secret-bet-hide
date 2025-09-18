import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Users, TrendingUp, Clock, Zap } from "lucide-react";

const sportsCategories = [
  {
    id: 1,
    name: "NFL",
    icon: "🏈",
    activeEvents: 12,
    totalVolume: "4.2M",
    description: "American Football League"
  },
  {
    id: 2,
    name: "NBA",
    icon: "🏀",
    activeEvents: 8,
    totalVolume: "3.1M",
    description: "National Basketball Association"
  },
  {
    id: 3,
    name: "Premier League",
    icon: "⚽",
    activeEvents: 15,
    totalVolume: "2.8M",
    description: "English Premier League"
  },
  {
    id: 4,
    name: "NHL",
    icon: "🏒",
    activeEvents: 6,
    totalVolume: "1.9M",
    description: "National Hockey League"
  },
  {
    id: 5,
    name: "MLB",
    icon: "⚾",
    activeEvents: 20,
    totalVolume: "2.3M",
    description: "Major League Baseball"
  },
  {
    id: 6,
    name: "UFC",
    icon: "🥊",
    activeEvents: 3,
    totalVolume: "1.5M",
    description: "Ultimate Fighting Championship"
  }
];

const Sports = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="font-orbitron font-black text-4xl md:text-6xl text-foreground">
            <span className="text-neon-blue animate-glow">SPORTS</span>{" "}
            <span className="text-accent animate-glow" style={{ animationDelay: '0.3s' }}>BETTING</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your sport and place encrypted bets on live events. All wagers remain hidden until results are revealed.
          </p>
        </div>

        {/* Sports Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sportsCategories.map((sport) => (
            <Card key={sport.id} className="p-6 gradient-bet-slip border-border/20 bet-slip-shadow hover:shadow-neon transition-all duration-300 group cursor-pointer">
              <div className="space-y-4">
                {/* Sport Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{sport.icon}</div>
                    <div>
                      <h3 className="font-orbitron font-bold text-xl text-foreground group-hover:text-neon-blue transition-colors">
                        {sport.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{sport.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-primary/50 text-primary font-orbitron">
                    LIVE
                  </Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-secondary/30 rounded-lg border border-border/30">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="w-4 h-4 text-neon-blue" />
                      <span className="text-sm text-muted-foreground">Active Events</span>
                    </div>
                    <span className="font-orbitron font-bold text-lg text-neon-blue">{sport.activeEvents}</span>
                  </div>
                  <div className="text-center p-3 bg-secondary/30 rounded-lg border border-border/30">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-4 h-4 text-neon-green" />
                      <span className="text-sm text-muted-foreground">Volume</span>
                    </div>
                    <span className="font-orbitron font-bold text-lg text-neon-green">{sport.totalVolume}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full font-orbitron font-bold group-hover:shadow-accent-glow transition-all duration-300"
                  size="lg"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  View {sport.name} Events
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card className="p-6 gradient-bet-slip border-primary/20 neon-glow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                <span className="font-orbitron font-bold text-accent">TOTAL EVENTS</span>
              </div>
              <span className="font-orbitron font-black text-2xl text-neon-blue">64</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-neon-green" />
                <span className="font-orbitron font-bold text-neon-green">ACTIVE BETTORS</span>
              </div>
              <span className="font-orbitron font-black text-2xl text-neon-green">2,847</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="font-orbitron font-bold text-accent">TOTAL VOLUME</span>
              </div>
              <span className="font-orbitron font-black text-2xl text-neon-blue">16.8M ETH</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5 text-neon-green" />
                <span className="font-orbitron font-bold text-neon-green">ENCRYPTION</span>
              </div>
              <span className="font-orbitron font-black text-2xl text-neon-green">100%</span>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Sports;