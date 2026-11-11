import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SurgicalLoader from "@/components/SurgicalLoader";
import ScrollToHash from "@/components/ScrollToHash";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Careers from "./pages/Careers";
import RoleDetail from "./pages/RoleDetail";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SurgicalLoader />
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:slug" element={<RoleDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contacts" element={<Navigate to="/contact" replace />} />
          <Route path="/secure-access" element={<Navigate to="/#waitlist" replace />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <CookieConsent />
    </TooltipProvider>
  </HelmetProvider>
);

export default App;
