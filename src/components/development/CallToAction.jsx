import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';
import { getDevelopmentCTA } from '@/lib/supabase';

export default function CallToAction({ onRegisterClick }) {
  const [ctaData, setCtaData] = useState({
    title: "Ready to Start the Adventure?",
    description: "Spots in our popular development camps fill up fast. Secure your child's place today and give them a summer of cricket they'll never forget!",
    buttonText: "Join a Camp"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCTA = async () => {
      try {
        const data = await getDevelopmentCTA();
        if (data) {
          setCtaData({
            title: data.cta_title || "Ready to Start the Adventure?",
            description: data.cta_description || "Spots in our popular development camps fill up fast. Secure your child's place today and give them a summer of cricket they'll never forget!",
            buttonText: data.cta_button_text || "Join a Camp"
          });
        }
      } catch (error) {
        console.error('Error fetching CTA data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCTA();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: 'spring' }}
          viewport={{ once: true }}
        >
          <div className="w-20 h-20 bg-amber-400 text-amber-900 rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-12">
            <PartyPopper className="w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            {ctaData.title}
          </h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-10">
            {ctaData.description}
          </p>
          <Button
            onClick={onRegisterClick}
            className="group bg-white hover:bg-amber-100 text-emerald-700 font-bold px-10 py-6 text-xl rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
          >
            {ctaData.buttonText}
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}