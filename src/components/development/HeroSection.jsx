import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection({ onRegisterClick }) {
  const title = "Where Fun Meets Fundamentals";
  const letters = Array.from(title);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03 } }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.icc-cricket.com/image/upload/t_ratio16_9-size30-webp/prd/ekplqm9uptgbtauwpqm7"
          alt="Kids playing cricket"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0  via-white/80 to-transparent"></div>
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
          <Badge className="bg-amber-400 text-amber-900 hover:bg-amber-500 mb-6 px-4 py-2 text-base shadow-lg">
            <Sparkles className="w-5 h-5 mr-2" />
            Development Programs (Ages 8-12)
          </Badge>
          
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
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
            Our programs for young players build a lifelong love for cricket through engaging activities, positive coaching, and play-based learning.
          </p>

          <Button
            onClick={onRegisterClick}
            className="group bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
          >
            Enroll for a Camp
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}