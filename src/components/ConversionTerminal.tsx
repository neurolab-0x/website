import { useState, useCallback } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowUpRight } from 'lucide-react';

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';

const ConversionTerminal = () => {
    const { ref, isVisible } = useScrollReveal(0.15);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (!email.trim()) return;
            setSubmitting(true);

            // Simulate api/partnerships POST
            await new Promise((r) => setTimeout(r, 1800));
            setSubmitting(false);
            setSubmitted(true);
        },
        [email]
    );

    return (
        <section className="px-6 py-0">
            <div
                ref={ref}
                className="mx-auto max-w-6xl overflow-hidden rounded-[32px]"
                style={{
                    background: '#0F172A',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                    transition: `all 800ms ${easing}`,
                }}
            >
                <div className="grid grid-cols-1 items-center gap-12 px-8 py-20 md:grid-cols-2 md:px-16 md:py-24">
                    {/* Left — Copy */}
                    <div>
                        <p
                            className="mb-4 text-xs font-medium uppercase tracking-[0.25em]"
                            style={{ color: 'rgba(255,255,255,0.35)' }}
                        >
                            Phase 01 — Clinical Access
                        </p>
                        <h2
                            style={{
                                fontFamily: sfPro,
                                fontSize: 'clamp(28px, 4vw, 44px)',
                                fontWeight: 600,
                                letterSpacing: '-0.04em',
                                lineHeight: 1.1,
                                color: '#FFFFFF',
                            }}
                        >
                            Join the
                            <br />
                            Clinical Waitlist.
                        </h2>
                        <p className="mt-6 max-w-sm text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                            Phase 01 allocations are limited to research institutions, clinical partners, and qualified practitioners.
                        </p>
                    </div>

                    {/* Right — Form */}
                    <div>
                        {submitted ? (
                            <div
                                className="flex flex-col items-start"
                                style={{
                                    animation: 'fadeIn 600ms ease-out forwards',
                                }}
                            >
                                <p className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                                    Inquiry Received
                                </p>
                                <p className="mt-4 text-lg font-medium text-white" style={{ fontFamily: sfPro }}>
                                    We'll be in touch within 48 hours.
                                </p>
                                <p className="mt-2 text-sm tabular-nums" style={{ color: 'rgba(255,255,255,0.35)' }}>
                                    Ref: NL-{Date.now().toString(36).toUpperCase()}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div>
                                    <label
                                        className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em]"
                                        style={{ color: 'rgba(255,255,255,0.35)' }}
                                    >
                                        Work Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@institution.edu"
                                        className="w-full bg-transparent pb-3 text-sm text-white outline-none placeholder:text-white/20"
                                        style={{
                                            borderBottom: '0.5px solid rgba(255,255,255,0.15)',
                                            transition: `border-color 300ms ${easing}`,
                                        }}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.4)';
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.15)';
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-500 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50"
                                    style={{
                                        background: '#FFFFFF',
                                        color: '#0F172A',
                                        transitionTimingFunction: easing,
                                    }}
                                >
                                    {submitting ? (
                                        <span className="flex items-center gap-2">
                                            <span className="inline-block h-3 w-3 animate-spin rounded-full border border-slate-300 border-t-slate-900" />
                                            Processing...
                                        </span>
                                    ) : (
                                        <>
                                            Request Access for Clinical Use
                                            <ArrowUpRight size={16} strokeWidth={1.2} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConversionTerminal;
