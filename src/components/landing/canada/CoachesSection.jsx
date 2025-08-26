import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Trophy, Users, Target, Shield, Heart, Globe, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CoachesSection() {
  const coaches = [
    {
      name: "?",
      title: "Youth Development Specialist",
      experience: "15+ years in youth cricket",
      specialties: ["Making Learning Fun", "Building Confidence", "Technique for Kids"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "We are bringing a proven, passion-first approach to Canada. Our focus is on nurturing the love for the game while building world-class skills."
    },
    {
      name: "?",
      title: "Local Cricket Champion",
      experience: "12+ years in Canadian cricket",
      specialties: ["Local Talent ID", "Team Building", "Skill Development"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "This collaboration is a dream come true for Canadian cricket. Our kids deserve the world's best techniques, delivered with a true understanding of their unique journey."
    },
    {
      name: "?",
      title: "International Technique Expert",
      experience: "10+ years professional background",
      specialties: ["Proven Techniques", "Individual Growth", "Passion Development"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "I believe in combining proven techniques with a genuine love for the game. When kids are passionate, learning becomes magical. I can't wait to see that spark in Canada."
    }
  ];

  const coachingPhilosophy = [
    {
      icon: Heart,
      title: "Kids Come First",
      description: "Every decision, drill, and moment is designed around what's best for young Canadian learners."
    },
    {
      icon: Trophy,
      title: "Growth Over Perfection",
      description: "We celebrate progress, effort, and the joy of learning new skills together."
    },
    {
      icon: Shield,
      title: "Safe & Supportive",
      description: "Creating a uniquely Canadian environment where kids feel confident to try, fail, and try again."
    },
    {
      icon: Globe,
      title: "Best of Both Worlds",
      description: "Fusing Australian cricket excellence with Canadian coaching warmth and spirit."
    }
  ];

  return (
    <section id="coaches" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">

          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 mb-4 px-4 py-2">
            <Heart className="w-4 h-4 mr-2" />
            THE FOUNDING TEAM
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            MEET THE PIONEERS
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
              {" "}BRINGING
            </span>
            <br />
            A NEW VISION TO
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">
              CANADIAN CRICKET
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our Program is being designed by Expert Current and Retired Cricket experts from Australia, Pakistan and the World
          </p>
        </motion.div>

        {/* Coaches Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {coaches.map((coach, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}>

              <Card className="h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg overflow-hidden group flex flex-col">
                <CardHeader className="pb-6 text-center">
                  {/* Question Mark Profile Image */}
                  <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center ring-4 ring-emerald-100 group-hover:ring-emerald-300 transition-all duration-300 mb-4">
                    <span className="text-4xl font-bold text-white">?</span>
                  </div>

                  <CardTitle className="text-xl font-bold text-gray-900 mb-1">
                    {coach.name}
                  </CardTitle>

                  <p className="text-emerald-600 font-semibold">
                    {coach.title}
                  </p>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col justify-between space-y-6">
                  <div className="relative">
                    <Quote className="w-8 h-8 text-emerald-200 absolute -top-2 -left-2" />
                    <p className="text-gray-700 italic leading-relaxed pl-6 text-sm">
                      "{coach.quote}"
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-center">Specialties</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {coach.specialties.map((specialty, idx) =>
                        <Badge key={idx} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Coaching Philosophy */}
        <motion.div
          id="philosophy-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-3xl p-8 md:p-12">

          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Promise to Canadian Families
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every Cricket Cadet coach is chosen not just for their expertise,
              but for their genuine commitment to making cricket fun and accessible for Canadian kids.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coachingPhilosophy.map((principle, index) =>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center">

                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {principle.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}