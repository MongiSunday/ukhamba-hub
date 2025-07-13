
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import GetInvolved from "./pages/GetInvolved";
import CorporatePartnerships from "./pages/CorporatePartnerships";
import ProgramSponsorships from "./pages/ProgramSponsorships";
import GrantCollaborations from "./pages/GrantCollaborations";
import Donations from "./pages/Donations";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ProgramDetailPage from "./pages/ProgramDetail";

// Create a client
const queryClient = new QueryClient();

const ScrollToTopHandler = () => {
  useScrollToTop();
  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTopHandler />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:programId" element={<ProgramDetailPage />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/corporate-partnerships" element={<CorporatePartnerships />} />
            <Route path="/program-sponsorships" element={<ProgramSponsorships />} />
            <Route path="/grant-collaborations" element={<GrantCollaborations />} />
            <Route path="/donate" element={<Donations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
