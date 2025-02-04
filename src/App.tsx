import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Prompts from "@/pages/Prompts";
import History from "@/pages/History";
import Accounts from "@/pages/Accounts";
import AppAccount from "@/pages/AppAccount";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import SocialMedia from "@/pages/SocialMedia";
import EmailBroadcast from "@/pages/EmailBroadcast";
import Newsletter from "@/pages/Newsletter";
import Article from "@/pages/Article";
import VideoTranscription from "@/pages/VideoTranscription";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

function App() {
  return (
    <Router>
      <Navigation />
      <main className="mt-10 md:mt-16">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/history" element={<History />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/app-account" element={<AppAccount />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/social-media" element={<SocialMedia />} />
          <Route path="/email-broadcast" element={<EmailBroadcast />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/article" element={<Article />} />
          <Route path="/transcribe" element={<VideoTranscription />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster />
      <SonnerToaster position="bottom-right" />
    </Router>
  );
}

export default App;