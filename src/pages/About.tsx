import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Crosshair, ShieldCheck, Eye } from 'lucide-react';

const values = [
  { icon: Crosshair, title: 'Precision', desc: 'Micro-detection accuracy: every millivolt and measurement matters.' },
  { icon: ShieldCheck, title: 'Safety', desc: 'FDA-pathway compliance, redundant fail-safes, and continuous monitoring built into every device.' },
  { icon: Eye, title: 'Openness', desc: 'Open data formats, published research, and transparent methodology. Science advances through collaboration.' },
];

const leaders = [
  { name: 'Asimwe Landry C. E.', role: 'Chief Executive Officer', field: 'Computational Neuroscience' },
  { name: 'Aine Dushimire', role: 'Chief Operation Officer', field: 'Neural Engineering' },
  { name: 'Prosper Mugisha', role: 'Chief Technology Officer', field: 'Clinical Neurophysiology' },
  { name: 'Esther Hope Uhirwe', role: 'VP of Hardware Systems', field: 'Embedded Systems' },
  { name: 'Winny Darlene', role: 'VP of Software & Decoders', field: 'Neural Algorithms' },
];

const About = () => {
  const { ref: heroRef, isVisible: heroVis } = useScrollReveal(0.2);
  const { ref: missionRef, isVisible: missionVis } = useScrollReveal(0.2);
  const { ref: valuesRef, isVisible: valuesVis } = useScrollReveal(0.2);
  const { ref: teamRef, isVisible: teamVis } = useScrollReveal(0.2);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Us"
        description="Learn about NeuroLab's mission to empower specialists with AI-driven neuro-diagnostics and telemetry platforms."
        canonical="/about"
      />
      <Navbar />
      <main className="pt-12">
        {/* Full-viewport editorial hero */}
        <section className="relative flex min-h-screen items-center overflow-hidden px-6">
          <div
            ref={heroRef}
            className="mx-auto grid max-w-6xl grid-cols-1 gap-12 transition-all duration-[600ms] lg:grid-cols-2"
            style={{
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'var(--ease-apple)',
            }}
          >
            {/* Left: Clinical imagery placeholder */}
            <div
              className="aspect-[4/5] w-full rounded-3xl bg-card"
              style={{ boxShadow: 'inset 0 2px 20px 0 hsl(var(--foreground) / 0.06), 0 0 0 0.5px hsl(var(--surface-border))' }}
            />
            {/* Right: Dense typography */}
            <div className="flex flex-col justify-center gap-6">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">About Neurolab</p>
              <h1 className="text-4xl font-bold tracking-display text-foreground sm:text-5xl lg:text-6xl">
                Merging Human
                <br />
                and Digital
                <br />
                Intelligence
              </h1>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                Neurolab was founded on a singular premise: that the interface between human cognition and digital systems should be indistinguishable from thought itself.
              </p>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                Our team of neuroscientists, hardware engineers, and clinical researchers operates at the intersection of medical precision and computational scale — building devices that meet the highest standards of safety, reliability, and performance.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-secondary px-6 py-32">
          <div
            ref={missionRef}
            className="mx-auto max-w-3xl text-center transition-all duration-[600ms]"
            style={{
              opacity: missionVis ? 1 : 0,
              transform: missionVis ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'var(--ease-apple)',
            }}
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">Our Mission</p>
            <h2 className="mb-6 text-3xl font-bold tracking-display text-foreground sm:text-4xl">
              Restoring Autonomy Through Precision
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              To advance the safety, precision, and accessibility of brain-computer interfaces — enabling clinicians and researchers to decode neural activity with unprecedented fidelity, and ultimately restore autonomy to those who need it most.
            </p>
          </div>
        </section>

        {/* Values / Pillars */}
        <section className="px-6 py-32">
          <div
            ref={valuesRef}
            className="mx-auto max-w-5xl transition-all duration-[600ms]"
            style={{
              opacity: valuesVis ? 1 : 0,
              transform: valuesVis ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'var(--ease-apple)',
            }}
          >
            <div className="mb-12 text-center">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">Our Principles</p>
              <h2 className="text-3xl font-bold tracking-display text-foreground">What Guides Us</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-3xl bg-card border border-border/70 p-8 shadow-sm"
                >
                  <v.icon size={24} strokeWidth={1.5} className="mb-6 text-primary" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="bg-secondary/40 border-t border-border/50 px-6 py-32">
          <div
            ref={teamRef}
            className="mx-auto max-w-5xl transition-all duration-[600ms]"
            style={{
              opacity: teamVis ? 1 : 0,
              transform: teamVis ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'var(--ease-apple)',
            }}
          >
            <div className="mb-12 text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">Leadership</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">The Team</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {leaders.map((l) => (
                <div
                  key={l.name}
                  className="rounded-3xl bg-card border border-border/70 p-8 shadow-sm"
                >
                  <div className="mb-6 aspect-square w-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                    {l.name.slice(0, 2).toUpperCase()}
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{l.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{l.role}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{l.field}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
