
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Trophy, Calendar, Clock, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { getPrograms } from '@/lib/supabase';

export default function GlobalProgramsOverview() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await getPrograms();
        setPrograms(data || []);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);
  
  // Helper function to get icon based on program type
  const getIconForProgram = (title) => {
    if (title?.toLowerCase().includes('development')) return Users;
    if (title?.toLowerCase().includes('performance')) return Trophy;
    return Target;
  };
  
  // Helper function to get color based on program type
  const getColorForProgram = (title) => {
    if (title?.toLowerCase().includes('development')) return 'from-blue-500 to-blue-600';
    if (title?.toLowerCase().includes('performance')) return 'from-emerald-500 to-emerald-600';
    return 'from-purple-500 to-purple-600';
  };

  const formats = [
    {
      icon: Calendar,
      title: "Holiday Camps",
      description: "Intensive 4-5 day programs",
      duration: "4-5 Days",
      format: "Full Days",
      color: "bg-amber-500",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKgobzE44G-w_KnxHVRpfaSxtlk3DnY6uKiNdxrPLrArDAB2JqDX5KQdtlKUl8GZTYaKA&usqp=CAU"
    },
    {
      icon: Clock,
      title: "Weekly Training",
      description: "Ongoing skill development programs", 
      duration: "10-12 Weeks",
      format: "Evenings/Weekends",
      color: "bg-emerald-500",
      image: "https://images.icc-cricket.com/image/upload/t_ratio16_9-size30-webp/prd/ekplqm9uptgbtauwpqm7"
    }
  ];

  if (loading) {
    return (
      <section id="global-programs" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-32 mx-auto mb-6"></div>
              <div className="h-16 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
              <div className="h-6 bg-gray-200 rounded w-full max-w-3xl mx-auto"></div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                <div className="p-8 bg-white rounded-b-lg">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="global-programs" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 hover:from-amber-200 hover:to-amber-300 mb-6 px-6 py-3 text-lg border-0">
            <Target className="w-5 h-5 mr-2" />
            Programs
          </Badge>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
            Your Cricket
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              {" "}Pathway
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tailored programs for every stage of your cricket journey
          </p>
        </motion.div>

        {/* Main Programs with Images */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          {programs.map((program, index) => {
            const programWithIcon = {
              ...program,
              icon: getIconForProgram(program.name),
              color: getColorForProgram(program.name)
            };
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="group h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg overflow-hidden">
                {/* Image Header */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={programWithIcon.image}
                    alt={programWithIcon.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent`}></div>
                  
                  {/* Program Icon */}
                  <div className={`absolute top-6 right-6 w-16 h-16 bg-gradient-to-r ${programWithIcon.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    {React.createElement(programWithIcon.icon, { className: "w-8 h-8 text-white" })}
                  </div>
                  
                  {/* Program Info Overlay */}
                  <div className="absolute bottom-6 left-6">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white mb-3 px-3 py-1">
                      {programWithIcon.subtitle}
                    </Badge>
                    <h3 className="text-3xl font-bold text-white mb-2">{programWithIcon.name}</h3>
                  </div>
                </div>
                
                <CardContent className="p-8 flex flex-col flex-grow">
                  <p className="text-gray-600 text-lg leading-relaxed mb-6 flex-grow">{programWithIcon.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {programWithIcon.features && programWithIcon.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  {(programWithIcon.page_url || programWithIcon.name === "Development Programs") && (
                    <Button
                      className="mt-auto w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => {
                        if (programWithIcon.page_url) {
                          window.location.href = programWithIcon.page_url;
                        } else if (programWithIcon.name === "Development Programs") {
                          window.location.href = createPageUrl('DevelopmentPrograms');
                        }
                      }}
                    >
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            );
          })}
        </div>

        {/* Program Formats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {formats.map((format, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0">
                  <div className="flex">
                    {/* Image Side */}
                    <div className="relative w-1/3 h-40">
                      <img
                        src={format.image}
                        alt={format.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/90"></div>
                    </div>
                    
                    {/* Content Side */}
                    <div className="flex-1 p-6 flex items-center">
                      <div>
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`w-12 h-12 ${format.color} rounded-xl flex items-center justify-center`}>
                            {React.createElement(format.icon, { className: "w-6 h-6 text-white" })}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">{format.title}</h4>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{format.duration}</Badge>
                              <Badge variant="outline" className="text-xs">{format.format}</Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{format.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              className="group bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold px-10 py-4 text-lg rounded-2xl shadow-lg border-0"
              onClick={() => {
                document.getElementById('country-selector')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Zap className="w-5 h-5 mr-3" />
              Find Your Program
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}