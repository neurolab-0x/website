import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroHalo from '@/components/HeroHalo';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface CommissionConfig {
  edition: 'clinical' | 'enterprise' | null;
  channels: 128 | 256 | 512 | null;
  storage: 'local-only' | 'cloud-sync' | null;
}

const editions = [
  { id: 'clinical' as const, title: 'Clinical Edition', desc: 'FDA-pathway compliant. Designed for clinical environments with certified safety protocols.' },
  { id: 'enterprise' as const, title: 'Enterprise Edition', desc: 'Full-scale deployment for institutions. High-throughput data and multi-user access.' },
];

const sensorOptions = [
  { value: 128 as const, label: '128 Channels', desc: 'Standard density. Ideal for targeted cortical mapping.' },
  { value: 256 as const, label: '256 Channels', desc: 'High density. Full-hemisphere coverage with sub-millimeter precision.' },
  { value: 512 as const, label: '512 Channels', desc: 'Ultra density. Whole-brain capture for advanced research protocols.' },
];

const storageOptions = [
  { id: 'local-only' as const, title: 'Local-Only', desc: 'Air-gapped operation. All processing and storage remains on-premises.' },
  { id: 'cloud-sync' as const, title: 'Cloud-Sync', desc: 'Real-time data streaming to Neurolab Cloud with automated analysis pipelines.' },
];

const steps = ['Edition', 'Sensors', 'Storage'] as const;

