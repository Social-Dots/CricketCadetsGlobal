import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { getDevelopmentHeroSection } from '@/lib/supabase';

export default function HeroSection({ onRegisterClick }) {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await getDevelopmentHeroSection();
        setHeroData(data);
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);
  
  const title = heroData?.title || "Where Fun Meets Fundamentals";
  const letters = Array.from(title);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03 } }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-16 bg-gray-300 rounded w-96 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-300 rounded w-full max-w-2xl mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroData?.background_image || "https://cricmax.com/wp-content/uploads/2025/03/A-young-child.webp"}
          alt="Kids playing cricket"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute " style={{ opacity: heroData?.overlay_opacity || 0.8 }}></div>
      </div>

      {/* Animated background shapes */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -left-20 w-72 h-72 bg-amber-200/50 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-200/50 rounded-full blur-2xl"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {heroData?.badge_text && (
            <Badge className="bg-amber-400 text-amber-900 hover:bg-amber-500 mb-6 px-4 py-2 text-base shadow-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              {heroData.badge_text}
            </Badge>
          )}
          
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-black text-gray-900 mb-6"
          >
            {letters.map((letter, index) => (
              <motion.span key={index} variants={letterVariants}>
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
          
          {heroData?.subtitle && (
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-6">
              Be the part of the next-gen cricket family — where passion meets innovation, young talent grows with global mentorship, and every player is prepared to shine on and off the field.
            </p>
          )}
          

          <Button
            onClick={heroData?.cta_primary_link ? () => window.location.href = heroData.cta_primary_link : onRegisterClick}
            className="group bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
          >
            {heroData?.cta_primary_text || "Enroll for a Camp"}
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}