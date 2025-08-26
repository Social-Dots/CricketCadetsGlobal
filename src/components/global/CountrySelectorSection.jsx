import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';

export default function CountrySelectorSection() {
  const countries = [
    {
      name: "Canada",
      flag: "🇨🇦",
      status: "Launching Early 2026",
      locations: ["Milton", "Mississauga", "Brampton"],
      description: "Bringing Australian cricket excellence to the Greater Toronto Area with state-of-the-art facilities.",
      image: "https://media.licdn.com/dms/image/v2/C561BAQEIKtxD6I1XqA/company-background_10000/company-background_10000/0/1588034264143/icc_world_t20_cover?e=2147483647&v=beta&t=-6DA5uUw2c7jC3PuyV0_LNbm3jAGd0gDTw5MnJT_cTU",
      available: true,
      link: createPageUrl("Canada")
    },
    {
      name: "Australia",
      flag: "🇦🇺",
      status: "Established Programs",
      locations: ["Melbourne", "Sydney", "Brisbane"],
      description: "Our flagship programs in the cricket capital of the world, where our journey began.",
      image: "https://resources.cricket-nt.pulselive.com/photo-resources/2024/04/30/d34eacba-4e8f-406a-a797-aa2f3514886f/U12s-Waratah-PINT-1.jpg?width=950&height=535",
      available: true,
      link: "#" // Placeholder link
    }
  ];

  const statusColors = {
    "Launching Early 2026": "bg-emerald-100 text-emerald-800",
    "Established Programs": "bg-blue-100 text-blue-800",
  };

  return (
    <section id="country-selector" className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
            <MapPin className="w-4 h-4 mr-2" />
            Choose Your Location
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cricket Cadets
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
              {" "}Around the World
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Select your region to discover local programs, coaches, and facilities tailored to regional pathways.
          </p>
        </motion.div>

        {/* Countries Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {countries.map((country, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: index * 0.2, type: 'spring', stiffness: 50 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg overflow-hidden group`}>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={country.image}
                    alt={`${country.name} cricket programs`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 flex items-center gap-3">
                    <span className="text-5xl drop-shadow-lg">{country.flag}</span>
                  </div>

                  <div className="absolute bottom-4 left-4">
                     <Badge className={`${statusColors[country.status]} mb-2`}>
                      {country.status}
                    </Badge>
                    <h3 className="text-white font-bold text-3xl mb-2 drop-shadow-md">{country.name}</h3>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{country.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    {country.available ? (
                      <Button 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => {
                          if (country.link !== '#') window.location.href = country.link
                        }}
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Explore Programs
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button variant="outline" disabled>
                        <Calendar className="w-4 h-4 mr-2" />
                        Coming Soon
                      </Button>
                    )}
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
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Don't See Your Location?
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              We are rapidly expanding worldwide. Join our global waitlist to be the first to know when we launch in your area.
            </p>
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3"
              onClick={() => window.dispatchEvent(new CustomEvent('showRegistration'))}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Join Global Waitlist
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}