import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  ArrowUpRight, ArrowRight, X, Copy, Check,
  Mail, MessageCircle, Sparkles,
} from 'lucide-react';

/* ──────────────────────────────────────────────
   Sales Slide-Over Modal
   ────────────────────────────────────────────── */

interface SlideOverProps {
  open: boolean;
  onClose: () => void;
}

const SalesSlideOver = ({ open, onClose }: SlideOverProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const backdropRef = useRef<HTMLDivElement>(null);

  const generateId = () => {
    const prefix = 'NL';
    const ts = Date.now().toString(36).toUpperCase().slice(-6);
    const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
    return `${prefix}-${ts}-${rand}`;
  };

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === backdropRef.current) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => {
        setSubmitted(false);
        setSubmitting(false);
        setTrackingId('');
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTrackingId(generateId());
    }, 1200);
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 transition-all duration-500"
      style={{
        background: open ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
        backdropFilter: open ? 'blur(4px)' : 'none',
        pointerEvents: open ? 'auto' : 'none',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
      }}
    >
      <div
        className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-background border-l border-border transition-transform duration-500 shadow-2xl"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        }}
      >
        {submitting && (
          <div className="surgical-loader absolute left-0 right-0 top-0 z-10 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
        )}

        <div className="flex items-center justify-between px-8 py-6 border-b border-border/70">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Sales & Institutional Partnerships
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-secondary"
            aria-label="Close dialog"
          >
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-8">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                <Check size={22} strokeWidth={2} />
              </div>
              <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
                Inquiry Received
              </h3>
              <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Our clinical partnerships team will respond within 2 business days.
              </p>
              <div className="rounded-2xl border border-border bg-card px-6 py-3">
                <p className="text-xs text-muted-foreground">Tracking ID</p>
                <p className="mt-0.5 text-sm font-mono font-medium tabular-nums text-foreground">{trackingId}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                For enterprise contracts, bulk device commissioning, and institutional clinical partnerships.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</label>
                  <input type="text" required className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary" placeholder="Dr. Jane Mitchell" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Institutional Email</label>
                  <input type="email" required className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary" placeholder="j.mitchell@stanford.edu" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization / Hospital</label>
                  <input type="text" required className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary" placeholder="Stanford Neuroscience Institute" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Partnership Type</label>
                  <select required className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary" defaultValue="">
                    <option value="" disabled>Select partnership tier</option>
                    <option value="enterprise">Enterprise Contract</option>
                    <option value="clinical">Clinical Trial Deployment</option>
                    <option value="research">Academic Research Collaboration</option>
                    <option value="distribution">Distribution & Supply</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                  <textarea rows={3} className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary" placeholder="Describe your deployment scale or clinical requirements" />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
              >
                {submitting ? 'Submitting…' : 'Submit Inquiry'}
                {!submitting && <ArrowUpRight size={16} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const cardBase = 'flex flex-col justify-between rounded-3xl bg-card border border-border/70 p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md';
const cardEasing = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';

/* ──────────────────────────────────────────────
   Main Contact Page
   ────────────────────────────────────────────── */

const Contact = () => {
  const [salesOpen, setSalesOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { ref: heroRef, isVisible: heroVis } = useScrollReveal(0.1);
  const { ref: gridRef, isVisible: gridVis } = useScrollReveal(0.15);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText('hello@neurolab.cc');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // safe fallback without document.execCommand
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <SEO
        title="Contact Us"
        description="Get in touch with the NeuroLab team for inquiries about our clinical-grade neural interfaces and research partnerships."
        canonical="/contact"
      />
      <Navbar />
      <main className="pt-16">
        {/* ── HERO ── */}
        <section className="px-6">
          <div
            ref={heroRef}
            className="mx-auto max-w-5xl py-24 sm:py-32 transition-all duration-[600ms]"
            style={{
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? 'translateY(0)' : 'translateY(16px)',
              transitionTimingFunction: cardEasing,
            }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Connect With NeuroLab
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
              How can we help?
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              Whether you're commissioning clinical hardware, exploring a research collaboration, or require deployment support — our engineering and partnerships teams are ready.
            </p>
          </div>
          <div className="mx-auto max-w-5xl border-b border-border/60" />
        </section>

        {/* ── ROUTING GRID ── */}
        <section className="px-6 py-20 sm:py-24">
          <div
            ref={gridRef}
            className="mx-auto max-w-5xl space-y-12 transition-all duration-[600ms]"
            style={{
              opacity: gridVis ? 1 : 0,
              transform: gridVis ? 'translateY(0)' : 'translateY(16px)',
              transitionTimingFunction: cardEasing,
            }}
          >
            {/* Primary Row — Sales + Support */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Sales */}
              <div className={cardBase}>
                <div>
                  <div className="flex gap-3 items-center mb-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                      <Mail size={20} strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      Sales & Deployment
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Enterprise contracts, bulk device commissioning, and clinical institutional agreements.
                  </p>
                  <p className="mt-3 text-xs font-mono tabular-nums text-muted-foreground">sales@neurolab.cc</p>
                </div>
                <button
                  onClick={() => setSalesOpen(true)}
                  className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
                >
                  Talk to Sales
                  <ArrowUpRight size={16} />
                </button>
              </div>

              {/* Help & Support */}
              <div className={cardBase}>
                <div>
                  <div className="flex gap-3 items-center mb-4">
                    <div className="p-2.5 rounded-xl bg-secondary text-foreground">
                      <MessageCircle size={20} strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      Technical Support
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Hardware troubleshooting, sensor calibration, firmware inquiries, and active clinical support.
                  </p>
                  <p className="mt-3 text-xs font-mono tabular-nums text-muted-foreground">support@neurolab.cc</p>
                </div>
                <a
                  href="mailto:support@neurolab.cc"
                  className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold border border-border bg-secondary text-foreground transition-all hover:bg-accent active:scale-[0.98]"
                >
                  Contact Support
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            {/* Secondary Row */}
            <div className="grid grid-cols-1 gap-8 pt-8 border-t border-border/60 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">
                  Institutional Partnerships
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Hospital networks, medical schools, and research grants looking to adopt the Nexus architecture.
                </p>
                <button
                  onClick={() => setSalesOpen(true)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
                >
                  Initiate Partnership <ArrowRight size={14} />
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">
                  Direct Communications
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  For general corporate and media inquiries, reach out directly.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-foreground font-medium">
                    hello@neurolab.cc
                  </span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
                  >
                    {copied ? (
                      <><Check size={12} className="text-emerald-500" /> Copied</>
                    ) : (
                      <><Copy size={12} /> Copy</>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Tertiary Row */}
            <div className="grid grid-cols-1 gap-8 pt-8 border-t border-border/60 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">
                  Publications & Research
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Explore peer-reviewed studies, engineering benchmarks, and histological longevity reports.
                </p>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-75"
                >
                  Read Publications <ArrowRight size={14} />
                </Link>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">
                  Join the Mission
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Explore career openings across neural engineering, clinical operations, and computational ethics.
                </p>
                <Link
                  to="/careers"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-75"
                >
                  Explore Careers <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SalesSlideOver open={salesOpen} onClose={() => setSalesOpen(false)} />
    </div>
  );
};

export default Contact;
