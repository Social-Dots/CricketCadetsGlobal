import React, { useState } from 'react';
import { motion } from 'framer-motion';

import HeroSection from '../components/development/HeroSection';
import ProgramPhilosophy from '../components/development/ProgramPhilosophy';
import WhatTheyLearn from '../components/development/WhatTheyLearn';
import AWeekInTheLife from '../components/development/AWeekInTheLife';
import RegistrationForm from '../components/landing/RegistrationForm';
import CallToAction from '../components/development/CallToAction';

export default function DevelopmentPrograms() {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection onRegisterClick={() => setShowRegistration(true)} />
      
      {/* Cricket Cadets Skill Development Day Section - Featured at Top */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">
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
            <motion.div 
              className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              🏏 FEATURED PROGRAM
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-green-700 to-emerald-700 bg-clip-text text-transparent mb-8 leading-tight">
              Cricket Cadets Skill Development Day
            </h1>
            
            <motion.p 
              className="text-3xl text-green-700 font-bold mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Get ready for the season with an early boost.
            </motion.p>
            
            <div className="max-w-5xl mx-auto space-y-6">
              <motion.p 
                className="text-xl text-gray-700 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Our Cricket Cadets Skill Development Day is a focused, one-day program designed to give aspiring cricketers a high-quality, intensive training session before the season begins. This program is perfect for players of all skill levels who want to improve their game, build confidence, and get a head start on the competition.
              </motion.p>
              
              <motion.p 
                className="text-xl text-gray-700 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Led by qualified Cricket Cadets coaches, the day offers practical, game-based training tailored to different age groups and abilities. It is the perfect way to prepare for the season in a supportive and energising environment.
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
                  <motion.div className="flex flex-col sm:flex-row sm:items-center" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <span className="font-bold text-green-600 text-lg mb-1 sm:mb-0 sm:w-24">Dates:</span>
                    <span className="text-gray-700 text-lg leading-relaxed">Saturday 21 September or Sunday 22 September (choose one day or both)</span>
                  </motion.div>
                  <motion.div className="flex flex-col sm:flex-row sm:items-center" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <span className="font-bold text-green-600 text-lg mb-1 sm:mb-0 sm:w-24">Time:</span>
                    <span className="text-gray-700 text-lg">4-hour sessions each day</span>
                  </motion.div>
                  <motion.div className="flex flex-col sm:flex-row sm:items-center" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <span className="font-bold text-green-600 text-lg mb-1 sm:mb-0 sm:w-24">Venue:</span>
                    <span className="text-gray-700 text-lg">Hume Indoor Cricket Centre</span>
                  </motion.div>
                  <motion.div className="flex flex-col sm:flex-row sm:items-center" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <span className="font-bold text-green-600 text-lg mb-1 sm:mb-0 sm:w-24">Address:</span>
                    <span className="text-gray-700 text-lg">115 Section Rd, Greenvale VIC 3059</span>
                  </motion.div>
                  <motion.div className="flex flex-col sm:flex-row sm:items-center" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <span className="font-bold text-green-600 text-lg mb-1 sm:mb-0 sm:w-24">Age Group:</span>
                    <span className="text-gray-700 text-lg font-semibold">13–17 years only</span>
                  </motion.div>
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
                  <motion.div className="p-4 bg-gray-50 rounded-xl" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <span className="font-bold text-gray-900 text-lg block mb-2">Standard price:</span>
                    <span className="text-gray-700 text-lg">$85 per participant per day</span>
                  </motion.div>
                  
                  <motion.div className="p-4 bg-green-50 rounded-xl border-2 border-green-200" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <span className="font-bold text-green-600 text-lg block mb-2">Early bird special:</span>
                    <span className="text-gray-700 text-lg">Register before 15 September and pay only $68 per day (20% off)</span>
                  </motion.div>
                  
                  <motion.div className="p-4 bg-green-50 rounded-xl border-2 border-green-200" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <span className="font-bold text-green-600 text-lg block mb-2">Two-day bundle:</span>
                    <span className="text-gray-700 text-lg">Book both days for $136 total instead of $170 (20% off)</span>
                  </motion.div>
                  
                  <motion.div className="p-4 bg-green-50 rounded-xl border-2 border-green-200" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <span className="font-bold text-green-600 text-lg block mb-2">Sibling discount:</span>
                    <span className="text-gray-700 text-lg">20% off for each additional sibling ($68 per day)</span>
                  </motion.div>
                  
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
                          Limited spots available – register early to secure your place.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Why Join Section */}
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
                <motion.div 
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-colors duration-300 group/item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
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
                  <p className="text-gray-700 text-lg leading-relaxed group-hover/item:text-gray-800 transition-colors duration-200">Develop key cricket skills before the season starts</p>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-colors duration-300 group/item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
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
                  <p className="text-gray-700 text-lg leading-relaxed group-hover/item:text-gray-800 transition-colors duration-200">Train with qualified coaches in a youth-focused, safe environment</p>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-colors duration-300 group/item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
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
                  <p className="text-gray-700 text-lg leading-relaxed group-hover/item:text-gray-800 transition-colors duration-200">Small group sessions for maximum attention</p>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-colors duration-300 group/item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
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
                  <p className="text-gray-700 text-lg leading-relaxed group-hover/item:text-gray-800 transition-colors duration-200">Build confidence and match readiness</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

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
       
       {/* Divider Section */}
       <motion.div
         initial={{ opacity: 0, y: 30, scale: 0.95 }}
         whileInView={{ opacity: 1, y: 0, scale: 1 }}
         transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 100 }}
         viewport={{ once: true }}
         className="text-center py-20 relative overflow-hidden"
       >
         {/* Background decoration */}
         <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 opacity-50"></div>
         <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl"></div>
         <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 blur-xl"></div>
         
         <div className="max-w-4xl mx-auto relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.0 }}
             viewport={{ once: true }}
             className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
           >
             🏆 COMPLETE PROGRAMS
           </motion.div>
           
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.1 }}
             viewport={{ once: true }}
             className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
           >
             Our Complete Development Programs
           </motion.h2>
           
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.2 }}
             viewport={{ once: true }}
             className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
           >
             Explore our comprehensive range of cricket development programs designed to nurture talent at every level, 
             from beginners to advanced players seeking professional excellence.
           </motion.p>
           
           <motion.div
             initial={{ opacity: 0, scaleX: 0 }}
             whileInView={{ opacity: 1, scaleX: 1 }}
             transition={{ delay: 1.3, duration: 0.8 }}
             viewport={{ once: true }}
             className="w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mx-auto mt-8"
           ></motion.div>
         </div>
       </motion.div>
       
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