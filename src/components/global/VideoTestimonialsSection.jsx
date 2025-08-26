import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Quote, Star, Globe, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VideoTestimonialsSection() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Parent, Toronto",
      country: "🇨🇦 Canada",
      videoThumbnail: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quote: "My daughter Emma has grown so much in confidence and skill since joining Cricket Cadets. The coaching is world-class, and she absolutely loves going to training.",
      rating: 5,
      playerAge: "Age 10",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder - replace with actual video
    },
    {
      id: 2,
      name: "James Thompson",
      role: "Former County Player & Parent, Melbourne",
      country: "🇦🇺 Australia",
      videoThumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quote: "As someone who played county cricket, I know good coaching when I see it. Cricket Cadets has exceeded all my expectations. My son has developed proper technique and genuine love for the game.",
      rating: 5,
      playerAge: "Age 13",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Parent, Birmingham",
      country: "🇬🇧 United Kingdom",
      videoThumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quote: "The international standard of coaching combined with the warmth and encouragement of the staff makes Cricket Cadets special. My twins have flourished here.",
      rating: 5,
      playerAge: "Age 9 & 11",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 4,
      name: "Marcus Johnson",
      role: "Youth Coach & Parent, Auckland",
      country: "🇳🇿 New Zealand",
      videoThumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quote: "The way Cricket Cadets combines traditional cricket wisdom with modern training methods is incredible. My daughter has made remarkable progress in just one season.",
      rating: 5,
      playerAge: "Age 12",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  const nextTestimonial = () => {
    setActiveVideo((prev) => (prev + 1) % testimonials.length);
    setIsPlaying(false);
  };

  const prevTestimonial = () => {
    setActiveVideo((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPlaying(false);
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 mb-4 px-4 py-2">
            <Globe className="w-4 h-4 mr-2" />
            Global Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hear From Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              {" "}Global Community
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Parents and players from around the world share their Cricket Cadets experience
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              {isPlaying ? (
                <iframe
                  src={testimonials[activeVideo].videoUrl}
                  title={`Testimonial from ${testimonials[activeVideo].name}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={testimonials[activeVideo].videoThumbnail}
                    alt={`${testimonials[activeVideo].name} testimonial`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button
                      onClick={() => setIsPlaying(true)}
                      className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/50 rounded-full p-6"
                    >
                      <Play className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                onClick={prevTestimonial}
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveVideo(index);
                      setIsPlaying(false);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeVideo 
                        ? 'bg-amber-400 scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextTestimonial}
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Testimonial Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVideo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 p-8">
                  <CardContent className="p-0">
                    {/* Quote */}
                    <div className="relative mb-6">
                      <Quote className="w-12 h-12 text-amber-400/30 absolute -top-2 -left-2" />
                      <p className="text-lg text-gray-200 leading-relaxed pl-8 italic">
                        "{testimonials[activeVideo].quote}"
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonials[activeVideo].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Parent Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-white">
                          {testimonials[activeVideo].name}
                        </h4>
                        <p className="text-gray-400">{testimonials[activeVideo].role}</p>
                      </div>
                    </div>

                    {/* Location and Player Age */}
                    <div className="flex flex-wrap gap-3">
                      <Badge className="bg-emerald-600 text-white">
                        {testimonials[activeVideo].country}
                      </Badge>
                      <Badge variant="outline" className="border-amber-500 text-amber-400">
                        Player: {testimonials[activeVideo].playerAge}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Join Our Global Cricket Family?
          </h3>
          <Button
            onClick={() => window.dispatchEvent(new CustomEvent('showRegistration'))}
            className="bg-amber-500 hover:bg-amber-600 text-amber-900 font-bold px-8 py-4 text-lg"
          >
            Start Your Cricket Journey Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}