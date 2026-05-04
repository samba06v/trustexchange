import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import HowItWorks from './components/HowItWorks';
import FeaturesSection from './components/FeaturesSection';
import TechStack from './components/TechStack';
import SmartContractSection from './components/SmartContractSection';
import LiveTradeDemo from './components/LiveTradeDemo';
import DisputeSection from './components/DisputeSection';
import MarketSection from './components/MarketSection';
import BusinessModel from './components/BusinessModel';
import RoadmapSection from './components/RoadmapSection';
import TeamSection from './components/TeamSection';
import SecuritySection from './components/SecuritySection';
import Footer from './components/Footer';
import WalletModal from './components/WalletModal';
import NetworkBackground from './components/NetworkBackground';
import SectionProgress from './components/SectionProgress';
import { useWalletStore } from './store/walletStore';

function App() {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { isConnected } = useWalletStore();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 text-white overflow-hidden">
      <NetworkBackground />
      <Toaster position="top-right" />
      <SectionProgress />
      
      <Navbar onConnectWallet={() => setShowWalletModal(true)} />
      
      <main>
        <HeroSection onGetStarted={() => setShowWalletModal(true)} />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <FeaturesSection />
        <TechStack />
        <SmartContractSection />
        <LiveTradeDemo />
        <DisputeSection />
        <MarketSection />
        <BusinessModel />
        <SecuritySection />
        <RoadmapSection />
        <TeamSection />
      </main>
      
      <Footer />
      
      {showWalletModal && (
        <WalletModal onClose={() => setShowWalletModal(false)} />
      )}
    </div>
  );
}

export default App;
