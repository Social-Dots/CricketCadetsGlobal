import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Users, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProgramPhilosophy() {
  const principles = [
    { icon: Heart, title: "Fun First", description: "Creating positive memories is our top priority. We foster joy in every drill and game.", color: "text-red-500" },
    { icon: Users, title: "Team Spirit", description: "Learning to be a great teammate is as important as learning to bat or bowl.", color: "text-blue-500" },
    { icon: Shield, title: "Build Confidence", description: "A safe, supportive space where every child is encouraged to try their best and grow.", color: "text-emerald-500" },
    { icon: Trophy, title: "Celebrate Effort", description: "We recognize hard work and personal progress, not just winning.", color: "text-amber-500" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Coaching Philosophy</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We believe in nurturing young talent by focusing on what matters most at this age.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center p-8 h-full border-2 border-gray-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 ${principle.color}`}>
                  <principle.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{principle.title}</h3>
                <p className="text-gray-600 leading-relaxed">{principle.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}