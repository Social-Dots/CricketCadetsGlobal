import React, { useState } from 'react';
import { motion } from 'framer-motion';

import HeroSection from '../components/development/HeroSection';
import ProgramPhilosophy from '../components/development/ProgramPhilosophy';
import WhatTheyLearn from '../components/development/WhatTheyLearn';
import AWeekInTheLife from '../components/development/AWeekInTheLife';
import RegistrationForm from '../components/landing/RegistrationForm';
import CallToAction from '../components/development/CallToAction';

export default function DevelopmentPrograms() {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection onRegisterClick={() => setShowRegistration(true)} />
      <ProgramPhilosophy />
      <WhatTheyLearn />
      <AWeekInTheLife />
      <CallToAction onRegisterClick={() => setShowRegistration(true)} />

      <RegistrationForm
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
      />
    </div>
  );
}