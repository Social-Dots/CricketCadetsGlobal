import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function WhatTheyLearn() {
  const skills = {
    "Cricket Fundamentals": ["Proper grip & stance", "Basic batting strokes", "Intro to bowling actions", "Safe catching techniques"],
    "Game Sense": ["Understanding field positions", "Running between wickets", "Basics of scoring", "Rules of the game"],
    "Physical Literacy": ["Agility and coordination", "Balance and speed", "Throwing and catching", "Team-based fitness games"],
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Your Cadet Will Learn</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our curriculum is designed to be comprehensive and age-appropriate, covering key skills in a fun way.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold text-emerald-600 mb-6">{category}</h3>
              <ul className="space-y-4">
                {skillList.map((skill) => (
                  <li key={skill} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}