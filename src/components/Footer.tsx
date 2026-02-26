import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const linkGroups = [
    {
        title: 'Product',
        links: [
            { label: 'Technology', href: '/#technology' },
            { label: 'Research', href: '/#research' },
            { label: 'Safety', href: '/#safety' },
            { label: 'NeurAI Platform', to: '/ai-platform' },
            { label: 'Shop', to: '/shop' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About', to: '/about' },
            { label: 'Careers', to: '/careers' },
            { label: 'Contact', to: '/contact' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Documentation', to: '/ai-platform' },
            { label: 'API Reference', to: '/ai-platform' },
            { label: 'System Status', href: '#' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Cookie Policy', href: '#' },
        ],
    },
];

const socials = [
    { label: 'X / Twitter', href: 'https://x.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/neurolab-cc/' },
    { label: 'GitHub', href: 'https://github.com/neurolab-0x/' },
];

const Footer = () => {
    return (
        <footer className="bg-background">
            {/* Top border */}
            <div className="mx-auto max-w-6xl px-6">
                <div style={{ borderTop: '0.5px solid hsl(213 27% 84%)' }} />
            </div>

            <div className="mx-auto max-w-6xl px-6 pb-12 pt-16">
                {/* ── GRID: Brand + Link Columns ── */}
                <div className="grid grid-cols-2 gap-y-12 md:grid-cols-6 md:gap-x-8">
                    {/* Brand Column — spans 2 cols */}
                    <div className="col-span-2">
                        <Link
                            to="/"
                            className="text-base font-semibold tracking-tight text-foreground"
                            style={{ fontFamily: sfPro }}
                        >
                            Neurolab
                        </Link>
                        <p className="mt-4 max-w-[240px] text-sm leading-relaxed text-muted-foreground">
                            Clinical-grade neural interfaces engineered for the next era of human-computer interaction.
                        </p>

                        {/* Social links */}
                        <div className="mt-6 flex items-center gap-4">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-muted-foreground transition-opacity duration-300 hover:opacity-60"
                                >
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {linkGroups.map((group) => (
                        <div key={group.title}>
                            <h4
                                className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
                            >
                                {group.title}
                            </h4>
                            <ul className="space-y-3">
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        {'to' in link && link.to ? (
                                            <Link
                                                to={link.to}
                                                className="text-sm text-foreground transition-opacity duration-300 hover:opacity-60"
                                            >
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <a
                                                href={link.href}
                                                className="text-sm text-foreground transition-opacity duration-300 hover:opacity-60"
                                            >
                                                {link.label}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* ── BOTTOM BAR ── */}
                <div
                    className="mt-16 flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row"
                    style={{ borderTop: '0.5px solid hsl(213 27% 84%)' }}
                >
                    <p className="text-xs tabular-nums text-muted-foreground">
                        © {new Date().getFullYear()} Neurolab Inc. All rights reserved.
                    </p>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="ml-1">All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
