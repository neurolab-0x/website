import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Minus, Plus, ArrowUpRight } from 'lucide-react';
import { getDepartments, type Department } from '@/lib/content';

/* ──────────────────────────────────────────────
   Department Accordion — Neuralink line-based
   No containers. Horizontal rules only.
   ────────────────────────────────────────────── */

const DepartmentBlock = ({ dept }: { dept: Department }) => {
  const [expanded, setExpanded] = useState(false);
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className="transition-all duration-[600ms]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
      }}
    >
      {/* Department header — top border line */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between py-10 text-left transition-colors duration-300 hover:opacity-80 border-t border-border/70"
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {dept.name}
        </h3>
        {expanded ? (
          <Minus size={20} strokeWidth={1.5} className="shrink-0 text-foreground" />
        ) : (
          <Plus size={20} strokeWidth={1.5} className="shrink-0 text-foreground" />
        )}
      </button>

      {/* Expandable roles */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: expanded ? `${dept.roles.length * 100 + 40}px` : '0',
          opacity: expanded ? 1 : 0,
          transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        }}
      >
        <div className="pb-6">
          {dept.roles.map((role) => (
            <Link
              key={role.slug}
              to={`/careers/${role.slug}`}
              className="flex items-center justify-between py-5 transition-opacity duration-300 hover:opacity-60"
              style={{ borderTop: '0.5px solid hsl(213 27% 90%)' }}
            >
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="text-sm font-medium text-foreground">{role.title}</span>
                <span className="text-xs text-muted-foreground">
                  {role.location}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden text-xs text-muted-foreground sm:inline">Learn More</span>
                <ArrowUpRight size={16} strokeWidth={1} className="shrink-0 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Main Careers Page
   ────────────────────────────────────────────── */

const Careers = () => {
  const { ref: heroRef, isVisible: heroVis } = useScrollReveal(0.1);
  const { ref: whyRef, isVisible: whyVis } = useScrollReveal(0.2);
  const { ref: ctaRef, isVisible: ctaVis } = useScrollReveal(0.2);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Careers"
        description="Join the frontier of neural interface technology. Explore open roles in engineering, clinical research, and product design."
        canonical="/careers"
      />
      <Navbar />
      <main className="pt-12">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden px-6">
          <div
            ref={heroRef}
            className="mx-auto flex max-w-6xl flex-col items-start py-32 sm:py-40 transition-all duration-[800ms]"
            style={{
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
            }}
          >
            {/* HeroHalo at 5% opacity */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="rounded-full"
                style={{
                  width: '600px',
                  height: '600px',
                  background: 'hsl(var(--electric-blue))',
                  filter: 'blur(200px)',
                  opacity: 0.05,
                }}
                aria-hidden="true"
              />
            </div>

            <h1 className="relative z-10 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
              Join the
              <br />
              Frontier.
            </h1>
            <p className="relative z-10 mt-8 max-w-[600px] text-lg leading-relaxed text-muted-foreground">
              We build clinical-grade neural interfaces at the intersection of neuroscience, precision engineering, and computational ethics. If you think in first principles and build for the long term, we'd like to hear from you.
            </p>
          </div>
          {/* Hero bottom border */}
          <div className="mx-auto max-w-6xl border-b border-border/60" />
        </section>

        {/* ── THE CHANGE WE SEEK ── */}
        <section className="px-6 py-28 sm:py-32">
          <div
            ref={whyRef}
            className="mx-auto max-w-6xl transition-all duration-[600ms]"
            style={{
              opacity: whyVis ? 1 : 0,
              transform: whyVis ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
            }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              The Mission
            </p>
            <h2 className="max-w-3xl text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-snug">
              We are redefining the interface between human thought and digital action. We don't just build products; we build icons of clinical precision.
            </h2>
          </div>
        </section>

        {/* ── DEPARTMENT DIRECTORY — line-based ── */}
        <section className="px-6 pb-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 flex items-baseline justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Open Departments
              </p>
              <p className="text-xs font-mono tabular-nums text-muted-foreground">
                {getDepartments().reduce((sum, d) => sum + d.roles.length, 0)} open roles
              </p>
            </div>

            {getDepartments().map((dept) => (
              <DepartmentBlock key={dept.index} dept={dept} />
            ))}

            {/* Final bottom border */}
            <div className="border-t border-border/60" />
          </div>
        </section>

        {/* ── GENERAL INQUIRY CTA ── */}
        <section className="px-6 pb-32">
          <div
            ref={ctaRef}
            className="mx-auto max-w-6xl transition-all duration-[600ms]"
            style={{
              opacity: ctaVis ? 1 : 0,
              transform: ctaVis ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
            }}
          >
            <div className="py-16 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Don't See Your Role?
              </p>
              <h3 className="mb-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                We're always looking for exceptional minds.
              </h3>
              <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-muted-foreground">
                If your expertise doesn't fit the current openings, submit a general inquiry. We review every submission.
              </p>
              <Link
                to="/contact"
                className="inline-flex h-11 items-center gap-2 rounded-full px-8 text-sm font-semibold bg-primary text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

    </div>
  );
};

export default Careers;
