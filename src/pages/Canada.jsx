import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Target,
  Users,
  MapPin,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Calendar,
  Clock,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

// Components specifically for the Canadian page
import HeroSection from '../components/landing/canada/HeroSection';
import BootcampIntroSection from '../components/landing/canada/BootcampIntroSection';
import PlansSection from '../components/landing/canada/PlansSection';
import AIPerformanceSection from '../components/landing/canada/AIPerformanceSection';
import CoachesSection from '../components/landing/canada/CoachesSection';
import LocationsSection from '../components/landing/canada/LocationsSection';
import RegistrationForm from '../components/landing/RegistrationForm';

export default function Canada() {
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
      <HeroSection onRegisterClick={() => setShowRegistration(true)} />
      <BootcampIntroSection />
      <PlansSection onRegisterClick={() => setShowRegistration(true)} />
      <AIPerformanceSection />
      <CoachesSection />
      <LocationsSection />
      <RegistrationForm
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
      />
    </div>
  );
}