import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Target, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Heart,
  Zap,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BootcampIntroSection() {
  const features = [
    {
      icon: Trophy,
      title: "World-Class Training",
      description: "Proven methodologies from Australia's leading cricket academies, now adapted for Canadian players.",
      color: "text-amber-500"
    },
    {
      icon: Target,
      title: "Skill-Focused Development",
      description: "Structured programs targeting batting, bowling, fielding, and mental game development.",
      color: "text-emerald-500"
    },
    {
      icon: Users,
      title: "Expert Coaching Team",
      description: "International coaches working alongside local Canadian cricket champions.",
      color: "text-blue-500"
    },
    {
      icon: Heart,
      title: "Passion-First Approach",
      description: "Building love for the game while developing technical excellence and confidence.",
      color: "text-red-500"
    }
  ];

  const highlights = [
    "Ages 6-18 welcome",
    "All skill levels accepted",
    "Small group training",
    "Individual attention",
    "Performance tracking",
    "Character development"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 mb-4">
            🇨🇦 Canadian Cricket Development
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Cricket Bootcamps
            <span className="block text-emerald-600">Built for Canada</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're bringing Australia's most successful youth cricket development program to Canada. 
            Our bootcamps combine world-class training with a deep understanding of the Canadian cricket landscape.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Why Cricket Cadets Canada?
            </h3>
            
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-3 rounded-full bg-gray-100 ${feature.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right - Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-emerald-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Program Highlights</CardTitle>
                    <p className="text-emerald-100">What makes us different</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-4">
                  {highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-emerald-600" />
                    <h4 className="text-lg font-semibold text-emerald-800">
                      Our Commitment
                    </h4>
                  </div>
                  <p className="text-emerald-700 leading-relaxed">
                    Every young cricketer deserves access to world-class training. 
                    We're committed to making cricket development accessible, enjoyable, 
                    and transformative for Canadian youth.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="p-6">
            <div className="text-4xl font-bold text-emerald-600 mb-2">15+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-emerald-600 mb-2">10,000+</div>
            <div className="text-gray-600">Players Trained</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-emerald-600 mb-2">200+</div>
            <div className="text-gray-600">Certified Coaches</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-emerald-600 mb-2">5</div>
            <div className="text-gray-600">Countries</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}