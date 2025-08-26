import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Star, 
  Trophy, 
  Target, 
  Users, 
  Calendar, 
  Clock, 
  ArrowRight,
  Zap,
  Crown,
  Rocket
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlansSection({ onRegisterClick }) {
  const plans = [
    {
      name: "Rookie Bootcamp",
      subtitle: "Perfect Start",
      price: "$149",
      period: "/month",
      description: "Ideal for beginners aged 6-10. Focus on fun, fundamentals, and building confidence.",
      icon: Star,
      color: "emerald",
      popular: false,
      features: [
        "2 sessions per week",
        "Basic batting & bowling",
        "Fun games & activities",
        "Small group training (8 kids max)",
        "Parent progress updates",
        "Equipment provided",
        "Certificate of completion"
      ],
      ageGroup: "6-10 years",
      duration: "1.5 hours per session"
    },
    {
      name: "Champion Development",
      subtitle: "Most Popular",
      price: "$199",
      period: "/month",
      description: "Comprehensive program for ages 11-15. Advanced skills, strategy, and competitive preparation.",
      icon: Trophy,
      color: "blue",
      popular: true,
      features: [
        "3 sessions per week",
        "Advanced technique training",
        "Match simulation & strategy",
        "Video analysis included",
        "Fitness & conditioning",
        "Mental game coaching",
        "Tournament preparation",
        "Performance tracking"
      ],
      ageGroup: "11-15 years",
      duration: "2 hours per session"
    },
    {
      name: "Elite Academy",
      subtitle: "Premium Training",
      price: "$299",
      period: "/month",
      description: "High-performance program for serious players aged 16-18. Professional-level training.",
      icon: Crown,
      color: "purple",
      popular: false,
      features: [
        "4 sessions per week",
        "1-on-1 coaching sessions",
        "Professional match analysis",
        "Strength & conditioning program",
        "Mental performance coaching",
        "College/professional pathway guidance",
        "Tournament travel opportunities",
        "Scholarship opportunities"
      ],
      ageGroup: "16-18 years",
      duration: "2.5 hours per session"
    }
  ];

  const getColorClasses = (color, popular = false) => {
    const colors = {
      emerald: {
        bg: popular ? 'bg-emerald-500' : 'bg-emerald-100',
        text: popular ? 'text-white' : 'text-emerald-800',
        border: 'border-emerald-200',
        button: 'bg-emerald-500 hover:bg-emerald-600'
      },
      blue: {
        bg: popular ? 'bg-blue-500' : 'bg-blue-100',
        text: popular ? 'text-white' : 'text-blue-800',
        border: 'border-blue-200',
        button: 'bg-blue-500 hover:bg-blue-600'
      },
      purple: {
        bg: popular ? 'bg-purple-500' : 'bg-purple-100',
        text: popular ? 'text-white' : 'text-purple-800',
        border: 'border-purple-200',
        button: 'bg-purple-500 hover:bg-purple-600'
      }
    };
    return colors[color];
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 mb-4">
            🏏 Training Programs
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your
            <span className="block text-emerald-600">Cricket Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From first-time players to future champions, we have the perfect program 
            to match your child's skill level and cricket aspirations.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            const colors = getColorClasses(plan.color, plan.popular);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 text-sm font-semibold">
                      ⭐ Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full border-2 ${colors.border} ${plan.popular ? 'shadow-2xl scale-105' : 'shadow-lg'} transition-all duration-300 hover:shadow-xl`}>
                  <CardHeader className={`${colors.bg} ${colors.text} rounded-t-lg`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-full ${plan.popular ? 'bg-white/20' : 'bg-white'}`}>
                        <IconComponent className={`w-6 h-6 ${plan.popular ? 'text-white' : colors.text.replace('text-', 'text-')}`} />
                      </div>
                      <Badge variant="secondary" className={`${plan.popular ? 'bg-white/20 text-white' : 'bg-white'}`}>
                        {plan.subtitle}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <p className={`${plan.popular ? 'text-white/90' : 'text-gray-600'} leading-relaxed`}>
                      {plan.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="p-8">
                    {/* Price */}
                    <div className="text-center mb-8">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600">{plan.period}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-2">
                        {plan.ageGroup} • {plan.duration}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={onRegisterClick}
                      className={`w-full ${colors.button} text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      Join Waitlist
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <Card className="border border-emerald-200 bg-emerald-50">
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                Flexible Scheduling
              </h3>
              <p className="text-emerald-700">
                Multiple time slots available. Weekend and after-school options to fit your family's schedule.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Progress Tracking
              </h3>
              <p className="text-blue-700">
                Regular assessments and detailed progress reports to track your child's development journey.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <Rocket className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-purple-800 mb-2">
                Pathway Programs
              </h3>
              <p className="text-purple-700">
                Clear progression paths from beginner to elite levels, with opportunities for advanced training.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your Cricket Journey?
            </h3>
            <p className="text-xl text-emerald-100 mb-6 max-w-2xl mx-auto">
              Join our waitlist today and be among the first to experience world-class cricket training in Canada.
            </p>
            <Button
              onClick={onRegisterClick}
              size="lg"
              className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Zap className="mr-2 w-5 h-5" />
              Join the Waitlist Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}