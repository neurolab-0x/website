import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { getBlogPosts, type BlogPost } from '@/lib/content';
import { ArrowUpRight, Clock } from 'lucide-react';

const cardEasing = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';
const categories = ['All', 'Engineering', 'Clinical', 'Research', 'Product', 'Company'] as const;

export const categoryColors: Record<string, string> = {
    Engineering: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
    Clinical: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    Research: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20',
    Product: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
    Company: 'bg-secondary text-muted-foreground border border-border/60',
};

/* ── Blog Card ── */
const BlogCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => {
    return (
        <article
            className={`group flex flex-col overflow-hidden rounded-3xl bg-card border border-border/70 text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md ${
                featured ? 'md:col-span-2 md:flex-row' : ''
            }`}
        >
            {/* Thumbnail */}
            <div
                className={`relative overflow-hidden bg-secondary/50 ${
                    featured ? 'md:w-1/2 min-h-[280px]' : 'aspect-[16/9] w-full'
                }`}
            >
                {post.thumbnail ? (
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary/80 to-card">
                        <div className="h-24 w-24 rounded-full border border-primary/20 opacity-30" />
                        <div className="absolute h-16 w-16 rounded-full border border-primary/30 opacity-40" />
                        <div className="absolute h-32 w-32 rounded-full border border-primary/10 opacity-20" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                            NeuroLab Research
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className={`flex flex-1 flex-col justify-between p-6 ${featured ? 'md:p-8' : ''}`}>
                <div>
                    <div className="mb-4 flex items-center gap-3">
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                                categoryColors[post.category] || 'bg-secondary text-muted-foreground border border-border/60'
                            }`}
                        >
                            {post.category}
                        </span>
                    </div>

                    <h3
                        className={`mb-3 font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary ${
                            featured ? 'text-2xl sm:text-3xl leading-snug' : 'text-lg leading-snug'
                        }`}
                    >
                        {post.title}
                    </h3>

                    <p
                        className={`leading-relaxed text-muted-foreground ${
                            featured ? 'text-base' : 'text-sm line-clamp-2'
                        }`}
                    >
                        {post.excerpt}
                    </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="tabular-nums">{post.date}</span>
                        <span className="flex items-center gap-1">
                            <Clock size={12} strokeWidth={1.5} />
                            {post.readTime}
                        </span>
                    </div>
                    <Link to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                            <ArrowUpRight size={14} strokeWidth={1.5} />
                        </div>
                    </Link>
                </div>
            </div>
        </article>
    );
};

/* ── Main Blog Page ── */
const Blog = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const getInitialCategory = React.useCallback(() => {
        const params = new URLSearchParams(location.search);
        const urlCat = params.get('category');
        return urlCat && (categories as readonly string[]).includes(urlCat) ? urlCat : 'All';
    }, [location.search]);

    const [activeCategory, setActiveCategory] = useState<string>(getInitialCategory());
    const { ref: heroRef, isVisible: heroVis } = useScrollReveal(0.1);
    const { ref: gridRef, isVisible: gridVis } = useScrollReveal(0.1);

    useEffect(() => {
        setActiveCategory(getInitialCategory());
    }, [location.search, getInitialCategory]);

    const filtered =
        activeCategory === 'All'
            ? getBlogPosts()
            : getBlogPosts().filter((p) => p.category === activeCategory);

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <SEO
                title="Publications & Research"
                description="Insights, engineering deep-dives, and clinical milestones from the NeuroLab team."
                canonical="/blog"
            />
            <Navbar />
            <main className="pt-16">
                {/* ── HERO ── */}
                <section className="px-6">
                    <div
                        ref={heroRef}
                        className="mx-auto max-w-5xl py-20 sm:py-28 transition-all duration-[600ms]"
                        style={{
                            opacity: heroVis ? 1 : 0,
                            transform: heroVis ? 'translateY(0)' : 'translateY(16px)',
                            transitionTimingFunction: cardEasing,
                        }}
                    >
                        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
                            NeuroLab Research
                        </p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
                            Publications & Milestones
                        </h1>
                        <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
                            The latest engineering deep-dives, clinical trial updates, biocompatibility findings, and algorithmic breakthroughs from our team.
                        </p>
                    </div>
                    <div className="mx-auto max-w-5xl border-b border-border/60" />
                </section>

                {/* ── FILTER PILLS ── */}
                <section className="px-6">
                    <div className="mx-auto flex max-w-5xl flex-wrap gap-2 py-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    if (cat === 'All') {
                                        navigate('/blog');
                                    } else {
                                        navigate(`/blog?category=${cat}`);
                                    }
                                }}
                                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                                    activeCategory === cat
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'bg-secondary/60 text-muted-foreground border border-border/60 hover:text-foreground hover:bg-secondary'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* ── CARD GRID ── */}
                <section className="px-6 pb-32">
                    <div
                        ref={gridRef}
                        className="mx-auto max-w-5xl transition-all duration-[600ms]"
                        style={{
                            opacity: gridVis ? 1 : 0,
                            transform: gridVis ? 'translateY(0)' : 'translateY(16px)',
                            transitionTimingFunction: cardEasing,
                        }}
                    >
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {filtered.map((post) => (
                                <BlogCard
                                    key={post.slug}
                                    post={post}
                                    featured={post.featured && activeCategory === 'All'}
                                />
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="py-24 text-center">
                                <p className="text-base text-muted-foreground">
                                    No publications found in this category.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Blog;
