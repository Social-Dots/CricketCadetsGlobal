import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Globe, Shield, Star, Target, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OurStorySection() {
  return (
    <section id="about-us" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 hover:from-emerald-200 hover:to-emerald-300 mb-6 px-6 py-3 text-lg border-0">
            <Star className="w-5 h-5 mr-2" />
            Our Story
          </Badge>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              Australian Excellence
            </span>
            <br />
            Global Opportunity
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Founded where cricket lives and breathes, now serving young players worldwide
          </p>
        </motion.div>

        {/* Mission Statement with Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 p-12 md:p-16">
            
            <div className="relative z-10 text-center text-white">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Our Mission
              </h3>
              <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto font-light">
                Every aspiring cricketer deserves access to world-class training and mentorship, 
                <br className="hidden md:block" />
                <strong>no matter where they play.</strong>
              </p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}