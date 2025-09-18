import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PrivacyFeatures } from "@/components/PrivacyFeatures";
import { BetSlip } from "@/components/BetSlip";
import { EncryptedBetting } from "@/components/EncryptedBetting";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        
        {/* Quick Access Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-orbitron font-black text-4xl md:text-5xl text-foreground mb-4">
              <span className="text-neon-blue animate-glow">START</span>{" "}
              <span className="text-accent animate-glow" style={{ animationDelay: '0.3s' }}>BETTING</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose your path to encrypted sports betting
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <Link to="/sports" className="group">
              <div className="p-6 gradient-bet-slip border-border/20 bet-slip-shadow hover:shadow-neon transition-all duration-300 rounded-lg">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🏟️</span>
                  </div>
                  <h3 className="font-orbitron font-bold text-xl text-foreground group-hover:text-neon-blue transition-colors">
                    Sports
                  </h3>
                  <p className="text-muted-foreground">Browse all sports categories and active events</p>
                  <Button className="w-full font-orbitron font-bold group-hover:shadow-accent-glow transition-all duration-300">
                    Explore Sports <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Link>

            <Link to="/live-events" className="group">
              <div className="p-6 gradient-bet-slip border-border/20 bet-slip-shadow hover:shadow-neon transition-all duration-300 rounded-lg">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="font-orbitron font-bold text-xl text-foreground group-hover:text-neon-blue transition-colors">
                    Live Events
                  </h3>
                  <p className="text-muted-foreground">View and bet on live sporting events in real-time</p>
                  <Button className="w-full font-orbitron font-bold group-hover:shadow-accent-glow transition-all duration-300">
                    View Live Events <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Link>

            <Link to="/my-bets" className="group">
              <div className="p-6 gradient-bet-slip border-border/20 bet-slip-shadow hover:shadow-neon transition-all duration-300 rounded-lg">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto">
                    <Lock className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-orbitron font-bold text-xl text-foreground group-hover:text-neon-blue transition-colors">
                    My Bets
                  </h3>
                  <p className="text-muted-foreground">Track your encrypted bets and betting history</p>
                  <Button className="w-full font-orbitron font-bold group-hover:shadow-accent-glow transition-all duration-300">
                    View My Bets <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Featured Bet Slips */}
          <div className="text-center mb-12">
            <h3 className="font-orbitron font-black text-3xl md:text-4xl text-foreground mb-4">
              <span className="text-neon-blue animate-glow">FEATURED</span>{" "}
              <span className="text-accent animate-glow" style={{ animationDelay: '0.3s' }}>BET SLIPS</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              Experience the future of private sports betting with our encrypted bet slips.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <BetSlip 
              match="Chiefs vs Bills" 
              odds="+150" 
              type="Moneyline" 
            />
            <BetSlip 
              match="Lakers vs Warriors" 
              odds="+110" 
              type="Point Spread (-3.5)" 
            />
            <BetSlip 
              match="Arsenal vs Chelsea" 
              odds="+200" 
              type="Match Winner" 
            />
          </div>
        </section>

        {/* Encrypted Betting Section */}
        <section className="py-16 bg-gradient-to-b from-background to-card/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-orbitron font-black text-4xl md:text-5xl text-foreground mb-4">
                <span className="text-neon-blue animate-glow">ENCRYPTED</span>{" "}
                <span className="text-accent animate-glow" style={{ animationDelay: '0.3s' }}>BETTING</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the future of private sports betting with FHE encryption. 
                Your bets are encrypted before they even leave your device.
              </p>
            </div>
            
            <EncryptedBetting />
          </div>
        </section>

        <PrivacyFeatures />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/20 py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-accent/20 animate-pulse"></div>
              <div className="relative flex items-center justify-center">
                <Lock className="w-3 h-3 text-primary-foreground absolute" />
                <Eye className="w-3 h-3 text-primary-foreground absolute animate-ping opacity-30" />
              </div>
            </div>
              <span className="font-orbitron font-bold text-xl text-foreground">SecretBet</span>
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              Private sports betting with encrypted wagers. Bet in secret, reveal at results.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Documentation</span>
            </div>
            <div className="pt-4 border-t border-border/20">
              <p className="text-xs text-muted-foreground">
                © 2024 SecretBet. All rights reserved. Bet responsibly.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
