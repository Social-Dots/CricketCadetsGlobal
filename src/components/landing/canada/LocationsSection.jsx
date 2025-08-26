import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Rocket, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LocationsSection() {
  const plannedLocations = [
    {
      city: "Milton",
      province: "Ontario",
      status: "Launching Early 2026",
      image: "https://media.licdn.com/dms/image/v2/C561BAQEIKtxD6I1XqA/company-background_10000/company-background_10000/0/1588034264143/icc_world_t20_cover?e=2147483647&v=beta&t=-6DA5uUw2c7jC3PuyV0_LNbm3jAGd0gDTw5MnJT_cTU",
      features: ["State-of-the-Art Facilities", "Expert Coaching Staff", "AI-Powered Analytics"]
    },
    {
      city: "Mississauga",
      province: "Ontario",
      status: "Launching Early 2026",
      image: "https://images.unsplash.com/photo-1593563972583-f9339411b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Year-Round Training Programs", "Modern Equipment", "Small Group Focus"]
    },
    {
      city: "Brampton",
      province: "Ontario",
      status: "Launching Early 2026",
      image: "https://images.unsplash.com/photo-1598813872244-23b69e35832c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Climate-Controlled Venues", "Flexible Schedules", "Pathway to Excellence"]
    }
  ];

  const statusColors = {
    "Launching Early 2026": "bg-emerald-100 text-emerald-800",
  };

  return (
    <section id="locations" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 mb-4 px-4 py-2">
            <Rocket className="w-4 h-4 mr-2" />
            Launching Early 2026 in the GTA
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            THE REVOLUTION
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
              {" "}
              IS COMING TO
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">
              MILTON, MISSISSAUGA & BRAMPTON
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Our mission is to make elite cricket training accessible. Our first state-of-the-art academies are set to launch across the GTA in Early 2026.
          </p>
        </motion.div>

        {/* Planned Locations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {plannedLocations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={location.image}
                    alt={`${location.city} planned facility`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <Badge className={statusColors[location.status]}>
                      {location.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-bold text-lg">{location.city}</h3>
                    <p className="text-emerald-200 text-sm">{location.province}</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-2">
                    {location.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}