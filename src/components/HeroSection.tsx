import { useScrollReveal } from '@/hooks/useScrollReveal';

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';

const HeroSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero.png"
          alt="Neurolab EEG headset"
          className="h-full w-full object-cover"
          style={{ objectPosition: '75% 25%' }}
        />
        {/* Left fade — narrow, only covers text zone */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" style={{ width: '45%' }} />
        {/* Bottom edge fade — very subtle, only bottom 80px */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
        {/* Top fade — for navbar legibility */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/60 to-transparent" />
      </div>

      {/* Content — split layout */}
      <div
        ref={ref}
        className="relative bottom-0 z-10 mx-auto flex min-h-screen max-w-full items-center mt-4 justify-between px-16 md:px-24"
      >
        {/* LEFT — Text */}
        <div className="max-w-lg -left-2" style={{ paddingTop: '48px' }}>
          {/* Eyebrow */}
          <p
            className="mb-6 text-xs font-medium uppercase tracking-[0.25em]"
            style={{
              color: '#0F172A',
              opacity: isVisible ? 0.5 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: `all 600ms ${easing}`,
              transitionDelay: '100ms',
            }}
          >
            Brain Monitoring System
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: sfPro,
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              fontWeight: 600,
              letterSpacing: '-0.06em',
              lineHeight: 1.0,
              color: '#0F172A',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: `all 800ms ${easing}`,
              transitionDelay: '200ms',
            }}
          >
            The Neural
            <br />
            Standard.
          </h1>

          {/* Subline */}
          <p
            className="mt-6 max-w-lg text-xl leading-relaxed"
            style={{
              color: '#334155',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: `all 700ms ${easing}`,
              transitionDelay: '400ms',
            }}
          >
            See and understand your brain activity in real time.
          </p>
        </div>

        {/* RIGHT — CTA */}
        <div
          className="hidden flex items-end gap-2 md:flex"
          style={{
            paddingTop: '48px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: `all 700ms ${easing}`,
            transitionDelay: '600ms',
          }}
        >
          <a
            href="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-full px-8 text-sm font-medium text-white transition-all duration-500 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              background: '#0F172A',
              transitionTimingFunction: easing,
            }}
          >
            Secure Access
          </a>
          <a
            href="#technology"
            className="inline-flex h-12 items-center gap-2 rounded-full px-8 text-sm font-medium border border-slate-500 text-slate-500 transition-opacity duration-300 hover:opacity-70"
          >
            Join Waitlist →
            
          </a>
        </div>
      </div>

      {/* BOTTOM CENTER — Scroll indicator */}
      <div
        className="absolute inset-x-0 bottom-24 z-10 flex flex-col items-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity 1000ms ${easing}`,
          transitionDelay: '900ms',
        }}
      >
        <div className="relative h-px w-48 overflow-hidden rounded-full bg-slate-200">
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: '40%',
              background: 'linear-gradient(90deg, transparent, #0F172A, transparent)',
              animation: 'surgical-shimmer 2s ease-in-out infinite',
            }}
          />
        </div>
        <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-slate-800">
          Scroll to explore
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
