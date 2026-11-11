import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import BentoGrid from '@/components/SpecGrid';
import InfiniteDirectory from '@/components/InfiniteDirectory';
import ConversionTerminal from '@/components/ConversionTerminal';
import PartnersSection from '@/components/PartnersSection';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <SEO
        title="Clinical-Grade Neural Interfaces"
        description="Neurolab builds clinical-grade neural interfaces engineered for precision, safety, and the next era of human-computer interaction."
      />
      <Navbar />
      <main>
        {/* SECTION 1: The Surgical Hero */}
        <HeroSection />

        {/* SECTION 1.5: Our Partners */}
        <PartnersSection />

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
