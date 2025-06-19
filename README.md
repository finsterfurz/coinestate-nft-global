# CoinEstateNFT Global Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Node-%3E%3D16.0.0-green.svg)](https://nodejs.org/)

## 🏗️ Project Overview

CoinEstateNFT is a Cayman Islands-based NFT real estate platform that uses NFTs as transferable access keys to individual real estate dashboards. Each NFT corresponds to a specific real-world property and grants exclusive, KYC-bound dashboard access with off-chain participation rights.

## 🔑 Key Features

### Access Control Logic
- **NFTs as Access Keys**: NFTs represent project-specific access rights, not equity or tokenized shares
- **Project-Specific Access**: Each NFT grants access to a specific property dashboard (e.g., Project X → NFT X₁–X₂₅₀₀)
- **Two-Tier Dashboard System**:
  - **Public Dashboard**: Property cost, rent amount, NFT distribution status
  - **Private Dashboard**: Rental income breakdown, monthly earnings reports, Cayman fund performance, governance proposals

### NFT Transfer Protocol
- All NFTs are KYC-bound upon activation
- Transfer process: Current holder deregisters → NFT becomes unlinked → New holder completes KYC
- NFT remains transferable, but access rights are off-chain controlled

### Revenue Participation
- Platform operates under Cayman Islands Private Fund + Foundation structure
- Each NFT acts as a unit-linked dashboard access credential
- Revenue pooled at SPV level → fund → Cayman payout model
- Only verified KYC + NFT holders eligible for off-chain revenue distribution

## ⚖️ Legal Framework

- **Not Securities**: NFTs are software access credentials, not shares or securities
- **Off-Chain Governance**: Revenue sharing is voluntary and off-chain, administered under Cayman law
- **Foundation Governed**: CoinEstate Foundation governs distributions, not smart contracts
- **Compliance First**: No on-chain revenue automation, DAOs, or investment guarantees

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- Modern web browser with Web3 support (MetaMask recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/finsterfurz/coinestate-nft-global.git
   cd coinestate-nft-global
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🏛️ Architecture

### Technical Stack
- **Frontend**: React 18.2.0 with Hooks and Context API
- **UI Components**: Custom component library with dark/light theme support
- **Data Visualization**: Recharts for performance metrics
- **State Management**: React Context for global state
- **Styling**: Tailwind CSS utility classes
- **Web3 Integration**: MetaMask compatibility for wallet connection

### Project Structure

```
src/
├── components/
│   ├── icons/           # SVG icon components
│   ├── ui/              # Reusable UI components
│   └── navigation/      # Navigation components
├── pages/
│   ├── Homepage.js      # Landing page with platform overview
│   ├── Dashboard.js     # Main dashboard with KYC and NFT access
│   ├── Projects.js      # Real estate projects catalog
│   ├── About.js         # About page
│   └── HowItWorks.js    # Platform explanation
├── context/
│   └── AppContext.js    # Global state management
├── data/
│   └── projects.js      # Mock project data
├── utils/
│   └── helpers.js       # Utility functions
└── App.js               # Main application component
```

## 🎯 Core Features

### 1. Wallet Integration
- MetaMask connection
- KYC verification simulation
- NFT access credential verification
- Multi-wallet support ready

### 2. Dashboard Access Levels

#### Public Access
- Property cost information
- Monthly rent amounts
- NFT distribution status
- General project information

#### NFT Holder Access (KYC Required)
- Detailed rental income breakdowns
- Monthly performance reports
- Cayman fund performance metrics
- Governance proposal participation
- Real-time occupancy data

### 3. Project Portfolio
- **8 Premium Properties** across major European markets
- **Total Portfolio Value**: €53+ million
- **25,000+ NFT Keys** across all projects
- **Average Success Rate**: 4.1%

### Featured Properties
1. **Vienna Luxury Apartments** - €12.5M (UNESCO Heritage)
2. **Berlin Tech Hub** - €3.5M (Startup District)
3. **Zurich Commercial Center** - €5.25M (Financial District)
4. **Munich Corporate Plaza** - €4.2M (Business District)
5. **Amsterdam Canal Residences** - €6.8M (Heritage Canal Ring)
6. **Frankfurt Skyline Towers** - €5.5M (Banking Quarter)
7. **Paris Business District** - €7.2M (La Défense)
8. **London Canary Wharf** - €8.9M (Financial Center)

## 🔐 Security & Compliance

### KYC Integration
- Secure identity verification
- Off-chain credential linking
- Transfer compliance enforcement
- Privacy-first approach

### Legal Compliance
- Cayman Islands regulatory framework
- Non-security NFT positioning
- Clear access credential boundaries
- Foundation-governed distributions

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with desktop optimization
- **Dark/Light Theme**: User preference with system detection
- **Real-time Updates**: Live property and performance data
- **Interactive Charts**: Performance visualization with Recharts
- **Notification System**: User feedback and status updates
- **Loading States**: Smooth user experience during data fetching

## 📊 Data Management

### Mock Data Structure
- Realistic European real estate projects
- Market performance metrics
- Rental income breakdowns
- Occupancy rates and trends
- Success rate calculations

### State Management
- React Context for global state
- Local storage for user preferences
- Real-time data simulation
- Error handling and recovery

## 🧪 Development

### Available Scripts

- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Run test suite
- `npm run lint` - ESLint code analysis
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Prettier code formatting

### Development Guidelines

1. **Component Structure**: Functional components with hooks
2. **State Management**: Use Context API for global state
3. **Styling**: Tailwind utility classes with consistent naming
4. **Accessibility**: WCAG 2.1 AA compliance
5. **Performance**: Code splitting and lazy loading

## 🌍 Deployment

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_ENVIRONMENT=production
REACT_APP_API_URL=https://api.coinestate.com
REACT_APP_CHAIN_ID=1
REACT_APP_CONTRACT_ADDRESS=0x...
```

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to hosting platform**
   - Vercel: `vercel --prod`
   - Netlify: `netlify deploy --prod --dir=build`
   - AWS S3: Upload build folder

## 📜 Legal Disclaimers

### Important Notice

**NFT Access Credentials**: CoinEstate NFTs serve as governance credentials only. They do not represent:
- Securities or investment contracts
- Equity shares or ownership interests
- Guaranteed returns or profits
- Legal rights to physical property

**Governance Participation**: All governance participation and rewards are:
- Voluntary and off-chain
- Administered under Cayman Islands law
- Subject to KYC verification
- Governed by CoinEstate Foundation

**Risk Disclosure**: Digital assets involve risk. Users should:
- Understand the technology and legal framework
- Consult with legal and financial advisors
- Only participate with funds they can afford to lose
- Comply with local regulations

## 🤝 Contributing

We welcome contributions to improve the platform. Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code of Conduct

- Follow existing code style and conventions
- Write clear, documented code
- Include tests for new features
- Respect legal and compliance requirements

## 📞 Support

- **Technical Support**: [GitHub Issues](https://github.com/finsterfurz/coinestate-nft-global/issues)
- **Legal Questions**: legal@coinestate.foundation
- **General Inquiries**: info@coinestate.foundation
- **KYC Support**: kyc@coinestate.foundation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Website](https://coinestate.foundation)
- [Documentation](https://docs.coinestate.foundation)
- [Legal Framework](https://legal.coinestate.foundation)
- [Foundation Information](https://foundation.coinestate.com)

---

**Disclaimer**: This platform is for demonstration purposes. Always consult with legal and financial professionals before making any investment decisions. CoinEstate NFTs are access credentials only and do not represent securities or investment opportunities.

*Built with ❤️ by the CoinEstate Foundation team*
