import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import HeroHalo from '@/components/HeroHalo';
import { Sparkles, Check, ArrowRight, ShieldCheck, Database, HardDrive, Cpu, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductConfig } from '@/lib/content';

interface CommissionConfig {
  edition: string | null;
  channels: number | null;
  storage: string | null;
}

const productData = getProductConfig();

const editionIcons: Record<string, typeof ShieldCheck> = {
  clinical: ShieldCheck,
  enterprise: Layers,
};

const editions = (productData.editions || []).map((e) => ({
  ...e,
  icon: editionIcons[e.id] || ShieldCheck,
}));

const sensorOptions = (productData.sensors || []).map((s) => ({
  ...s,
  icon: Cpu,
}));

const storageIcons: Record<string, typeof HardDrive> = {
  'local-only': HardDrive,
  'cloud-sync': Database,
};

const storageOptions = (productData.storage || []).map((st) => ({
  ...st,
  icon: storageIcons[st.id] || HardDrive,
}));

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
};

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const Shop = () => {
  const [config, setConfig] = useState<CommissionConfig>({
    edition: null,
    channels: null,
    storage: null,
  });
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate total price dynamically
  const basePrice = config.edition ? editions.find(e => e.id === config.edition)?.price || 0 : 0;
  const channelPrice = config.channels ? sensorOptions.find(o => o.value === config.channels)?.priceOffset || 0 : 0;
  const storagePrice = config.storage ? storageOptions.find(o => o.id === config.storage)?.priceOffset || 0 : 0;
  const totalPrice = basePrice + channelPrice + storagePrice;

  const isConfigComplete = config.edition !== null && config.channels !== null && config.storage !== null;

  // Auto-scroll when new section is unlocked
  useEffect(() => {
    if (config.edition && !config.channels) {
      document.getElementById('section-channels')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (config.channels && !config.storage) {
      document.getElementById('section-storage')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (isConfigComplete && !showForm) {
      document.getElementById('section-summary')?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [config.edition, config.channels, config.storage, isConfigComplete, showForm]);


  return (
    <div className="min-h-screen bg-background text-foreground" style={{ WebkitFontSmoothing: 'antialiased' }}>
      <SEO
        title="Shop Nexus Series"
        description="Configure and commission your Nexus Series neural interface. Select edition, sensor density, and storage options."
        canonical="/shop"
      />
      <Navbar />
      <main className="pt-12 relative">
        <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2 relative pb-32">

          {/* LEFT — Product Hero + Halo (Sticky) */}
          <div className="relative flex items-center justify-center px-6 py-20 lg:py-32 lg:sticky lg:top-0 lg:h-screen pointer-events-none lg:pointer-events-auto">
            <HeroHalo />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: easing }}
              className="relative z-10 flex flex-col items-center gap-6 w-full"
            >
              <div
                className="relative aspect-[4/3] w-full max-w-lg rounded-3xl bg-secondary overflow-hidden transition-all duration-700"
                style={{
                  boxShadow: config.channels ? 'inset 0 2px 20px 0 hsl(var(--primary) / 0.1), 0 0 0 0.5px hsl(var(--primary) / 0.3), 0 20px 40px -20px hsl(var(--primary) / 0.15)' : 'inset 0 2px 20px 0 hsl(var(--foreground) / 0.04), 0 0 0 0.5px hsl(var(--surface-border))',
                }}
              >
                {/* Mock Product Visuals based on config */}
                <div className="absolute inset-0 bg-gradient-to-br from-card to-background opacity-50" />

                {config.channels && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center p-8"
                  >
                    <div className="relative w-full h-full border border-primary/20 rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]">
                      <div className="absolute w-3/4 h-3/4 border border-primary/30 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                      <div className="absolute w-1/2 h-1/2 border border-primary/40 rounded-full animate-[spin_20s_linear_infinite]" />
                      <Sparkles className="text-primary/40 h-12 w-12" />
                    </div>
                  </motion.div>
                )}

                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">N1 Implant</p>
                    <p className="text-lg font-semibold tracking-tight">Nexus Series</p>
                  </div>
                  {isConfigComplete && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Calibrated</p>
                      <div className="flex items-center gap-1 text-primary">
                        <Check size={14} />
                        <span className="text-sm font-medium">Ready</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-3" style={{ letterSpacing: '-0.04em' }}>
                  Configure Nexus.
                </h1>
                <p className="text-base text-muted-foreground">Select your precision tier.</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Unrolling Configurator */}
          <div ref={containerRef} className="flex flex-col px-6 py-12 lg:py-32 lg:px-16 w-full max-w-xl mx-auto z-10 space-y-16">

            {/* Step 1: Edition */}
            <section id="section-edition" className="space-y-6 scroll-m-32">
              <div className="flex items-end justify-between border-b border-border/50 pb-4">
                <h2 className="text-2xl font-bold tracking-tight">1. Edition</h2>
                {config.edition && <span className="text-sm font-medium text-foreground">{formatPrice(basePrice)}</span>}
              </div>
              <div className="grid gap-4">
                {editions.map((e) => {
                  const isSelected = config.edition === e.id;
                  return (
                    <motion.button
                      key={e.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setConfig({ ...config, edition: e.id });
                        if (isConfigComplete) setShowForm(false);
                      }}
                      className="group relative w-full overflow-hidden rounded-2xl p-6 text-left transition-all duration-300"
                      style={{
                        background: isSelected ? 'hsl(var(--card))' : 'hsl(var(--secondary) / 0.5)',
                        border: isSelected ? '0.5px solid hsl(var(--primary))' : '0.5px solid hsl(var(--surface-border))',
                        boxShadow: isSelected ? '0 4px 16px -4px hsl(var(--primary) / 0.08)' : 'none',
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                            <e.icon size={20} />
                          </div>
                          <div>
                            <span className={`text-lg font-semibold tracking-tight block ${isSelected ? 'text-primary' : 'text-foreground'}`}>{e.title}</span>
                            <span className="text-sm font-medium text-muted-foreground">{formatPrice(e.price)} base</span>
                          </div>
                        </div>
                        {isSelected && (
                          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                            <Check size={14} strokeWidth={2.5} />
                          </motion.div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* Step 2: Sensors (Unrolls when Edition is selected) */}
            <AnimatePresence>
              {config.edition && (
                <motion.section
                  id="section-channels"
                  initial={{ opacity: 0, height: 0, y: 20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  transition={{ duration: 0.6, ease: easing }}
                  className="space-y-6 scroll-m-32 overflow-hidden"
                >
                  <div className="flex items-end justify-between border-b border-border/50 pb-4">
                    <h2 className="text-2xl font-bold tracking-tight">2. Sensor Density</h2>
                    {config.channels && <span className="text-sm font-medium text-foreground">{channelPrice > 0 ? `+${formatPrice(channelPrice)}` : 'Included'}</span>}
                  </div>
                  <div className="grid gap-4">
                    {sensorOptions.map((d) => {
                      const isSelected = config.channels === d.value;
                      return (
                        <motion.button
                          key={d.value}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => {
                            setConfig({ ...config, channels: d.value });
                            if (isConfigComplete) setShowForm(false);
                          }}
                          className="group relative w-full overflow-hidden rounded-2xl p-6 text-left transition-all duration-300"
                          style={{
                            background: isSelected ? 'hsl(var(--card))' : 'hsl(var(--secondary) / 0.5)',
                            border: isSelected ? '0.5px solid hsl(var(--primary))' : '0.5px solid hsl(var(--surface-border))',
                            boxShadow: isSelected ? '0 4px 16px -4px hsl(var(--primary) / 0.08)' : 'none',
                          }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                <d.icon size={20} />
                              </div>
                              <div>
                                <span className={`text-lg font-semibold tracking-tight block ${isSelected ? 'text-primary' : 'text-foreground'}`}>{d.label}</span>
                                <span className="text-sm font-medium text-muted-foreground">{d.priceOffset > 0 ? `+ ${formatPrice(d.priceOffset)}` : 'Included'}</span>
                              </div>
                            </div>
                            {isSelected && (
                              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                <Check size={14} strokeWidth={2.5} />
                              </motion.div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Step 3: Storage (Unrolls when Channels are selected) */}
            <AnimatePresence>
              {config.channels && (
                <motion.section
                  id="section-storage"
                  initial={{ opacity: 0, height: 0, y: 20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  transition={{ duration: 0.6, ease: easing }}
                  className="space-y-6 scroll-m-32 overflow-hidden pb-12"
                >
                  <div className="flex items-end justify-between border-b border-border/50 pb-4">
                    <h2 className="text-2xl font-bold tracking-tight">3. Storage & Analytics</h2>
                    {config.storage && <span className="text-sm font-medium text-foreground">{storagePrice > 0 ? `+${formatPrice(storagePrice)}` : 'Included'}</span>}
                  </div>
                  <div className="grid gap-4">
                    {storageOptions.map((s) => {
                      const isSelected = config.storage === s.id;
                      return (
                        <motion.button
                          key={s.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => {
                            setConfig({ ...config, storage: s.id });
                            if (isConfigComplete) setShowForm(false);
                          }}
                          className="group relative w-full overflow-hidden rounded-2xl p-6 text-left transition-all duration-300"
                          style={{
                            background: isSelected ? 'hsl(var(--card))' : 'hsl(var(--secondary) / 0.5)',
                            border: isSelected ? '0.5px solid hsl(var(--primary))' : '0.5px solid hsl(var(--surface-border))',
                            boxShadow: isSelected ? '0 4px 16px -4px hsl(var(--primary) / 0.08)' : 'none',
                          }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                <s.icon size={20} />
                              </div>
                              <div>
                                <span className={`text-lg font-semibold tracking-tight block ${isSelected ? 'text-primary' : 'text-foreground'}`}>{s.title}</span>
                                <span className="text-sm font-medium text-muted-foreground">{s.priceOffset > 0 ? `+ ${formatPrice(s.priceOffset)} / yr` : 'Included'}</span>
                              </div>
                            </div>
                            {isSelected && (
                              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                <Check size={14} strokeWidth={2.5} />
                              </motion.div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Request Commission Details Form */}
            <AnimatePresence>
              {isConfigComplete && showForm && (
                <motion.section
                  initial={{ opacity: 0, height: 0, y: 20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: easing }}
                  className="space-y-6 pt-8 border-t border-border/50 overflow-hidden"
                >
                  <h2 className="text-2xl font-bold tracking-tight">Contact Information</h2>
                  <p className="text-sm text-muted-foreground">Our deployment team will reach out to finalize compliance checks and installation dates.</p>

                  <form className="space-y-5 mt-6" onSubmit={(e) => { e.preventDefault(); alert("Mock commission requested! Continuing development.") }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block ml-1">First Name</label>
                        <input type="text" className="w-full rounded-xl bg-secondary/50 border border-border/50 px-4 py-3.5 text-sm outline-none transition-colors focus:border-primary/50 focus:bg-card" required />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block ml-1">Last Name</label>
                        <input type="text" className="w-full rounded-xl bg-secondary/50 border border-border/50 px-4 py-3.5 text-sm outline-none transition-colors focus:border-primary/50 focus:bg-card" required />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block ml-1">Institutional Email</label>
                      <input type="email" placeholder="name@university.edu or name@hospital.org" className="w-full rounded-xl bg-secondary/50 border border-border/50 px-4 py-3.5 text-sm outline-none transition-colors focus:border-primary/50 focus:bg-card" required />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block ml-1">Additional Requirements</label>
                      <textarea rows={3} className="w-full resize-none rounded-xl bg-secondary/50 border border-border/50 px-4 py-3.5 text-sm outline-none transition-colors focus:border-primary/50 focus:bg-card" />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-foreground text-background font-medium py-4 text-sm mt-4 hover:bg-foreground/90 transition-colors shadow-lg active:scale-[0.98]"
                    >
                      Submit Commission Request
                    </button>
                  </form>
                </motion.section>
              )}
            </AnimatePresence>

          </div>
        </div>
      </main>

      {/* Sticky Bottom Action Bar (Apple Style) */}
      <AnimatePresence>
        {config.edition && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/80 px-6 py-4 backdrop-blur-xl"
            style={{ boxShadow: '0 -10px 40px -20px hsl(var(--foreground) / 0.1)' }}
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground hidden sm:block mb-0.5">Configuration Total</span>
                <span className="text-xl font-bold tracking-tight text-foreground">{formatPrice(totalPrice)}</span>
              </div>

              <button
                onClick={() => {
                  if (isConfigComplete && !showForm) {
                    setShowForm(true);
                    setTimeout(() => {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }, 100);
                  } else {
                    // Find the next missing step and scroll to it
                    if (!config.edition) document.getElementById('section-edition')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    else if (!config.channels) document.getElementById('section-channels')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    else if (!config.storage) document.getElementById('section-storage')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className={`inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium transition-all ${isConfigComplete && !showForm ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 active:scale-95' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}
              >
                {isConfigComplete ? (showForm ? 'Complete Form Above' : 'Review Commission') : 'Continue Setup'}
                {!showForm && <ArrowRight size={16} strokeWidth={2} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
