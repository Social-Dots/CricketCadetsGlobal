import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import HeroSection from '../components/development/HeroSection';
import ProgramPhilosophy from '../components/development/ProgramPhilosophy';
import WhatTheyLearn from '../components/development/WhatTheyLearn';
import AWeekInTheLife from '../components/development/AWeekInTheLife';
import RegistrationForm from '../components/landing/RegistrationForm';
import CallToAction from '../components/development/CallToAction';
import { getDevelopmentPrograms } from '../lib/supabase';

export default function DevelopmentPrograms() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [developmentPrograms, setDevelopmentPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopmentPrograms = async () => {
      try {
        const programs = await getDevelopmentPrograms();
        setDevelopmentPrograms(programs);
      } catch (error) {
        console.error('Error fetching development programs:', error);
        // Fallback to default data if database fetch fails
        setDevelopmentPrograms([{
          id: 1,
          title: 'Cricket Cadets Skill Development Day',
          subtitle: 'Get ready for the season with an early boost.',
          description: 'Our Cricket Cadets Skill Development Day is a focused, one-day program designed to give aspiring cricketers a high-quality, intensive training session before the season begins. This program is perfect for players of all skill levels who want to improve their game, build confidence, and get a head start on the competition. Led by qualified Cricket Cadets coaches, the day offers practical, game-based training tailored to different age groups and abilities. It is the perfect way to prepare for the season in a supportive and energising environment.',
          featured_badge: '🏏 FEATURED PROGRAM',
          dates: 'Saturday 21 September or Sunday 22 September (choose one day or both)',
          time_duration: '4-hour sessions each day',
          venue_name: 'Hume Indoor Cricket Centre',
          venue_address: '115 Section Rd, Greenvale VIC 3059',
          age_group: '13–17 years only',
          standard_price: 85.00,
          early_bird_price: 68.00,
          early_bird_deadline: '2024-09-15',
          two_day_bundle_price: 136.00,
          sibling_discount_price: 68.00,
          limited_spots_warning: 'Limited spots available – register early to secure your place.',
          benefits: [
            'Develop key cricket skills before the season starts',
            'Train with qualified coaches in a youth-focused, safe environment',
            'Small group sessions for maximum attention',
            'Build confidence and match readiness'
          ]
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopmentPrograms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading development programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <HeroSection onRegisterClick={() => setShowRegistration(true)} />
      
      {/* Dynamic Development Programs Section */}
      {developmentPrograms.map((program, index) => (
        <section key={program.id} className="py-24 bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-48 h-48 bg-green-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-emerald-500 rounded-full blur-2xl"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              {program.featured_badge && (
                <motion.div 
                  className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {program.featured_badge}
                </motion.div>
              )}
              
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-green-700 to-emerald-700 bg-clip-text text-transparent mb-8 leading-tight">
                {program.title}
              </h1>
              
              {program.subtitle && (
                <motion.p 
                  className="text-3xl text-green-700 font-bold mb-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {program.subtitle}
                </motion.p>
              )}
              
              <div className="max-w-5xl mx-auto space-y-6">
                <motion.p 
                  className="text-xl text-gray-700 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {program.description}
                </motion.p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 mb-16">
              {/* Program Details */}
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl shadow-2xl p-10 border border-green-100 group overflow-hidden relative"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white text-xl">📅</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">Program Details</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {program.dates && (
                      <motion.div className="flex flex-col sm:flex-row sm:items-center" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <span className="font-bold text-green-600 text-lg mb-1 sm:mb-0 sm:w-24">Dates:</span>
                        <span className="text-gray-700 text-lg leading-relaxed">{program.dates}</span>
                      </motion.div>
                    )}
                    {program.time_duration && (
                      <motion.div className="flex flex-col sm:flex-row sm:items-center" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <span className="font-bold text-green-600 text-lg mb-1 sm:mb-0 sm:w-24">Time:</span>
                        <span className="text-gray-700 text-lg">{program.time_duration}</span>
                      </motion.div>
                    )}
                    {program.venue_name && (
                      <motion.div className="flex flex-col sm:flex-row sm:items-center" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <span className="font-bold text-green-600 text-lg mb-1 sm:mb-0 sm:w-24">Venue:</span>
                        <span className="text-gray-700 text-lg">{program.venue_name}</span>
                      </motion.div>
                    )}
                    {program.venue_address && (
                      <motion.div className="flex flex-col sm:flex-row sm:items-center" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <span className="font-bold text-green-600 text-lg mb-1 sm:mb-0 sm:w-24">Address:</span>
                        <span className="text-gray-700 text-lg">{program.venue_address}</span>
                      </motion.div>
                    )}
                    {program.age_group && (
                      <motion.div className="flex flex-col sm:flex-row sm:items-center" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <span className="font-bold text-green-600 text-lg mb-1 sm:mb-0 sm:w-24">Age Group:</span>
                        <span className="text-gray-700 text-lg font-semibold">{program.age_group}</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Pricing & Discounts */}
              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl shadow-2xl p-10 border border-blue-100 group overflow-hidden relative"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white text-xl">💰</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">Pricing & Discounts</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {program.standard_price && (
                      <motion.div className="p-4 bg-gray-50 rounded-xl" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <span className="font-bold text-gray-900 text-lg block mb-2">Standard price:</span>
                        <span className="text-gray-700 text-lg">${program.standard_price} per participant per day</span>
                      </motion.div>
                    )}
                    
                    {program.early_bird_price && (
                      <motion.div className="p-4 bg-green-50 rounded-xl border-2 border-green-200" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <span className="font-bold text-green-600 text-lg block mb-2">Early bird special:</span>
                        <span className="text-gray-700 text-lg">
                          Register before {program.early_bird_deadline && new Date(program.early_bird_deadline).toLocaleDateString()} and pay only ${program.early_bird_price} per day
                        </span>
                      </motion.div>
                    )}
                    
                    {program.two_day_bundle_price && (
                      <motion.div className="p-4 bg-green-50 rounded-xl border-2 border-green-200" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <span className="font-bold text-green-600 text-lg block mb-2">Two-day bundle:</span>
                        <span className="text-gray-700 text-lg">Book both days for ${program.two_day_bundle_price} total instead of ${program.standard_price * 2}</span>
                      </motion.div>
                    )}
                    
                    {program.sibling_discount_price && (
                      <motion.div className="p-4 bg-green-50 rounded-xl border-2 border-green-200" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <span className="font-bold text-green-600 text-lg block mb-2">Sibling discount:</span>
                        <span className="text-gray-700 text-lg">20% off for each additional sibling (${program.sibling_discount_price} per day)</span>
                      </motion.div>
                    )}
                    
                    {program.limited_spots_warning && (
                      <motion.div 
                        className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow-md"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-3">
                            <span className="text-yellow-600 text-2xl">⚠️</span>
                          </div>
                          <div>
                            <p className="text-lg text-yellow-800 font-bold">
                              {program.limited_spots_warning}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
          </div>

          {/* Why Join Section */}
          {program.why_join_reasons && program.why_join_reasons.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-3xl shadow-2xl p-12 mb-12 border border-purple-100 group overflow-hidden relative"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
                    <span className="text-white text-2xl">🎯</span>
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">Why Join?</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mt-4"></div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-8">
                  {program.why_join_reasons.map((reason, reasonIndex) => (
                    <motion.div 
                      key={reasonIndex}
                      className="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-colors duration-300 group/item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + reasonIndex * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex-shrink-0">
                        <motion.div 
                          className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <span className="text-white text-lg font-bold">✓</span>
                        </motion.div>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed group-hover/item:text-gray-800 transition-colors duration-200">{reason}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Register Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* <button
              onClick={() => setShowRegistration(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Register Now
            </button> */}
          </motion.div>
          </div>
        </section>
      ))}
       
       {/* Other Program Sections */}
       <ProgramPhilosophy />
       <WhatTheyLearn />
       <AWeekInTheLife />
       
       <CallToAction onRegisterClick={() => setShowRegistration(true)} />

      <RegistrationForm
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
      />
    </div>
  );
}