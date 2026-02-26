import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  ArrowUpRight, ArrowRight, X, Copy, Check,
  Mail, MessageCircle, Handshake, Code, FlaskConical, Users,
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
    // Simulates POST /api/partnerships
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTrackingId(generateId());
    }, 1800);
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 transition-all duration-500"
      style={{
        background: open ? 'rgba(15, 23, 42, 0.3)' : 'transparent',
        backdropFilter: open ? 'blur(4px)' : 'none',
        pointerEvents: open ? 'auto' : 'none',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
      }}
    >
      <div
        className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-background transition-transform duration-500"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
          borderLeft: '0.5px solid hsl(213 27% 84%)',
        }}
      >
        {submitting && (
          <div className="surgical-loader absolute left-0 right-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        )}

        <div
          className="flex items-center justify-between px-8 py-6"
          style={{ borderBottom: '0.5px solid hsl(213 27% 84%)' }}
        >
          <h2
            className="text-foreground"
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
              fontSize: '18px',
              fontWeight: 500,
              letterSpacing: '-0.02em',
            }}
          >
            Sales & Partnerships
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 hover:bg-secondary"
          >
            <X size={16} strokeWidth={1.2} className="text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-8">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-full"
                style={{ border: '0.5px solid hsl(213 27% 84%)' }}
              >
                <Check size={20} strokeWidth={1.2} className="text-foreground" />
              </div>
              <h3
                className="mb-2 text-foreground"
                style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                  fontSize: '24px',
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                }}
              >
                Inquiry Received
              </h3>
              <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Our partnerships team will respond within 2 business days.
              </p>
              <div className="rounded-2xl px-6 py-3" style={{ border: '0.5px solid hsl(213 27% 84%)' }}>
                <p className="text-xs text-muted-foreground">Tracking ID</p>
                <p className="mt-0.5 text-sm font-medium tabular-nums text-foreground">{trackingId}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <p className="text-sm leading-relaxed text-muted-foreground">
                For enterprise contracts, bulk device commissioning, and institutional partnerships. We'll match you with the right team.
              </p>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">Full Name</label>
                  <input type="text" required className="w-full bg-transparent pb-3 text-sm text-foreground outline-none placeholder:text-slate-300" style={{ borderBottom: '0.5px solid hsl(213 27% 84%)' }} placeholder="Dr. Jane Mitchell" />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">Institutional Email</label>
                  <input type="email" required className="w-full bg-transparent pb-3 text-sm text-foreground outline-none placeholder:text-slate-300" style={{ borderBottom: '0.5px solid hsl(213 27% 84%)' }} placeholder="j.mitchell@stanford.edu" />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">Organization</label>
                  <input type="text" required className="w-full bg-transparent pb-3 text-sm text-foreground outline-none placeholder:text-slate-300" style={{ borderBottom: '0.5px solid hsl(213 27% 84%)' }} placeholder="Stanford Neuroscience Institute" />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">Partnership Type</label>
                  <select required className="w-full bg-transparent pb-3 text-sm text-foreground outline-none" style={{ borderBottom: '0.5px solid hsl(213 27% 84%)' }} defaultValue="">
                    <option value="" disabled>Select type</option>
                    <option value="enterprise">Enterprise Contract</option>
                    <option value="clinical">Clinical Deployment</option>
                    <option value="research">Research Collaboration</option>
                    <option value="distribution">Distribution Partner</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">Message</label>
                  <textarea rows={3} className="w-full resize-none bg-transparent pb-3 text-sm text-foreground outline-none placeholder:text-slate-300" style={{ borderBottom: '0.5px solid hsl(213 27% 84%)' }} placeholder="Describe your use case or requirements" />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl text-sm font-medium text-white transition-all duration-500 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50"
                style={{ background: '#0060E9', transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)' }}
              >
                {submitting ? 'Submitting…' : 'Submit Inquiry'}
                {!submitting && <ArrowUpRight size={16} strokeWidth={1.2} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Reusable Card Shell
   ────────────────────────────────────────────── */

const cardBase = 'flex flex-col justify-between rounded-3xl bg-secondary transition-all duration-500';
const cardEasing = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';

const useCardHover = () => ({
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = 'hsl(215 25% 70%)';
    e.currentTarget.style.boxShadow = '0 1px 0 0 hsl(213 27% 84%)';
  },
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = 'hsl(213 27% 84%)';
    e.currentTarget.style.boxShadow = 'none';
  },
});

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/* ──────────────────────────────────────────────
   Main Contact Page
   ────────────────────────────────────────────── */

