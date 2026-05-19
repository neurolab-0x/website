import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SurgicalLoader from "@/components/SurgicalLoader";
import ScrollToHash from "@/components/ScrollToHash";
import CookieConsent from "./components/CookieConsent";

const Index = lazy(() => import("./pages/Index"));
const Shop = lazy(() => import("./pages/Shop"));
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));
const RoleDetail = lazy(() => import("./pages/RoleDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const AIPlatform = lazy(() => import("./pages/AIPlatform"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Docs = lazy(() => import("./pages/Docs"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteLoadingFallback = () => (
  <div className="surgical-loader" aria-hidden="true">
    <div className="surgical-loader-bar" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SurgicalLoader />
        <ScrollToHash />
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:slug" element={<RoleDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contacts" element={<Contact />} />
            <Route path="/secure-access" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/ai-platform" element={<AIPlatform />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <CookieConsent />
    </TooltipProvider>
  </HelmetProvider>
);

export default App;
