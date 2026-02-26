import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowLeft, ArrowUpRight, MapPin, Briefcase, Clock } from 'lucide-react';
import { getRoleBySlug } from '@/data/careers';

const RoleDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const result = slug ? getRoleBySlug(slug) : null;

    const { ref: heroRef, isVisible: heroVis } = useScrollReveal(0.1);
    const { ref: bodyRef, isVisible: bodyVis } = useScrollReveal(0.1);

    if (!result) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="flex min-h-screen items-center justify-center px-6 pt-12">
                    <div className="text-center">
                        <h1 className="mb-4 text-2xl font-semibold text-foreground">Role Not Found</h1>
                        <p className="mb-8 text-sm text-muted-foreground">This position may have been filled or removed.</p>
                        <Link
                            to="/careers"
                            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-opacity duration-300 hover:opacity-60"
                        >
                            <ArrowLeft size={16} strokeWidth={1.2} />
                            Back to All Roles
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    const { role, department } = result;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-12">
                {/* ── BACK NAV ── */}
                <div className="px-6 pt-8">
                    <div className="mx-auto max-w-4xl">
                        <Link
                            to="/careers"
                            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-opacity duration-300 hover:opacity-60"
                        >
                            <ArrowLeft size={14} strokeWidth={1.2} />
                            All Positions
                        </Link>
                    </div>
                </div>

                {/* ── ROLE HERO ── */}
                <section className="px-6 pb-12 pt-16">
                    <div
                        ref={heroRef}
                        className="mx-auto max-w-4xl transition-all duration-[600ms]"
                        style={{
                            opacity: heroVis ? 1 : 0,
                            transform: heroVis ? 'translateY(0)' : 'translateY(16px)',
                            transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
                        }}
                    >
                        {/* Department label */}
                        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            [{department.index}] {department.name}
                        </p>

                        {/* Title */}
                        <h1
                            className="text-foreground"
                            style={{
                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                                fontSize: 'clamp(32px, 5vw, 56px)',
                                fontWeight: 500,
                                letterSpacing: '-0.04em',
                                lineHeight: 1.1,
                            }}
                        >
                            {role.title}
                        </h1>

                        {/* Meta row */}
                        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-2">
                                <MapPin size={14} strokeWidth={1.2} />
                                {role.location}
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Briefcase size={14} strokeWidth={1.2} />
                                {role.level}
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Clock size={14} strokeWidth={1.2} />
                                {role.commitment}
                            </span>
                        </div>

                        {/* Apply CTA — top placement */}
                        <div className="mt-10">
                            <Link
                                to="/contact"
                                className="inline-flex h-11 items-center gap-2 rounded-2xl px-8 text-sm font-medium text-white transition-all duration-500 hover:-translate-y-0.5 active:scale-[0.98]"
                                style={{ background: '#0060E9', transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)' }}
                            >
                                Apply for This Role
                                <ArrowUpRight size={16} strokeWidth={1.2} />
                            </Link>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mx-auto mt-16 max-w-4xl" style={{ borderBottom: '0.5px solid hsl(213 27% 84%)' }} />
                </section>

                {/* ── ROLE BODY — Nothing-style dense content ── */}
                <section className="px-6 pb-32">
                    <div
                        ref={bodyRef}
                        className="mx-auto grid max-w-4xl grid-cols-1 gap-16 pt-16 transition-all duration-[600ms] lg:grid-cols-[1fr_320px]"
                        style={{
                            opacity: bodyVis ? 1 : 0,
                            transform: bodyVis ? 'translateY(0)' : 'translateY(16px)',
                            transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
                        }}
                    >
                        {/* LEFT — Job details */}
                        <div className="space-y-16">
                            {/* About */}
                            <div>
                                <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                    About This Role
                                </h2>
                                <p className="text-base leading-relaxed text-foreground" style={{ letterSpacing: '-0.01em' }}>
                                    {role.about}
                                </p>
                            </div>

                            {/* Responsibilities */}
                            <div>
                                <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                    What You'll Do
                                </h2>
                                <ul className="space-y-4">
                                    {role.responsibilities.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex gap-4 text-sm leading-relaxed text-foreground"
                                            style={{ letterSpacing: '-0.01em' }}
                                        >
                                            <span className="mt-0.5 shrink-0 text-xs tabular-nums text-muted-foreground" style={{ minWidth: '20px' }}>
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Requirements */}
                            <div>
                                <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                    What We're Looking For
                                </h2>
                                <ul className="space-y-3">
                                    {role.requirements.map((item, i) => (
                                        <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground" style={{ letterSpacing: '-0.01em' }}>
                                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Nice to have */}
                            {role.niceToHave.length > 0 && (
                                <div>
                                    <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                        Nice to Have
                                    </h2>
                                    <ul className="space-y-3">
                                        {role.niceToHave.map((item, i) => (
                                            <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground" style={{ letterSpacing: '-0.01em' }}>
                                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/15" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* RIGHT — Sidebar summary */}
                        <div className="lg:sticky lg:top-24 lg:h-fit">
                            <div className="space-y-8">
                                <div>
                                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Department</p>
                                    <p className="text-sm text-foreground">{department.name}</p>
                                    <p className="mt-0.5 text-xs text-muted-foreground">{department.disciplines}</p>
                                </div>
                                <div style={{ borderTop: '0.5px solid hsl(213 27% 84%)' }} />
                                <div>
                                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Location</p>
                                    <p className="text-sm text-foreground">{role.location}</p>
                                </div>
                                <div style={{ borderTop: '0.5px solid hsl(213 27% 84%)' }} />
                                <div>
                                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Level</p>
                                    <p className="text-sm text-foreground">{role.level}</p>
                                </div>
                                <div style={{ borderTop: '0.5px solid hsl(213 27% 84%)' }} />
                                <div>
                                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Commitment</p>
                                    <p className="text-sm text-foreground">{role.commitment}</p>
                                </div>
                                <div style={{ borderTop: '0.5px solid hsl(213 27% 84%)' }} />

                                {/* Bottom CTA */}
                                <Link
                                    to="/contact"
                                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl text-sm font-medium text-white transition-all duration-500 hover:-translate-y-0.5 active:scale-[0.98]"
                                    style={{ background: '#0060E9', transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)' }}
                                >
                                    Apply for This Role
                                    <ArrowUpRight size={16} strokeWidth={1.2} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default RoleDetail;
