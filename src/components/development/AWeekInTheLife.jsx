import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Shield, Users, Trophy } from 'lucide-react';

export default function AWeekInTheLife() {
  const timeline = [
    { icon: Sun, title: "Warm-Up Games", description: "Starting the day with fun, energetic games to get moving.", time: "Day 1-5" },
    { icon: Shield, title: "Skill Stations", description: "Rotating through stations for batting, bowling, and fielding.", time: "Day 1-5" },
    { icon: Users, title: "Mini Matches", description: "Putting new skills to the test in exciting, small-sided games.", time: "Day 2-5" },
    { icon: Trophy, title: "Awards & Wrap-Up", description: "Celebrating everyone's effort and progress at the end of the camp.", time: "Day 5" }
  ];

  const lineVariants = {
    hidden: { height: 0 },
    visible: { height: '100%', transition: { duration: 1, ease: 'easeOut' } }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">A Peek into a Camp Week</h2>
          <p className="text-lg text-gray-600">Our structured yet flexible schedule keeps every day exciting.</p>
        </motion.div>

        <div className="relative">
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="absolute left-6 md:left-1/2 w-1 bg-emerald-200 h-full -translate-x-1/2"
          />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="mb-12 flex items-center w-full"
            >
              <div className="hidden md:flex w-1/2"></div>
              <div className="z-10 bg-white p-2 rounded-full border-4 border-emerald-200">
                <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg shadow-md p-6 w-full md:w-1/2 ml-4 md:ml-8">
                <p className="text-sm font-semibold text-amber-600 mb-1">{item.time}</p>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}