import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, TrendingUp, Zap } from "lucide-react";

const liveEvents = [
  {
    id: 1,
    sport: "NFL",
    homeTeam: "Chiefs",
    awayTeam: "Bills",
    homeOdds: "+150",
    awayOdds: "-180",
    time: "Sunday 8:20 PM ET",
    bettors: 1247,
    volume: "2.4M"
  },
  {
    id: 2,
    sport: "NBA",
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    homeOdds: "+110",
    awayOdds: "-130",
    time: "Tonight 10:00 PM ET",
    bettors: 892,
    volume: "1.8M"
  },
  {
    id: 3,
    sport: "Premier League",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    homeOdds: "+200",
    awayOdds: "+180",
    time: "Saturday 12:30 PM ET",
    bettors: 654,
    volume: "985K"
  },
  {
    id: 4,
    sport: "NHL",
    homeTeam: "Rangers",
    awayTeam: "Bruins",
    homeOdds: "+140",
    awayOdds: "-160",
    time: "Friday 7:00 PM ET",
    bettors: 423,
    volume: "742K"
  }
];

const LiveEvents = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 container mx-auto px-4">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-foreground">
            <span className="text-neon-blue animate-glow">LIVE</span>{" "}
            <span className="text-accent animate-glow" style={{ animationDelay: '0.3s' }}>EVENTS</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Place encrypted bets on live sporting events. All wagers hidden until resolution.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveEvents.map((event) => (
            <Card key={event.id} className="p-6 gradient-bet-slip border-border/20 bet-slip-shadow hover:shadow-neon transition-all duration-300 group">
              <div className="space-y-4">
                {/* Sport Badge & Stats */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-primary/50 text-primary font-orbitron">
                    {event.sport}
                  </Badge>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{event.bettors}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{event.volume}</span>
                    </div>
                  </div>
                </div>

                {/* Teams */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border/30">
                    <span className="font-semibold text-foreground">{event.awayTeam}</span>
                    <span className="font-orbitron font-bold text-neon-blue text-lg">{event.awayOdds}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-xs text-muted-foreground font-orbitron">VS</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border/30">
                    <span className="font-semibold text-foreground">{event.homeTeam}</span>
                    <span className="font-orbitron font-bold text-accent text-lg">{event.homeOdds}</span>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>

                {/* Bet Button */}
                <Button 
                  className="w-full font-orbitron font-bold group-hover:shadow-accent-glow transition-all duration-300"
                  size="lg"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Place Encrypted Bet
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View More */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="font-orbitron font-bold border-primary/50 text-primary hover:bg-primary/10">
            View All Events
          </Button>
        </div>
      </div>
      </main>
    </div>
  );
};

export default LiveEvents;