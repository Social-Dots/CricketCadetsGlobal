import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Users, Trophy, Star, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { getDevelopmentPhilosophy } from '@/lib/supabase';

export default function ProgramPhilosophy() {
  const [principles, setPrinciples] = useState([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping for dynamic content
  const iconMap = {
    'Heart': Heart,
    'Users': Users,
    'Shield': Shield,
    'Trophy': Trophy,
    'Star': Star,
    'Target': Target
  };

  // Default principles as fallback
  const defaultPrinciples = [
    { 
      icon: "Heart", 
      title: "Fun First", 
      description: "Creating positive memories is our top priority. We foster joy in every drill and game, ensuring cricket becomes a lifelong passion.", 
      color: "text-red-500",
      bgGradient: "from-red-400 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    { 
      icon: "Users", 
      title: "Team Spirit", 
      description: "Learning to be a great teammate is as important as learning to bat or bowl. We build friendships that last beyond the field.", 
      color: "text-blue-500",
      bgGradient: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    { 
      icon: "Shield", 
      title: "Build Confidence", 
      description: "A safe, supportive space where every child is encouraged to try their best and grow. Mistakes are learning opportunities.", 
      color: "text-emerald-500",
      bgGradient: "from-emerald-400 to-green-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    { 
      icon: "Trophy", 
      title: "Celebrate Effort", 
      description: "We recognize hard work and personal progress, not just winning. Every improvement deserves recognition and celebration.", 
      color: "text-amber-500",
      bgGradient: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    }
  ];

  useEffect(() => {
    const fetchPhilosophy = async () => {
      try {
        const data = await getDevelopmentPhilosophy();
        if (data && data.length > 0) {
          setPrinciples(data);
        } else {
          setPrinciples(defaultPrinciples);
        }
      } catch (error) {
        console.error('Error fetching philosophy:', error);
        setPrinciples(defaultPrinciples);
      } finally {
        setLoading(false);
      }
    };

    fetchPhilosophy();
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-red-500 rounded-full blur-2xl"></div>
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
            🎯 OUR APPROACH
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-emerald-700 to-blue-700 bg-clip-text text-transparent mb-6 leading-tight">
            Our Coaching Philosophy
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We believe in nurturing young talent by focusing on what matters most at this age - 
            building character, confidence, and a genuine love for the beautiful game of cricket.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((principle, index) => {
            const IconComponent = iconMap[principle.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className={`h-full hover:shadow-2xl transition-all duration-500 border-2 ${principle.borderColor} ${principle.bgColor} group overflow-hidden relative`}>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${principle.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <CardContent className="p-8 text-center relative z-10">
                    <motion.div 
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-6 ${principle.color} group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent size={36} strokeWidth={2.5} />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                      {principle.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {principle.description}
                    </p>
                    
                    {/* Decorative element */}
                    <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${principle.color.replace('text-', 'bg-')} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}