
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import pages
import Index from "@/pages/Index";
import CreateQuiz from "@/pages/CreateQuiz";
import DailyQuiz from "@/pages/DailyQuiz";
import QuizPlay from "@/pages/QuizPlay";
import About from "@/pages/About";
import Developer from "@/pages/Developer";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Disclaimer from "@/pages/Disclaimer";
import CookiesPolicy from "@/pages/CookiesPolicy";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="/daily-quiz" element={<DailyQuiz />} />
            <Route path="/quiz/:quizId" element={<QuizPlay />} />
            <Route path="/about" element={<About />} />
            <Route path="/developer" element={<Developer />} />
            
            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