const Contact = () => {
  const [salesOpen, setSalesOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { ref: heroRef, isVisible: heroVis } = useScrollReveal(0.1);
  const { ref: gridRef, isVisible: gridVis } = useScrollReveal(0.15);
  const hover = useCardHover();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('hello@neurolab.cc');
    } catch {
      const t = document.createElement('textarea');
      t.value = 'hello@neurolab.cc';
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-12">
        {/* ── HERO ── */}
        <section className="px-6">
          <div
            ref={heroRef}
            className="mx-auto max-w-5xl py-32 sm:py-40 transition-all duration-[600ms]"
            style={{
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? 'translateY(0)' : 'translateY(16px)',
              transitionTimingFunction: cardEasing,
            }}
          >
            <h1
              className="text-foreground"
              style={{
                fontFamily: sfPro,
                fontSize: 'clamp(36px, 6vw, 64px)',
                fontWeight: 500,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
              }}
            >
              How can we help?
            </h1>
            <p className="mt-6 max-w-[480px] text-base leading-relaxed text-slate-500">
              Whether you're commissioning clinical-grade hardware, need technical support for an existing deployment, or want to explore a research partnership — we'll connect you with the right team.
            </p>
          </div>
          <div className="mx-auto max-w-5xl" style={{ borderBottom: '0.5px solid hsl(213 27% 84%)' }} />
        </section>

        {/* ── ROUTING GRID — Asymmetrical 2-column, 3 rows ── */}
        <section className="px-6 py-24">
          <div
            ref={gridRef}
            className="mx-auto max-w-5xl space-y-4 transition-all duration-[600ms]"
            style={{
              opacity: gridVis ? 1 : 0,
              transform: gridVis ? 'translateY(0)' : 'translateY(16px)',
              transitionTimingFunction: cardEasing,
            }}
          >

            {/* ── PRIMARY ROW — Sales + Support ── */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Sales */}
              <div
                className={`${cardBase} px-6 py-8`}
                style={{ border: '0.5px solid hsl(213 27% 84%)', transitionTimingFunction: cardEasing }}
                {...hover}
              >
                <div>
                  <div className='flex gap-4 items-center'>
                    <Mail size={22} strokeWidth={1.2} className="mb-3 text-muted-foreground" />
                    <h3 className="mb-2 text-foreground" style={{ fontFamily: sfPro, fontSize: '20px', fontWeight: 500, letterSpacing: '-0.02em' }}>
                      Sales
                    </h3>

                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Enterprise contracts, bulk device commissioning, and clinical deployment agreements.
                  </p>
                  <p className="mt-2 text-xs tabular-nums text-muted-foreground">sales@neurolab.cc</p>
                </div>
                <button
                  onClick={() => setSalesOpen(true)}
                  className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-2xl text-sm font-medium text-white transition-all duration-500 hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{ background: '#0060E9', transitionTimingFunction: cardEasing }}
                >
                  Talk to Sales
                  <ArrowUpRight size={16} strokeWidth={1.2} />
                </button>
              </div>

              {/* Help & Support */}
              <div
                className={`${cardBase} px-6 py-8`}
                style={{ border: '0.5px solid hsl(213 27% 84%)', transitionTimingFunction: cardEasing }}
                {...hover}
              >
                <div>
                  <div className='flex gap-4 items-center'>

                    <MessageCircle size={22} strokeWidth={1.2} className="mb-3 text-muted-foreground" />
                    <h3 className="mb-2 text-foreground" style={{ fontFamily: sfPro, fontSize: '20px', fontWeight: 500, letterSpacing: '-0.02em' }}>
                      Help & Support
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Device troubleshooting, firmware updates, platform feedback, and clinical deployment assistance.
                  </p>
                  <p className="mt-2 text-xs tabular-nums text-muted-foreground">support@neurolab.cc</p>
                </div>
                <a
                  href="mailto:support@neurolab.cc"
                  className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-2xl text-sm font-medium text-white transition-all duration-500 hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{ background: 'hsl(var(--foreground))', transitionTimingFunction: cardEasing }}
                >
                  Contact Support
                  <ArrowUpRight size={16} strokeWidth={1.2} />
                </a>
              </div>
            </div>

            {/* ── SECONDARY ROW — plain text blocks (no boxes) ── */}
            <div className="grid grid-cols-1 gap-x-4 gap-y-12 pt-12 md:grid-cols-2">
              {/* Partnerships */}
              <div className="pl-6">
                <h3 className="mb-2 text-foreground" style={{ fontFamily: sfPro, fontSize: '16px', fontWeight: 500, letterSpacing: '-0.01em' }}>
                  Partnerships
                </h3>
                <p className="mb-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Institutional research collaborations, distribution agreements, and co-development programs.
                </p>
                <button
                  onClick={() => setSalesOpen(true)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-opacity duration-300 hover:opacity-60"
                >
                  Talk to Sales <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </div>

              {/* General Communication */}
              <div className="pl-6">
                <h3 className="mb-2 text-foreground" style={{ fontFamily: sfPro, fontSize: '16px', fontWeight: 500, letterSpacing: '-0.01em' }}>
                  General communication
                </h3>
                <p className="mb-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  For other queries, please get in touch with us via email.
                </p>
                <div className="inline-flex items-center gap-3">
                  <Mail size={14} strokeWidth={1.2} className="text-muted-foreground" />
                  <span className="text-sm font-medium tabular-nums text-foreground" style={{ letterSpacing: '-0.01em' }}>
                    hello@neurolab.cc
                  </span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-opacity duration-300 hover:opacity-60"
                  >
                    {copied ? (
                      <><Check size={12} strokeWidth={1.2} /> Copied</>
                    ) : (
                      <><Copy size={12} strokeWidth={1.2} /> Copy</>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ── TERTIARY ROW — plain text blocks (no boxes) ── */}
            <div className="grid grid-cols-1 gap-x-4 gap-y-12 pt-12 md:grid-cols-2">
              {/* Documentation / Developer API */}
              <div className="pl-6">
                <h3 className="mb-2 text-foreground" style={{ fontFamily: sfPro, fontSize: '16px', fontWeight: 500, letterSpacing: '-0.01em' }}>
                  Documentation
                </h3>
                <p className="mb-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  REST and WebSocket APIs for neural data streaming, device management, and analysis integration.
                </p>
                <Link
                  to="/ai-platform"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-opacity duration-300 hover:opacity-60"
                >
                  View Docs <ArrowRight size={14} strokeWidth={1.5} />
                </Link>
              </div>

              {/* Research */}
              <div className="pl-6">
                <h3 className="mb-2 text-foreground" style={{ fontFamily: sfPro, fontSize: '16px', fontWeight: 500, letterSpacing: '-0.01em' }}>
                  Research Collaboration
                </h3>
                <p className="mb-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Joint publications, IRB-approved clinical studies, and open-science data sharing.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-opacity duration-300 hover:opacity-60"
                >
                  Learn More <ArrowRight size={14} strokeWidth={1.5} />
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

