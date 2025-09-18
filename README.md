# 🎯 Secret Bet Hide - Next-Gen Privacy Betting

> **Revolutionary betting platform powered by Fully Homomorphic Encryption**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

## 🚀 What Makes Us Different?

Secret Bet Hide isn't just another betting platform - it's a **privacy-first revolution** in decentralized gambling. Built on cutting-edge FHE technology, we ensure your betting activities remain completely anonymous and secure.

### 🔐 Core Innovation
- **Zero-Knowledge Betting**: Your bets are encrypted before they even leave your device
- **Anonymous Transactions**: No personal data collection, ever
- **FHE-Powered**: Fully Homomorphic Encryption processes your data without decryption
- **Smart Contract Security**: On-chain privacy with encrypted data processing

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18 + TypeScript + Vite |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Web3** | RainbowKit + Wagmi + Viem |
| **Encryption** | Zama FHE Oracle |
| **Blockchain** | Ethereum Sepolia Testnet |
| **Contracts** | Solidity with FHE Integration |

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Web3 wallet (Rainbow, MetaMask, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/yejunxi88/secret-bet-hide.git
cd secret-bet-hide

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Configuration

Create `.env.local` with your configuration:

```env
# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_url_here

# Wallet Configuration  
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here

# API Keys
NEXT_PUBLIC_INFURA_API_KEY=your_infura_key_here
```

## 🏗️ Smart Contract Development

### Compile & Test
```bash
# Compile contracts
npx hardhat compile

# Run test suite
npx hardhat test

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia
```

### Contract Features
- **Encrypted Betting**: All bet data encrypted using FHE
- **Anonymous Resolution**: Outcomes processed without revealing data
- **Gas Optimized**: Efficient contract design for minimal costs
- **Upgradeable**: Modular architecture for future enhancements

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy with one click

### Manual Deployment
```bash
npm run build
npm run preview
```

## 🔒 Security Architecture

### Privacy Protection
- **End-to-End Encryption**: Data encrypted from client to contract
- **Zero-Knowledge Proofs**: Verify outcomes without revealing data
- **Anonymous Identities**: No personal information required
- **Decentralized Storage**: No central data collection

### Smart Contract Security
- **FHE Integration**: Encrypted computation on-chain
- **Access Controls**: Role-based permissions
- **Emergency Pause**: Circuit breakers for security
- **Audit Ready**: Clean, documented codebase

## 📊 Performance Metrics

- **Bundle Size**: < 500KB gzipped
- **Load Time**: < 2s initial load
- **Gas Efficiency**: Optimized for minimal transaction costs
- **Global CDN**: Fast worldwide access

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation
- Follow conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Community

- **Issues**: [GitHub Issues](https://github.com/yejunxi88/secret-bet-hide/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yejunxi88/secret-bet-hide/discussions)
- **Documentation**: [Project Wiki](https://github.com/yejunxi88/secret-bet-hide/wiki)

## 🌟 Acknowledgments

- **Zama**: For FHE technology and support
- **RainbowKit**: For seamless wallet integration
- **Vercel**: For deployment infrastructure
- **Open Source Community**: For amazing tools and libraries

---

**Built with ❤️ for privacy and decentralization**
