import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Shield, Target, Globe, Star, Award, Heart, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChooseUsSection() {
  const reasons = [
    {
      icon: Trophy,
      title: "World-Class Methodology",
      description: "Proven training systems developed by international cricket experts and continuously refined through global best practices.",
      color: "bg-amber-500",
      stats: "Used by 10,000+ players"
    },
    {
      icon: Globe,
      title: "Global Standards, Local Touch",
      description: "International coaching excellence delivered by certified local coaches who understand your regional cricket pathways.",
      color: "bg-emerald-500",
      stats: "5 countries, 1 standard"
    },
    {
      icon: Zap,
      title: "Innovation & Technology",
      description: "AI-powered video analysis, performance tracking, and digital progress reports keep players ahead of the curve.",
      color: "bg-blue-500",
      stats: "Latest cricket tech"
    },
    {
      icon: TrendingUp,
      title: "Proven Track Record",
      description: "Our alumni have progressed to state teams, national academies, and professional cricket worldwide.",
      color: "bg-purple-500",
      stats: "300+ pathway graduates"
    }
  ];

  const achievements = [
    { number: "95%", label: "Player Retention Rate", detail: "Kids love coming back" },
    { number: "4.9/5", label: "Average Rating", detail: "From global families" },
    { number: "85%", label: "Skill Improvement", detail: "Measured progress" },
    { number: "200+", label: "School Partnerships", detail: "Worldwide network" }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 mb-4 px-4 py-2">
            <Award className="w-4 h-4 mr-2" />
            Why Cricket Cadets?
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Building the 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
              most trusted cricket academy 
            </span>
            <br />
            for the next generation of players.
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
           Be part of the global movement shaping young cricketers with Cricket Cadets — the academy trusted by families worldwide.
          </p>
        </motion.div>

        {/* Achievement Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-3xl md:text-4xl font-black text-emerald-600 mb-2">
                  {achievement.number}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">{achievement.label}</h4>
                <p className="text-sm text-gray-600">{achievement.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 ${reason.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <reason.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h4>
                      <p className="text-gray-600 leading-relaxed mb-3">{reason.description}</p>
                      <Badge variant="outline" className="text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        {reason.stats}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Global Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Families Worldwide
            </h3>
            <p className="text-lg text-white/90 leading-relaxed mb-8">
              From Australia to Canada, the UK to New Zealand - Cricket Cadets is the global choice 
              for parents who want the very best cricket education for their children.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge className="bg-white/20 text-white hover:bg-white/30 px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                10,000+ Happy Families
              </Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30 px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                5 Countries & Growing
              </Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Child Safety Certified
              </Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}