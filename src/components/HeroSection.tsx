import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';

const HeroSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Background image with theme-aware gradient fades */}
      <div className="absolute inset-0">
        <img
          src="/hero.png"
          alt="Neurolab EEG headset"
          className="h-full w-full object-cover dark:opacity-85 dark:brightness-95"
          style={{ objectPosition: '75% 25%' }}
        />
        {/* Left fade — covers text zone */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent w-full md:w-[55%]" />
        {/* Bottom edge fade */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/80 to-transparent" />
        {/* Top fade — for navbar legibility */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/80 to-transparent" />
      </div>

      {/* Content — split layout */}
      <div
        ref={ref}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-between px-6 md:px-12 lg:px-16"
      >
        {/* LEFT — Text */}
        <div className="max-w-xl pt-20">
          {/* Eyebrow */}
          <p
            className="mb-6 text-xs font-semibold uppercase tracking-[0.25em]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: `all 600ms ${easing}`,
              transitionDelay: '100ms',
            }}
          >
            Brain Monitoring System
          </p>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]"
            style={{
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
            className="mt-6 max-w-md text-base sm:text-lg leading-relaxed text-muted-foreground"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: `all 700ms ${easing}`,
              transitionDelay: '400ms',
            }}
          >
            We build clinical-grade brain-monitoring technology engineered to read and decode neural activity in real time with surgical precision.
          </p>

        </div>

        {/* RIGHT — CTA (Desktop) */}
        <div
          className="hidden md:flex flex-col items-end gap-3 pt-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: `all 700ms ${easing}`,
            transitionDelay: '600ms',
          }}
        >
        </div>
      </div>

      {/* BOTTOM CENTER — Scroll indicator */}
      <div
        className="absolute inset-x-0 bottom-12 z-10 flex flex-col items-center pointer-events-none"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity 1000ms ${easing}`,
          transitionDelay: '900ms',
        }}
      >
        <div className="relative h-0.5 w-44 overflow-hidden rounded-full bg-border">
          <div
            className="absolute inset-y-0 left-0 rounded-full w-1/3 bg-primary animate-[surgical-shimmer_2s_ease-in-out_infinite]"
          />
        </div>
        <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
          Scroll to explore
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