const Shop = () => {
  const [phase, setPhase] = useState(1);
  const [config, setConfig] = useState<CommissionConfig>({
    edition: null,
    channels: null,
    storage: null,
  });
  const [showForm, setShowForm] = useState(false);

  const canAdvance =
    (phase === 1 && config.edition) ||
    (phase === 2 && config.channels) ||
    (phase === 3 && config.storage);

  // Directive F: All 3 keys must be non-null before commissioning
  const isConfigComplete = config.edition !== null && config.channels !== null && config.storage !== null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-12">
        <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">
          {/* LEFT — Product Hero + Halo */}
          <div className="relative flex items-center justify-center px-6 py-32 lg:sticky lg:top-0 lg:h-screen">
            <HeroHalo />
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div
                className="aspect-[4/3] w-full max-w-lg rounded-3xl bg-card"
                style={{ boxShadow: 'inset 0 2px 20px 0 hsl(var(--foreground) / 0.06), 0 0 0 0.5px hsl(var(--surface-border))' }}
              />
              <h1 className="text-4xl font-bold tracking-display text-foreground sm:text-5xl">
                Neurolab Nexus
              </h1>
              <p className="text-sm text-muted-foreground tabular-nums">Commission Your Device</p>
            </div>
          </div>

          {/* RIGHT — Multi-step Configurator */}
          <div className="flex flex-col justify-center px-6 py-32 lg:px-16">
            {/* Step indicator */}
            <div className="mb-12 flex items-center gap-6">
              {steps.map((label, i) => {
                const stepNum = i + 1;
                const isActive = stepNum === phase;
                const isComplete = stepNum < phase;
                return (
                  <div key={label} className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all duration-500"
                      style={{
                        background: isActive || isComplete ? 'hsl(var(--foreground))' : 'hsl(var(--secondary))',
                        color: isActive || isComplete ? 'hsl(var(--background))' : 'hsl(var(--muted-foreground))',
                        border: '0.5px solid hsl(var(--surface-border))',
                        transitionTimingFunction: 'var(--ease-apple)',
                      }}
                    >
                      {stepNum}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{label}</span>
                  </div>
                );
              })}
            </div>

            {/* Phase 1: Edition */}
            {phase === 1 && (
              <div className="space-y-4">
                <h2 className="mb-6 text-xl font-semibold text-foreground">Select Edition</h2>
                {editions.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setConfig({ ...config, edition: e.id })}
                    className="w-full rounded-3xl p-6 text-left transition-all duration-500 active:scale-[0.98]"
                    style={{
                      border: config.edition === e.id ? '1px solid hsl(var(--foreground))' : '0.5px solid hsl(var(--surface-border))',
                      background: config.edition === e.id ? 'hsl(var(--secondary))' : 'hsl(var(--card))',
                      transitionTimingFunction: 'var(--ease-apple)',
                    }}
                  >
                    <span className="text-base font-semibold text-foreground">{e.title}</span>
                    <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Phase 2: Sensors */}
            {phase === 2 && (
              <div className="space-y-4">
                <h2 className="mb-6 text-xl font-semibold text-foreground">Sensor Density</h2>
                {sensorOptions.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setConfig({ ...config, channels: d.value })}
                    className="w-full rounded-3xl p-6 text-left transition-all duration-500 active:scale-[0.98]"
                    style={{
                      border: config.channels === d.value ? '1px solid hsl(var(--foreground))' : '0.5px solid hsl(var(--surface-border))',
                      background: config.channels === d.value ? 'hsl(var(--secondary))' : 'hsl(var(--card))',
                      transitionTimingFunction: 'var(--ease-apple)',
                    }}
                  >
                    <span className="text-base font-semibold tabular-nums text-foreground">{d.label}</span>
                    <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Phase 3: Storage */}
            {phase === 3 && !showForm && (
              <div className="space-y-4">
                <h2 className="mb-6 text-xl font-semibold text-foreground">Storage Configuration</h2>
                {storageOptions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setConfig({ ...config, storage: s.id })}
                    className="w-full rounded-3xl p-6 text-left transition-all duration-500 active:scale-[0.98]"
                    style={{
                      border: config.storage === s.id ? '1px solid hsl(var(--foreground))' : '0.5px solid hsl(var(--surface-border))',
                      background: config.storage === s.id ? 'hsl(var(--secondary))' : 'hsl(var(--card))',
                      transitionTimingFunction: 'var(--ease-apple)',
                    }}
                  >
                    <span className="text-base font-semibold text-foreground">{s.title}</span>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Commission Form */}
            {showForm && (
              <div>
                <h2 className="mb-6 text-xl font-semibold text-foreground">Request Commission</h2>
                <div className="rounded-3xl bg-card p-8" style={{ border: '0.5px solid hsl(var(--surface-border))' }}>
                  <div className="mb-6 rounded-2xl bg-secondary p-4 text-sm text-muted-foreground" style={{ border: '0.5px solid hsl(var(--surface-border))' }}>
                    <p><span className="font-medium text-foreground">Edition:</span> {config.edition === 'clinical' ? 'Clinical' : 'Enterprise'}</p>
                    <p><span className="font-medium text-foreground">Channels:</span> <span className="tabular-nums">{config.channels}</span></p>
                    <p><span className="font-medium text-foreground">Storage:</span> {config.storage === 'local-only' ? 'Local-Only' : 'Cloud-Sync'}</p>
                  </div>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Full Name" className="w-full rounded-2xl bg-secondary px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground" style={{ border: '0.5px solid hsl(var(--surface-border))' }} />
                    <input type="email" placeholder="Institutional Email" className="w-full rounded-2xl bg-secondary px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground" style={{ border: '0.5px solid hsl(var(--surface-border))' }} />
                    <textarea placeholder="Additional Requirements" rows={3} className="w-full resize-none rounded-2xl bg-secondary px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground" style={{ border: '0.5px solid hsl(var(--surface-border))' }} />
                    <button
                      type="submit"
                      className="inline-flex h-11 w-full items-center justify-center rounded-2xl text-sm font-medium text-white transition-transform duration-500 hover:-translate-y-0.5 active:scale-[0.98]"
                      style={{ background: '#0060E9', transitionTimingFunction: 'var(--ease-apple)' }}
                    >
                      Request Commission
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Navigation controls */}
            {!showForm && (
              <div className="mt-12 flex items-center gap-4">
                {phase > 1 && (
                  <button
                    onClick={() => setPhase(phase - 1)}
                    className="inline-flex h-11 items-center gap-2 rounded-2xl px-6 text-sm font-medium text-foreground transition-all duration-500 hover:-translate-y-0.5 active:scale-[0.98]"
                    style={{ border: '0.5px solid hsl(var(--surface-border))', transitionTimingFunction: 'var(--ease-apple)' }}
                  >
                    <ArrowLeft size={16} strokeWidth={1.5} /> Back
                  </button>
                )}
                <button
                  onClick={() => {
                    if (phase < 3) setPhase(phase + 1);
                    else if (isConfigComplete) setShowForm(true);
                  }}
                  disabled={phase < 3 ? !canAdvance : !isConfigComplete}
                  className="inline-flex h-11 items-center gap-2 rounded-2xl px-8 text-sm font-medium text-white transition-all duration-500 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:hover:translate-y-0"
                  style={{ background: '#0060E9', transitionTimingFunction: 'var(--ease-apple)' }}
                >
                  {phase < 3 ? 'Continue' : 'Request Commission'} <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
