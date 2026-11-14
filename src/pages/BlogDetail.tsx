import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { getBlogPostBySlug, BlogPost } from '@/lib/content';
import { categoryColors } from './Blog';
import { ArrowLeft, Clock } from 'lucide-react';

const BlogDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        if (slug) {
            const fetchedPost = getBlogPostBySlug(slug);
            if (fetchedPost) {
                setPost(fetchedPost);
            } else {
                navigate('/blog');
            }
        }
    }, [slug, navigate]);

    if (!post) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
            <SEO
                title={post.title}
                description={post.excerpt}
                canonical={`/blog/${slug}`}
                ogType="article"
                ogImage={post.coverImage}
            />
            <Navbar />

            <main className="flex-1 pt-24 pb-32">
                <article className="mx-auto max-w-3xl px-6">
                    {/* Back navigation */}
                    <div className="mb-10">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft size={16} />
                            Back to Publications
                        </Link>
                    </div>

                    {/* Header */}
                    <header className="mb-14">
                        <div className="mb-6 flex items-center gap-3">
                            <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                                    categoryColors[post.category] || 'bg-secondary text-muted-foreground border border-border/60'
                                }`}
                            >
                                {post.category}
                            </span>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="tabular-nums">{post.date}</span>
                                <span className="flex items-center gap-1">
                                    <Clock size={11} strokeWidth={1.5} />
                                    {post.readTime}
                                </span>
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15] mb-6">
                            {post.title}
                        </h1>

                        <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground">
                            {post.excerpt}
                        </p>
                    </header>

                    {/* Cover Image */}
                    {post.coverImage && (
                        <div className="mb-12 overflow-hidden rounded-3xl bg-secondary/50 border border-border/60">
                            <img
                                src={post.coverImage}
                                alt={`${post.title} cover`}
                                className="w-full h-auto object-cover max-h-[500px]"
                            />
                        </div>
                    )}

                    {/* Rendered Markdown Body */}
                    <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none border-t border-border/60 pt-10">
                        {post.body ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {post.body}
                            </ReactMarkdown>
                        ) : (
                            <div className="rounded-2xl border border-border/60 bg-card p-8 text-center text-muted-foreground">
                                <p className="italic">
                                    Full paper manuscript is undergoing peer-review and will be published shortly.
                                </p>
                            </div>
                        )}
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default BlogDetail;
