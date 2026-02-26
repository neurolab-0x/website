import { Link } from 'react-router-dom';
import OverlayNav from './OverlayNav';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-[20px]" style={{ borderBottom: '0.5px solid hsl(var(--border))' }}>
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="text-base font-semibold tracking-tight text-foreground">
          Neurolab
        </Link>
        <div className="flex items-center gap-8">
          {[
            { label: 'Technology', href: '/#technology' },
            { label: 'Research', href: '/#research' },
            { label: 'Product', href: '/' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hidden text-sm text-muted-foreground transition-opacity duration-300 hover:opacity-70 sm:inline"
            >
              {item.label}
            </a>
          ))}
          <OverlayNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
