import { useState, useCallback } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowUpRight } from 'lucide-react';

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

            // Simulate partnership intake
            await new Promise((r) => setTimeout(r, 1200));
            setSubmitting(false);
            setSubmitted(true);
        },
        [email]
    );

    return (
        <section id="waitlist" className="px-6 py-0 scroll-m-24">
            <div
                ref={ref}
                className="mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-slate-950 dark:bg-card border border-slate-800 dark:border-border text-white shadow-2xl"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                    transition: `all 800ms ${easing}`,
                }}
            >
                <div className="grid grid-cols-1 items-center gap-12 px-8 py-16 md:grid-cols-2 md:px-16 md:py-20">
                    {/* Left — Copy */}
                    <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                            Phase 01 — Clinical Access
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                            Join the
                            <br />
                            Clinical Waitlist.
                        </h2>
                        <p className="mt-6 max-w-sm text-base leading-relaxed text-slate-400">
                            Phase 01 allocations are prioritized for research institutions, clinical partners, and certified neurology centers.
                        </p>
                    </div>

                    {/* Right — Form */}
                    <div>
                        {submitted ? (
                            <div className="flex flex-col items-start animate-fade-in">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                                    Allocation Request Received
                                </p>
                                <p className="mt-4 text-lg font-semibold text-white">
                                    Our deployment team will reach out within 48 hours.
                                </p>
                                <p className="mt-2 text-xs font-mono tabular-nums text-slate-400">
                                    Reference ID: NL-{Date.now().toString(36).toUpperCase()}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div>
                                    <label
                                        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400"
                                    >
                                        Institutional / Work Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="practitioner@hospital.org"
                                        className="w-full bg-transparent pb-3 text-sm text-white outline-none placeholder:text-slate-500 border-b border-slate-800 focus:border-primary transition-colors"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold bg-white text-slate-950 transition-all duration-300 hover:bg-slate-100 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <span className="flex items-center gap-2">
                                            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-400 border-t-slate-950" />
                                            Processing Request...
                                        </span>
                                    ) : (
                                        <>
                                            Request Clinical Access
                                            <ArrowUpRight size={16} strokeWidth={1.5} />
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
