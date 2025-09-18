import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, Zap, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description: "Military-grade encryption protects your bets from prying eyes until event resolution.",
    color: "primary"
  },
  {
    icon: Lock,
    title: "Zero Knowledge Proofs",
    description: "Verify bet validity without revealing bet contents. Mathematical certainty meets privacy.",
    color: "accent"
  },
  {
    icon: Eye,
    title: "Blind Betting Pool",
    description: "All participants bet into encrypted pools. No one knows the distribution until reveal.",
    color: "neon-pink"
  },
  {
    icon: Zap,
    title: "Instant Settlement",
    description: "Smart contracts automatically settle bets upon event resolution. No delays, no disputes.",
    color: "neon-green"
  },
  {
    icon: Users,
    title: "Anonymous Wagering",
    description: "Connect your wallet without revealing identity. Bet with complete anonymity.",
    color: "neon-blue"
  },
  {
    icon: TrendingUp,
    title: "Fair Market Odds",
    description: "True market pricing without manipulation. Encrypted bets prevent line movement abuse.",
    color: "accent"
  }
];

export const PrivacyFeatures = () => {
  return (
    <section className="py-20 container mx-auto px-4">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-foreground">
            <span className="text-neon-blue animate-glow">PRIVACY</span>{" "}
            <span className="text-accent animate-glow" style={{ animationDelay: '0.3s' }}>FIRST</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Revolutionary betting technology that puts privacy and fairness at the center. 
            Your bets remain completely hidden until event resolution.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-6 gradient-bet-slip border-border/20 bet-slip-shadow hover:shadow-neon transition-all duration-500 group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-neon rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-6 h-6 text-primary-foreground group-hover:animate-pulse-neon`} />
                  </div>
                  
                  <h3 className="font-orbitron font-bold text-xl text-foreground group-hover:text-neon-blue transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Progress bar effect */}
                  <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-neon w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Privacy Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center space-y-2">
            <div className="font-orbitron font-black text-4xl text-neon-blue animate-glow">
              100%
            </div>
            <p className="text-muted-foreground">Bets Encrypted</p>
          </div>
          <div className="text-center space-y-2">
            <div className="font-orbitron font-black text-4xl text-accent animate-glow" style={{ animationDelay: '0.5s' }}>
              0
            </div>
            <p className="text-muted-foreground">Data Breaches</p>
          </div>
          <div className="text-center space-y-2">
            <div className="font-orbitron font-black text-4xl text-neon-green animate-glow" style={{ animationDelay: '1s' }}>
              256-bit
            </div>
            <p className="text-muted-foreground">Encryption Standard</p>
          </div>
        </div>
      </div>
    </section>
  );
};