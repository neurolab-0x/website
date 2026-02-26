import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import BentoGrid from '@/components/SpecGrid';
import InfiniteDirectory from '@/components/InfiniteDirectory';
import ConversionTerminal from '@/components/ConversionTerminal';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* SECTION 1: The Surgical Hero */}
        <HeroSection />

        {/* SECTION 2: The Linear-System Bento Grid */}
        <BentoGrid />

        {/* SECTION 3: The Neuralink Infinite Directory */}
        <InfiniteDirectory />

        {/* SECTION 4: The Conversion Terminal */}
        <div className="pb-32">
          <ConversionTerminal />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
