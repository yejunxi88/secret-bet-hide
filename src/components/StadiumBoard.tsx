import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Zap } from "lucide-react";

const boardData = [
  { event: "KC vs BUF", odds: "+150 / -180", status: "LIVE", volume: "2.4M ETH" },
  { event: "LAL vs GSW", odds: "+110 / -130", status: "8:00 PM", volume: "1.8M ETH" },
  { event: "ARS vs CHE", odds: "+200 / +180", status: "SAT 12:30", volume: "985K ETH" },
  { event: "NYR vs BOS", odds: "+140 / -160", status: "FRI 7:00", volume: "742K ETH" },
  { event: "MIA vs LAC", odds: "+175 / -195", status: "SUN 3:30", volume: "1.2M ETH" },
  { event: "TB vs DAL", odds: "+120 / -140", status: "MON 8:00", volume: "890K ETH" }
];

export const StadiumBoard = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-foreground">
            <span className="text-neon-blue animate-glow">STADIUM</span>{" "}
            <span className="text-accent animate-glow" style={{ animationDelay: '0.3s' }}>BOARD</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time odds board showing encrypted betting activity across all sports.
          </p>
        </div>

        {/* Stadium Board Display */}
        <Card className="p-8 gradient-bet-slip border-primary/20 neon-glow">
          <div className="space-y-6">
            {/* Board Header */}
            <div className="grid grid-cols-4 gap-4 pb-4 border-b border-border/30">
              <div className="font-orbitron font-bold text-sm text-accent">EVENT</div>
              <div className="font-orbitron font-bold text-sm text-accent text-center">ODDS</div>
              <div className="font-orbitron font-bold text-sm text-accent text-center">STATUS</div>
              <div className="font-orbitron font-bold text-sm text-accent text-right">VOLUME</div>
            </div>

            {/* Board Rows */}
            <div className="space-y-3">
              {boardData.map((item, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-4 gap-4 py-3 px-4 bg-secondary/20 rounded-lg border border-border/30 hover:border-primary/50 hover:bg-secondary/30 transition-all duration-300 group cursor-pointer"
                >
                  <div className="font-orbitron font-semibold text-foreground group-hover:text-neon-blue transition-colors">
                    {item.event}
                  </div>
                  <div className="font-orbitron font-bold text-neon-blue text-center">
                    {item.odds}
                  </div>
                  <div className="text-center">
                    {item.status === "LIVE" ? (
                      <Badge variant="outline" className="border-accent text-accent font-orbitron animate-pulse-neon">
                        <div className="w-2 h-2 bg-accent rounded-full mr-1 animate-pulse"></div>
                        LIVE
                      </Badge>
                    ) : (
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span className="font-orbitron">{item.status}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <TrendingUp className="w-3 h-3 text-neon-green" />
                      <span className="font-orbitron font-semibold text-neon-green text-sm">
                        {item.volume}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Board Footer */}
            <div className="pt-4 border-t border-border/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground font-orbitron">
                  Live Updates
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-orbitron">
                <span>Total Volume: 9.8M ETH</span>
                <span>Active Bets: 4,216</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};