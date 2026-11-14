import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowLeft, Terminal } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { ref, isVisible } = useScrollReveal(0.1);

  useEffect(() => {
    console.error(
      "404 Error: Route does not exist:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      <SEO
        title="404 - Page not found"
        description="We couldn’t find the page you are looking for."
        noindex
      />
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div
          ref={ref}
          className="w-full max-w-lg text-center transition-all duration-[600ms]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
          }}
        >
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary border border-border/80 text-primary">
            <Terminal size={26} strokeWidth={1.5} />
          </div>

          <h1 className="mb-4 text-6xl sm:text-7xl font-extrabold tracking-tight text-foreground leading-none">
            404
          </h1>

          <p className="mx-auto mb-8 max-w-sm text-base leading-relaxed text-muted-foreground">
            The neural pathway or page you requested does not exist or has been relocated.
          </p>

          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold bg-primary text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            Return to Core
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
