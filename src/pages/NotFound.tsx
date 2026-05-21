import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowLeft, Terminal } from "lucide-react";

const sfPro =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const NotFound = () => {
  const location = useLocation();
  const { ref, isVisible } = useScrollReveal(0.1);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO
        title="404 - Page not found"
        description="We couldn’t find the page you are looking for."
        noindex
      />
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div
          ref={ref}
          className="w-full max-w-lg text-center transition-all duration-[800ms]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
          }}
        >
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary"
            style={{ border: '0.5px solid hsl(213 27% 84%)' }}>
            <Terminal size={24} strokeWidth={1.2} className="text-muted-foreground" />
          </div>

          <h1
            className="mb-4 text-foreground"
            style={{
              fontFamily: sfPro,
              fontSize: "clamp(48px, 8vw, 84px)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            404
          </h1>

          <p className="mx-auto mb-10 max-w-[320px] text-base leading-relaxed text-muted-foreground">
            Oops! The page you tried to visit doesn’t exist yet or the link might be outdated.
            Please check the address or go back to the home page to continue.
          </p>

          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-6 text-sm font-medium text-white transition-all duration-500 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              background: "hsl(var(--foreground))",
              transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
            }}
          >
            <ArrowLeft size={16} strokeWidth={1.2} />
            Return to Core
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
