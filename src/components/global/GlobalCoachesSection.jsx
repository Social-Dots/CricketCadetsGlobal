import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Trophy, Users, Target, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GlobalCoachesSection() {
  const globalMentors = [
    {
      name: "Fawad Ahmed",
      title: "Former Australian International Spinner",
      achievement: "Former Victorian Bushranger",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialties: ["Spin Bowling", "Mental Strength", "International Experience"],
      quote: "Cricket is not just about technique - it's about building character and confidence that lasts a lifetime."
    },
    {
      name: "Peter Bol",
      title: "Olympic Middle-Distance Runner",
      achievement: "Tokyo 2020 Olympian",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialties: ["Mental Conditioning", "Peak Performance", "Resilience Training"],
      quote: "The mindset that makes champions in athletics translates perfectly to cricket excellence."
    },
    {
      name: "Bachar Houli",
      title: "AFL Premiership Champion",
      achievement: "Richmond Tigers Legend",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialties: ["Leadership", "Team Building", "Community Engagement"],
      quote: "Sport teaches us values that extend far beyond the field - respect, teamwork, and perseverance."
    },
    {
      name: "Mohamed Irfan",
      title: "Former Hockey Australia Captain",
      achievement: "International Hockey Star",
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      specialties: ["Strategy & Tactics", "Captaincy", "International Experience"],
      quote: "Great athletes are made through dedication, proper guidance, and believing in yourself."
    }
  ];

  return (
    <section id="global-coaches" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-amber-500 text-amber-900 hover:bg-amber-400 mb-4 px-4 py-2">
            <Trophy className="w-4 h-4 mr-2" />
            Our Coaches & Mentors
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Learn from the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              {" "}Best in the Game
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our international coaching team includes accredited cricket specialists and celebrated sports icons. 
            We combine expert coaching with elite mentoring to develop well-rounded cricketers both on and off the field.
          </p>
        </motion.div>

        {/* Global Mentors Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {globalMentors.map((mentor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-500 hover:-translate-y-3 overflow-hidden group">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-6">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-500/30 group-hover:ring-amber-500/50 transition-all duration-300"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-white mb-1">
                        {mentor.name}
                      </CardTitle>
                      <p className="text-amber-400 font-semibold mb-1">{mentor.title}</p>
                      <Badge variant="outline" className="border-emerald-500 text-emerald-400 text-xs">
                        {mentor.achievement}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="relative">
                    <Quote className="w-6 h-6 text-amber-400/30 absolute -top-1 -left-1" />
                    <p className="text-gray-300 italic leading-relaxed pl-6 text-sm">
                      "{mentor.quote}"
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3 text-sm">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.specialties.map((specialty, idx) => (
                        <Badge key={idx} className="bg-gray-700 text-gray-300 hover:bg-gray-600 text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-900/50 to-amber-900/50 rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            World-Class Expertise at Every Level
          </h3>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Beyond our celebrity mentors, Cricket Cadets employs certified coaches in every region, 
            ensuring consistent, high-quality instruction that aligns with local cricket pathways 
            while maintaining our global standards of excellence.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-amber-900" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Certified Coaches</h4>
              <p className="text-gray-300 text-sm">All coaches hold national certifications in their respective countries</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Local Expertise</h4>
              <p className="text-gray-300 text-sm">Understanding of regional cricket pathways and development systems</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Continuous Development</h4>
              <p className="text-gray-300 text-sm">Regular training and upskilling to maintain coaching excellence</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}