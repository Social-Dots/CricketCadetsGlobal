
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Trophy, Globe, Star, Target, Play, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { getHomepageHeroSection } from '@/lib/supabase';

export default function GlobalHeroSection({ onRegisterClick }) {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await getHomepageHeroSection();
        setHeroData(data);
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-emerald-900/95 via-emerald-800/90 to-amber-900/85">
        <div className="text-center text-white">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded w-64 mx-auto mb-4"></div>
            <div className="h-16 bg-white/20 rounded w-96 mx-auto mb-6"></div>
            <div className="h-6 bg-white/20 rounded w-full max-w-2xl mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-emerald-800/90 to-amber-900/85`} style={{ opacity: heroData?.overlay_opacity || 0.8 }}></div>
        <img
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Cricket training ground"
          className="w-full h-full object-cover opacity-60" />

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-32 h-32 border-4 border-amber-400/20 rounded-full" />

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-20 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl" />

        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>

          {/* Modern Badge with Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-8">

            {heroData?.badge_text && (
              <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 hover:from-amber-400 hover:to-amber-500 mb-6 px-8 py-4 text-lg border-0 shadow-2xl">
                <Globe className="w-6 h-6 mr-3" />
                {heroData.badge_text}
              </Badge>
            )}
          </motion.div>
          
          {/* Hero Title with Modern Typography */}
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            {heroData?.title ? (
              <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                {heroData.title}
              </span>
            ) : (
              <>
                <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                  Cricket
                </span>
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
                  Cadets
                </span>
              </>
            )}
          </h1>
          
          {/* Subtitle */}
          {heroData?.subtitle && (
            <p className="text-2xl md:text-3xl text-emerald-100/90 max-w-4xl mx-auto mb-6 leading-relaxed font-light">
              {heroData.subtitle}
            </p>
          )}
          
          {heroData?.description && (
            <p className="text-lg md:text-xl text-emerald-200/80 max-w-3xl mx-auto mb-12">
              {heroData.description}
            </p>
          )}

          {/* CTA Buttons with Modern Design */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            {heroData?.cta_primary_text && (
              <Button
                onClick={heroData?.cta_primary_link ? () => window.location.href = heroData.cta_primary_link : onRegisterClick}
                className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-900 font-bold px-10 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 border-0">
                <Trophy className="w-6 h-6 mr-3" />
                {heroData.cta_primary_text}
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
            
            {heroData?.cta_secondary_text && (
              <Button
                variant="outline"
                className="group border-2 border-white/30 text-black hover:bg-white/10 backdrop-blur-sm font-bold px-10 py-6 text-xl rounded-2xl transition-all duration-300 hover:border-white/50"
                onClick={() => {
                  if (heroData?.cta_secondary_link) {
                    window.location.href = heroData.cta_secondary_link;
                  } else {
                    document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>
                <Play className="w-6 h-6 mr-3" />
                {heroData.cta_secondary_text}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Enhanced Global Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">

          {[
          { label: "Global", icon: Globe, detail: "Presence" },
          { label: "Players", icon: Users, detail: "Worldwide" },
          { label: "Elite Coaches", icon: Award, detail: "Certified" },
          { label: "Partnerships", icon: Trophy, detail: "Schools & Clubs" }].
          map((stat, index) =>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }} className="bg-white/10 mb-12 px-8 py-8 backdrop-blur-md rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300">


              <stat.icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-emerald-200 text-sm font-medium">{stat.label}</div>
              <div className="text-emerald-300/70 text-xs">{stat.detail}</div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>);

}