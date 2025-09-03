import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Global Components for the main landing page
import GlobalHeroSection from '../components/global/GlobalHeroSection';
import OurStorySection from '../components/global/OurStorySection';
import GlobalProgramsOverview from '../components/global/GlobalProgramsOverview';
import WhyChooseUsSection from '../components/global/WhyChooseUsSection';
import GlobalCoachesSection from '../components/global/GlobalCoachesSection';
import VideoTestimonialsSection from '../components/global/VideoTestimonialsSection';
import CountrySelectorSection from '../components/global/CountrySelectorSection';
import RegistrationForm from '../components/landing/RegistrationForm';

export default function Home() {
  const [showRegistration, setShowRegistration] = useState(false);

  React.useEffect(() => {
    const handleShowRegistration = () => {
      setShowRegistration(true);
    };

    window.addEventListener('showRegistration', handleShowRegistration);

    return () => {
      window.removeEventListener('showRegistration', handleShowRegistration);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <GlobalHeroSection onRegisterClick={() => setShowRegistration(true)} />
      <OurStorySection />
      <GlobalProgramsOverview />
      <WhyChooseUsSection />
      <GlobalCoachesSection />
      <VideoTestimonialsSection />
      <CountrySelectorSection />
      
      <RegistrationForm
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
      />
    </div>
  );
}