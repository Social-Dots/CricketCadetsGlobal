import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  BarChart3, 
  Video, 
  Smartphone, 
  TrendingUp, 
  Target, 
  Eye, 
  Zap,
  Monitor,
  PieChart,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIPerformanceSection() {
  const features = [
    {
      icon: BarChart3,
      title: "Progress Reports",
      description: "Weekly insights on skill improvement, attendance tracking, and personalized development milestones.",
      color: "bg-blue-500"
    },
    {
      icon: Video,
      title: "Video Analysis",
      description: "AI-powered breakdown of batting and bowling techniques with frame-by-frame improvement suggestions.",
      color: "bg-purple-500"
    },
    {
      icon: Smartphone,
      title: "Online Access",
      description: "Parents can view comprehensive dashboards and progress reports from anywhere, anytime.",
      color: "bg-emerald-500"
    },
    {
      icon: Brain,
      title: "Smart Recommendations",
      description: "Personalized feedback from coaches enhanced with AI-driven performance insights and training suggestions.",
      color: "bg-amber-500"
    }
  ];

  const mockScreenshots = [
    {
      title: "Player Progress Dashboard",
      description: "Real-time tracking of skills development",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: ["Batting Average: +15%", "Bowling Accuracy: +22%", "Sessions Attended: 8/8"]
    },
    {
      title: "AI Video Analysis",
      description: "Frame-by-frame technique breakdown",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: ["Technique Score: 87/100", "Improvement Areas: 3", "Next Focus: Follow Through"]
    },
    {
      title: "Performance Analytics",
      description: "Comprehensive skill progression graphs",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: ["Weekly Growth: +8%", "Consistency Rating: 92%", "Coach Rating: Excellent"]
    }
  ];

  return (
    <section id="ai-performance" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-blue-500 text-white hover:bg-blue-600 mb-4 px-4 py-2">
            <Brain className="w-4 h-4 mr-2" />
            AI-Driven Performance & Progress Tracking
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Train Smarter with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {" "}AI-Powered
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
              Video Analysis & Reports
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Cricket Cadet uses cutting-edge AI technology to provide detailed performance insights, 
            automated progress reports, and personalized coaching recommendations for every player.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mock Screenshots Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            See Your Progress in Real-Time
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {mockScreenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800/70 border-gray-600 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={screenshot.image}
                      alt={screenshot.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <Monitor className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-white mb-2">{screenshot.title}</h4>
                    <p className="text-gray-400 mb-4 text-sm">{screenshot.description}</p>
                    <div className="space-y-2">
                      {screenshot.stats.map((stat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                          <span className="text-gray-300">{stat}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Future of Cricket Training is Here
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Every Cricket Cadet player benefits from technology previously only available to professional athletes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Objective Analysis</h4>
              <p className="text-gray-300 text-sm">AI removes guesswork with precise technique measurement</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-3">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Faster Improvement</h4>
              <p className="text-gray-300 text-sm">Data-driven insights accelerate skill development</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mb-3">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Parent Transparency</h4>
              <p className="text-gray-300 text-sm">Full visibility into your child's cricket journey</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}