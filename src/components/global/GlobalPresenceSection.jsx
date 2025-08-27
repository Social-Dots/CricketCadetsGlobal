import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Users, Trophy, Target, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GlobalPresenceSection() {
  const globalStats = [
    {
      icon: Globe,
      label: "Global Presence",
      detail: "Active Programs",
      color: "text-blue-500"
    },
    {
      icon: Users,
      label: "Young Players",
      detail: "Worldwide",
      color: "text-emerald-500"
    },
    {
      icon: Trophy,
      label: "Elite Coaches",
      detail: "Certified Professionals",
      color: "text-amber-500"
    },
    {
      icon: Target,
      label: "Partnerships",
      detail: "Schools & Academies",
      color: "text-purple-500"
    }
  ];

  const globalLocations = [
    {
      country: "Australia",
      flag: "🇦🇺",
      cities: ["Melbourne", "Sydney", "Brisbane", "Perth"],
      status: "Established",
      players: "3,500+",
      facilities: "15 Centers"
    },
    {
      country: "Canada",
      flag: "🇨🇦",
      cities: ["Toronto", "Vancouver", "Calgary", "Montreal"],
      status: "Expanding",
      players: "2,800+",
      facilities: "12 Centers"
    },
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      cities: ["London", "Birmingham", "Manchester", "Leeds"],
      status: "Growing",
      players: "2,200+",
      facilities: "8 Centers"
    },
    {
      country: "New Zealand",
      flag: "🇳🇿",
      cities: ["Auckland", "Wellington", "Christchurch"],
      status: "Established",
      players: "1,200+",
      facilities: "6 Centers"
    },
    {
      country: "South Africa",
      flag: "🇿🇦",
      cities: ["Cape Town", "Johannesburg", "Durban"],
      status: "Launching 2025",
      players: "Coming Soon",
      facilities: "3 Centers Planned"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4 px-4 py-2">
            <Globe className="w-4 h-4 mr-2" />
            Global Presence
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cricket Cadets
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
              {" "}Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From our Australian roots to a global network of excellence - we're bringing world-class cricket education to young players everywhere
          </p>
        </motion.div>

        {/* Global Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {globalStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-black text-gray-900 mb-2">{stat.number}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{stat.label}</h3>
                <p className="text-sm text-gray-600">{stat.detail}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Global Locations */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {globalLocations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{location.flag}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{location.country}</h3>
                        <Badge 
                          className={`text-xs ${
                            location.status === 'Established' ? 'bg-green-100 text-green-800' :
                            location.status === 'Expanding' ? 'bg-blue-100 text-blue-800' :
                            location.status === 'Growing' ? 'bg-purple-100 text-purple-800' :
                            'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {location.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Major Cities</h4>
                      <div className="flex flex-wrap gap-2">
                        {location.cities.map((city, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            {city}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <div>
                        <div className="font-semibold text-gray-700">Players</div>
                        <div className="text-emerald-600">{location.players}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-700">Facilities</div>
                        <div className="text-blue-600">{location.facilities}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-3xl p-8 md:p-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join the Global Movement
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Be part of a worldwide community dedicated to developing the next generation of cricket talent with world-class coaching and innovative training methods.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                International Standards
              </Badge>
              <Badge className="bg-emerald-600 text-white hover:bg-emerald-500 px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                Local Expertise
              </Badge>
              <Badge className="bg-amber-500 text-amber-900 hover:bg-amber-400 px-4 py-2">
                <Trophy className="w-4 h-4 mr-2" />
                Proven Results
              </Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}