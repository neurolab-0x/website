import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

/* ──────────────────────────────────────────────
   Full site navigation — grouped by category
   ────────────────────────────────────────────── */

const navSections = [
  {
    title: 'Product',
    links: [
      { label: 'Technology', to: '/#technology' },
      { label: 'Research', to: '/#research' },
      { label: 'Shop', to: '/shop' },
      { label: 'NeurAI Platform', to: '/ai-platform' },
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
];

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const OverlayNav = () => {
  const [open, setOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
    setExiting(false);
  }, [location.pathname]);

  const handleNavigate = useCallback(
    (to: string) => {
      setExiting(true);
      setTimeout(() => {
        setOpen(false);
        setExiting(false);
        if (to.startsWith('/#')) {
          navigate('/');
          setTimeout(() => {
            const id = to.replace('/#', '');
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          navigate(to);
        }
      }, 400);
    },
    [navigate]
  );

  // Flatten for stagger index
  let linkIdx = 0;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center transition-opacity duration-300 hover:opacity-70 active:scale-[0.98]"
        aria-label="Open menu"
      >
        <Menu size={20} strokeWidth={1.2} className="text-foreground" />
      </button>

      {/* Full-screen overlay — z-[9999] to sit above everything */}
      <div
        className="fixed inset-0 flex h-screen min-h-screen flex-col bg-background"
        style={{
          zIndex: 9999,
          transform: open ? 'translateY(0)' : 'translateY(-100%)',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform 500ms cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        }}
      >
        {/* Top bar — mirrors Navbar height */}
        <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-between px-6">
          <span
            className="text-base font-semibold tracking-tight text-foreground"
            style={{ fontFamily: sfPro }}
          >
            Neurolab
          </span>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center justify-center transition-opacity duration-300 hover:opacity-70 active:scale-[0.98]"
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={1.2} className="text-foreground" />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-auto w-full max-w-6xl px-6">
          <div style={{ borderBottom: '0.5px solid hsl(213 27% 84%)' }} />
        </div>

        {/* Nav content — centered */}
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-16 sm:grid-cols-2">
            {navSections.map((section) => (
              <div key={section.title}>
                <p
                  className="mb-6 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
                  style={{
                    opacity: open && !exiting ? 1 : 0,
                    transform: open && !exiting ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'all 500ms cubic-bezier(0.25, 0.1, 0.25, 1.0)',
                    transitionDelay: open && !exiting ? '100ms' : '0ms',
                  }}
                >
                  {section.title}
                </p>
                <div className="space-y-5">
                  {section.links.map((link) => {
                    const idx = linkIdx++;
                    const isActive = location.pathname === link.to || (link.to.startsWith('/#') && location.pathname === '/');
                    return (
                      <button
                        key={link.label}
                        onClick={() => handleNavigate(link.to)}
                        className="group flex w-full items-center gap-3 text-left transition-all duration-[600ms] active:scale-[0.98]"
                        style={{
                          opacity: open && !exiting ? 1 : 0,
                          transform: open && !exiting ? 'translateY(0)' : 'translateY(12px)',
                          transitionDelay: open && !exiting ? `${150 + idx * 60}ms` : '0ms',
                          transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
                        }}
                      >
                        <span
                          className="text-2xl font-medium tracking-tight sm:text-3xl"
                          style={{
                            fontFamily: sfPro,
                            letterSpacing: '-0.03em',
                            color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--foreground))',
                            opacity: isActive ? 1 : 0.6,
                          }}
                        >
                          {link.label}
                        </span>
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.2}
                          className="text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mx-auto w-full max-w-6xl px-6 pb-8">
          <div style={{ borderTop: '0.5px solid hsl(213 27% 84%)' }} />
          <div className="flex items-center justify-between pt-6">
            <p className="text-xs tabular-nums text-muted-foreground">
              © {new Date().getFullYear()} Neurolab Inc.
            </p>
            <p className="text-xs text-muted-foreground">
              hello@neurolab.cc
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverlayNav;
