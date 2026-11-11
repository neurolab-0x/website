import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';

/* ──────────────────────────────────────────────
   Animated counter hook — counts up on scroll
   ────────────────────────────────────────────── */
const useCounter = (end: number, duration = 1800, suffix = '') => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return { ref, display: `${value}${suffix}` };
};

/* ──────────────────────────────────────────────
   Live signal simulation (mini waveform)
   ────────────────────────────────────────────── */
const SignalWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 280;
    const h = 60;
    canvas.width = w * 2; // retina
    canvas.height = h * 2;
    ctx.scale(2, 2);

    let running = true;
    const draw = () => {
      if (!running) return;
      frameRef.current += 0.03;
      ctx.clearRect(0, 0, w, h);

      // Primary EEG waveform (electric blue hue)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(46, 144, 250, 0.7)';
      ctx.lineWidth = 1.2;
      for (let x = 0; x < w; x++) {
        const t = frameRef.current;
        const y =
          h / 2 +
          Math.sin(x * 0.04 + t) * 8 +
          Math.sin(x * 0.08 + t * 1.5) * 4 +
          Math.sin(x * 0.15 + t * 0.7) * 3 +
          (Math.random() - 0.5) * 1.5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second channel (alpha)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(46, 144, 250, 0.25)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x++) {
        const t = frameRef.current;
        const y =
          h / 2 +
          Math.sin(x * 0.025 + t * 0.8) * 12 +
          Math.sin(x * 0.06 + t * 1.2) * 5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      requestAnimationFrame(draw);
    };
    draw();
    return () => { running = false; };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '280px', height: '60px' }}
      className="opacity-100"
    />
  );
};

/* ──────────────────────────────────────────────
   Main Bento Section
   ────────────────────────────────────────────── */
const BentoGrid = () => {
  const { ref: headerRef, isVisible: headerVis } = useScrollReveal(0.2);
  const channels = useCounter(256, 2000);
  const latency = useCounter(50, 1500);
  const uptime = useCounter(99, 1800);

  return (
    <section id="technology" className="bg-background px-6 py-28 sm:py-32 scroll-m-24 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div
          ref={headerRef}
          className="mb-16 max-w-2xl"
          style={{
            opacity: headerVis ? 1 : 0,
            transform: headerVis ? 'translateY(0)' : 'translateY(16px)',
            transition: `all 700ms ${easing}`,
          }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            The Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Engineered at
            <br />
            Every Layer.
          </h2>
        </div>

        {/* ── ROW 1: Hero card (2 cols) + Stat column (1 col) ── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Hero card — live signal */}
          <HeroCard />

          {/* Stat stack */}
          <div className="flex flex-col gap-4">
            <StatCard
              label="Signal-to-Noise"
              value="94"
              suffix="dB"
              detail="Instrumentation amplifier with 120dB CMRR"
              index={1}
            />
            <StatCard
              label="Resolution"
              value="24"
              suffix="-bit"
              detail="True 24-bit ADC per channel, zero interpolation"
              index={2}
            />
          </div>
        </div>

        {/* ── ROW 2: Three metric cards ── */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            counterRef={channels.ref}
            display={channels.display}
            unit="Channels"
            description="High-density radial electrode array with 4× frontal cortex density."
            index={0}
          />
          <MetricCard
            counterRef={latency.ref}
            display={latency.display}
            unit="ms Latency"
            description="End-to-end signal processing from scalp to application layer."
            index={1}
          />
          <MetricCard
            counterRef={uptime.ref}
            display={`${uptime.display}.97%`}
            unit="Uptime"
            description="Medical-grade reliability with redundant fail-safes and hot-swap modules."
            index={2}
          />
        </div>

        {/* ── ROW 3: Dark feature card (full width) ── */}
        <DarkFeatureCard />
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────
   Hero Card — spans 2 columns, live waveform
   ────────────────────────────────────────────── */
const HeroCard = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-3xl p-8 md:col-span-2 bg-card border border-border/70 text-card-foreground shadow-sm transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 700ms ${easing}`,
      }}
    >
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-sm">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Real-Time Signal Processing
          </p>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
            Neural data pipeline,
            <br />
            from scalp to cloud.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            256 channels × 24-bit resolution × 500Hz sampling. Continuous streaming with zero data loss.
          </p>
        </div>

        {/* Live waveform */}
        <div className="flex flex-col items-end gap-2">
          <SignalWave />
          <div className="flex items-center gap-3 text-[10px] tabular-nums tracking-wide text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
            <span>CH 01–256</span>
            <span>500Hz</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Small stat cards — stacked on the right
   ────────────────────────────────────────────── */
const StatCard = ({
  label,
  value,
  suffix,
  detail,
  index,
}: {
  label: string;
  value: string;
  suffix: string;
  detail: string;
  index: number;
}) => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className="flex flex-1 flex-col justify-between rounded-3xl p-6 bg-card border border-border/70 text-card-foreground shadow-sm transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: `all 600ms ${easing}`,
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-3">
        <span className="text-3xl font-bold tabular-nums text-foreground tracking-tight">
          {value}
        </span>
        <span className="ml-1 text-sm text-muted-foreground">{suffix}</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{detail}</p>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Metric cards — row of 3, animated counters
   ────────────────────────────────────────────── */
const MetricCard = ({
  counterRef,
  display,
  unit,
  description,
  index,
}: {
  counterRef: React.RefObject<HTMLSpanElement>;
  display: string;
  unit: string;
  description: string;
  index: number;
}) => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className="rounded-3xl p-8 bg-card border border-border/70 text-card-foreground shadow-sm transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: `all 600ms ${easing}`,
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="mb-4 flex items-baseline gap-2">
        <span
          ref={counterRef}
          className="text-4xl font-bold tabular-nums text-foreground tracking-tight"
        >
          {display}
        </span>
        <span className="text-xs font-semibold text-muted-foreground">{unit}</span>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Dark feature card — full width, bottom
   ────────────────────────────────────────────── */
const DarkFeatureCard = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      id="safety"
      ref={ref}
      className="mt-4 overflow-hidden rounded-3xl scroll-m-24 bg-slate-950 dark:bg-card border border-slate-800 dark:border-border text-white p-8 md:p-12 shadow-md transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 800ms ${easing}`,
        transitionDelay: '200ms',
      }}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left — heading */}
        <div className="md:col-span-1">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
            Clinical Integrity
          </p>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
            Built to medical
            <br />
            device standards.
          </h3>
        </div>

        {/* Right — certification grid */}
        <div className="grid grid-cols-2 gap-6 md:col-span-2">
          {[
            { code: 'IEC 60601-1', desc: 'Medical electrical equipment safety' },
            { code: 'ISO 10993', desc: 'Biocompatibility evaluation' },
            { code: 'IEC 62304', desc: 'Medical software lifecycle' },
            { code: 'HIPAA', desc: 'Protected health information compliance' },
          ].map((cert) => (
            <div key={cert.code} className="flex flex-col gap-1">
              <span className="text-sm font-semibold tabular-nums text-slate-100 tracking-tight">
                {cert.code}
              </span>
              <span className="text-xs text-slate-400">
                {cert.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
