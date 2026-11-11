import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const linkGroups = [
    {
        title: 'Product',
        links: [
            { label: 'Technology', to: '/#technology' },
            { label: 'Research', to: '/blog?category=Research' },
            { label: 'Safety Architecture', to: '/#safety' },
            { label: 'Nexus Series', to: '/shop' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About Us', to: '/about' },
            { label: 'Careers', to: '/careers' },
            { label: 'Publications & Blog', to: '/blog' },
            { label: 'Contact', to: '/contact' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy', to: '/legal#privacy' },
            { label: 'Terms of Service', to: '/legal#terms' },
            { label: 'Cookie Policy', to: '/legal#cookies' },
        ],
    },
];

const socials = [
    { label: 'X / Twitter', href: 'https://x.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/neurolab-inc/' },
    { label: 'GitHub', href: 'https://github.com/neurolab-0x/' },
];

const Footer = () => {
    const { theme, setTheme } = useTheme();

    return (
        <footer className="bg-background text-foreground transition-colors duration-300">
            {/* Top border */}
            <div className="mx-auto max-w-6xl px-6">
                <div className="border-t border-border/50" />
            </div>

            <div className="mx-auto max-w-6xl px-6 pb-12 pt-16">
                {/* ── GRID: Brand + Link Columns ── */}
                <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 md:grid-cols-5 md:gap-x-8">
                    {/* Brand Column — spans 2 cols */}
                    <div className="sm:col-span-2 md:col-span-2">
                        <Link
                            to="/"
                            className="text-base font-semibold tracking-tight text-foreground"
                        >
                            Neurolab
                        </Link>
                        <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-muted-foreground">
                            Clinical-grade neural interfaces engineered for precision, safety, and the next era of human-computer interaction.
                        </p>

                        {/* Social links */}
                        <div className="mt-6 flex items-center gap-4">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-muted-foreground transition-opacity duration-300 hover:text-foreground hover:opacity-100"
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
                                        <Link
                                            to={link.to}
                                            className="text-sm text-foreground/80 transition-colors duration-200 hover:text-foreground"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* ── BOTTOM BAR ── */}
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
                    <p className="text-xs tabular-nums text-muted-foreground">
                        © {new Date().getFullYear()} Neurolab Inc. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                        </button>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="ml-1">Telemetry active</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
