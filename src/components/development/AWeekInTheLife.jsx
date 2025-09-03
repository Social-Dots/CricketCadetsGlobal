import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Shield, Users, Trophy, Clock, Target } from 'lucide-react';
import { getDevelopmentTimeline } from '@/lib/supabase';

export default function AWeekInTheLife() {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Icon mapping for dynamic content
  const iconMap = {
    Sun, Shield, Users, Trophy, Clock, Target
  };
  
  // Default timeline data as fallback
  const defaultTimeline = [
    { 
      icon: "Sun", 
      title: "Dynamic Warm-Up Sessions", 
      description: "Energizing start with cricket-specific movements, agility drills, and team-building activities to prepare body and mind for training.", 
      time: "9:00 AM - 9:30 AM",
      color: "from-orange-400 to-yellow-500",
      bgColor: "bg-orange-50"
    },
    { 
      icon: "Target", 
      title: "Technical Skill Development", 
      description: "Focused coaching on batting technique, bowling accuracy, and fielding fundamentals through progressive skill-building exercises.", 
      time: "9:30 AM - 11:00 AM",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50"
    },
    { 
      icon: "Shield", 
      title: "Tactical Training Stations", 
      description: "Rotating through specialized stations covering match scenarios, strategic thinking, and position-specific skills development.", 
      time: "11:15 AM - 12:30 PM",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50"
    },
    { 
      icon: "Users", 
      title: "Competitive Match Play", 
      description: "Applying learned skills in structured mini-matches with real-time coaching feedback and tactical guidance.", 
      time: "1:30 PM - 2:45 PM",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50"
    },
    { 
      icon: "Clock", 
      title: "Mental Skills & Recovery", 
      description: "Focus on concentration techniques, match psychology, and proper cool-down routines for peak performance.", 
      time: "2:45 PM - 3:15 PM",
      color: "from-teal-400 to-cyan-500",
      bgColor: "bg-teal-50"
    },
    { 
      icon: "Trophy", 
      title: "Achievement Recognition", 
      description: "Celebrating individual progress, team achievements, and setting goals for continued development beyond the program.", 
      time: "3:15 PM - 3:45 PM",
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50"
    }
  ];
  
  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const data = await getDevelopmentTimeline();
        if (data && Array.isArray(data)) {
          setTimeline(data);
        } else {
          setTimeline(defaultTimeline);
        }
      } catch (error) {
        console.error('Error fetching timeline data:', error);
        setTimeline(defaultTimeline);
      } finally {
        setLoading(false);
      }
    };

    fetchTimelineData();
  }, []);

  const lineVariants = {
    hidden: { height: 0 },
    visible: { height: '100%', transition: { duration: 1, ease: 'easeOut' } }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            📅 DAILY SCHEDULE
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-green-700 to-blue-700 bg-clip-text text-transparent mb-6 leading-tight">
            A Day in Our Training Program
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience our comprehensive daily structure designed to maximize skill development, 
            build confidence, and create lasting cricket memories through expert coaching and engaging activities.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
        <div className="relative">
          {/* Enhanced Timeline Line */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="absolute left-8 md:left-1/2 w-1 bg-gradient-to-b from-green-400 via-blue-400 to-purple-400 h-full -translate-x-1/2 shadow-lg"
          />

          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className={`mb-16 flex items-center w-full relative ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${
                  isEven ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <motion.div
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                    }}
                    className={`${item.bgColor} rounded-2xl shadow-xl p-8 border border-white/50 backdrop-blur-sm relative overflow-hidden group`}
                  >
                    {/* Card Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-semibold shadow-lg`}>
                          {iconMap[item.icon] && React.createElement(iconMap[item.icon], { className: "w-4 h-4 mr-2" })}
                          {item.time}
                        </div>
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {iconMap[item.icon] && React.createElement(iconMap[item.icon], { className: "w-6 h-6" })}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-700 leading-relaxed text-base">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-20">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.15 + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="w-6 h-6 bg-white rounded-full border-4 border-gray-200 shadow-lg"></div>
                    <div className={`absolute inset-0 w-6 h-6 bg-gradient-to-br ${item.color} rounded-full animate-pulse opacity-75`}></div>
                  </motion.div>
                </div>

                {/* Spacer for desktop layout */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}