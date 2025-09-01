import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Users, Zap, Trophy, Star, Activity } from 'lucide-react';

export default function WhatTheyLearn() {
  const skillCategories = [
    {
      title: "Cricket Fundamentals",
      icon: Target,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      gradientFrom: "from-emerald-400",
      gradientTo: "to-green-500",
      skills: [
        "Proper grip & stance techniques",
        "Basic batting strokes & footwork", 
        "Introduction to bowling actions", 
        "Safe catching & fielding techniques",
        "Understanding cricket equipment"
      ]
    },
    {
      title: "Game Sense & Strategy",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      gradientFrom: "from-blue-400",
      gradientTo: "to-indigo-500",
      skills: [
        "Understanding field positions",
        "Running between wickets safely",
        "Basics of scoring & match awareness",
        "Rules of the game & fair play",
        "Team communication & signals"
      ]
    },
    {
      title: "Physical Development",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      gradientFrom: "from-purple-400",
      gradientTo: "to-pink-500",
      skills: [
        "Agility & coordination drills",
        "Balance & speed development",
        "Throwing & catching accuracy",
        "Team-based fitness games",
        "Flexibility & injury prevention"
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-emerald-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-48 h-48 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/2 w-28 h-28 bg-purple-500 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            📚 LEARNING CURRICULUM
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-emerald-700 to-blue-700 bg-clip-text text-transparent mb-6 leading-tight">
            What Your Cadet Will Learn
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our comprehensive curriculum is designed to be age-appropriate and engaging, 
            covering essential cricket skills while building character and confidence in a fun, supportive environment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -15,
                  transition: { duration: 0.3 }
                }}
              >
                <div className={`bg-white rounded-3xl shadow-xl p-8 h-full border-2 ${category.borderColor} ${category.bgColor} group overflow-hidden relative transition-all duration-500 hover:shadow-2xl`}>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Header with icon */}
                  <div className="relative z-10 mb-8">
                    <motion.div 
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg mb-4 ${category.color} group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent size={32} strokeWidth={2.5} />
                    </motion.div>
                    
                    <h3 className={`text-2xl font-bold ${category.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                      {category.title}
                    </h3>
                    
                    {/* Decorative line */}
                    <div className={`w-12 h-1 bg-gradient-to-r ${category.gradientFrom} ${category.gradientTo} rounded-full group-hover:w-16 transition-all duration-300`}></div>
                  </div>
                  
                  {/* Skills list */}
                  <ul className="space-y-4 relative z-10">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.li 
                        key={skill} 
                        className="flex items-start group/item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex-shrink-0 mr-3 mt-1">
                          <CheckCircle className="w-5 h-5 text-amber-500 group-hover/item:text-amber-600 group-hover/item:scale-110 transition-all duration-200" />
                        </div>
                        <span className="text-gray-700 group-hover/item:text-gray-800 transition-colors duration-200 leading-relaxed">
                          {skill}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* Bottom decorative element */}
                  <div className={`absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo} opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all duration-300`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}