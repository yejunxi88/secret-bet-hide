import { Button } from "@/components/ui/button";
import { Shield, Lock, Zap, TrendingUp } from "lucide-react";
import stadiumHero from "@/assets/stadium-hero.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${stadiumHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90"></div>
      </div>

      {/* Stadium Lighting Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-neon-blue/20 rounded-full blur-3xl animate-pulse-neon"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-glow"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-neon-pink/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
        {/* Main Headline */}
        <div className="space-y-4">
          <h1 className="font-orbitron font-black text-6xl md:text-8xl lg:text-9xl text-foreground tracking-tight">
            <span className="block text-neon-blue animate-glow">BET IN</span>
            <span className="block text-accent animate-glow" style={{ animationDelay: '0.5s' }}>SECRET</span>
          </h1>
          <p className="font-orbitron text-xl md:text-2xl text-neon-green font-medium tracking-wide">
            REVEAL AT RESULTS
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Private sports betting with encrypted wagers. Your bets remain hidden until event resolution, 
          eliminating line manipulation and ensuring fair play.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto my-12">
          <div className="flex flex-col items-center p-6 gradient-bet-slip rounded-lg border border-primary/20 group hover:shadow-neon transition-all duration-300">
            <Shield className="w-8 h-8 text-primary mb-3 group-hover:animate-pulse-neon" />
            <h3 className="font-orbitron font-bold text-foreground mb-2">Encrypted Bets</h3>
            <p className="text-sm text-muted-foreground text-center">All wagers encrypted until resolution</p>
          </div>
          
          <div className="flex flex-col items-center p-6 gradient-bet-slip rounded-lg border border-accent/20 group hover:shadow-accent-glow transition-all duration-300">
            <Lock className="w-8 h-8 text-accent mb-3 group-hover:animate-glow" />
            <h3 className="font-orbitron font-bold text-foreground mb-2">No Manipulation</h3>
            <p className="text-sm text-muted-foreground text-center">Lines protected from insider influence</p>
          </div>
          
          <div className="flex flex-col items-center p-6 gradient-bet-slip rounded-lg border border-neon-pink/20 group hover:shadow-neon transition-all duration-300">
            <TrendingUp className="w-8 h-8 text-neon-pink mb-3 group-hover:animate-pulse-neon" />
            <h3 className="font-orbitron font-bold text-foreground mb-2">Fair Odds</h3>
            <p className="text-sm text-muted-foreground text-center">True market pricing without interference</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="font-orbitron font-bold text-lg px-8 py-6 neon-glow hover:shadow-accent-glow transition-all duration-300">
            <Zap className="w-5 h-5 mr-2" />
            Start Betting
          </Button>
          <Button variant="outline" size="lg" className="font-orbitron font-bold text-lg px-8 py-6 border-primary/50 text-primary hover:bg-primary/10">
            View Live Events
          </Button>
        </div>
      </div>
    </section>
  );
};