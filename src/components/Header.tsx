import { Button } from "@/components/ui/button";
import { Wallet, Shield, Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export const Header = () => {
  const location = useLocation();
  const { isConnected } = useAccount();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-500/30 animate-pulse"></div>
            <div className="relative flex items-center justify-center">
              <Shield className="w-4 h-4 text-white absolute" />
              <Zap className="w-2 h-2 text-yellow-300 absolute -top-1 -right-1 animate-ping" />
            </div>
          </div>
          <span className="font-orbitron font-bold text-xl text-foreground">
            SecretBet
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/sports" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/sports' 
                ? 'text-neon-blue' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sports
          </Link>
          <Link 
            to="/live-events" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/live-events' 
                ? 'text-neon-blue' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Live Events
          </Link>
          <Link 
            to="/my-bets" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/my-bets' 
                ? 'text-neon-blue' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            My Bets
          </Link>
        </nav>

        {/* Wallet Connect */}
        <div className="flex items-center gap-3">
          <ConnectButton />
          {isConnected && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
      </div>
    </header>
  );
};