import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Rocket, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { getLocations } from '../../../lib/supabase';

export default function LocationsSection() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const data = await getLocations();
      // Filter for Canada locations or featured locations
      const canadaLocations = data?.filter(location => 
        location.country?.toLowerCase() === 'canada' || 
        location.is_featured
      ) || [];
      setLocations(canadaLocations);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    "Launching Early 2026": "bg-emerald-100 text-emerald-800",
    "Coming Soon": "bg-yellow-100 text-yellow-800",
    "Open": "bg-green-100 text-green-800",
    "Planning": "bg-blue-100 text-blue-800",
  };

  if (loading) {
    return (
      <section id="locations" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-full max-w-4xl mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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

        {/* Locations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {locations.length > 0 ? (
            locations.map((location, index) => (
              <motion.div
                key={location.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={location.image_url || 'https://images.unsplash.com/photo-1593563972583-f9339411b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                      alt={`${location.name} facility`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1593563972583-f9339411b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <Badge className={statusColors[location.status] || 'bg-gray-100 text-gray-800'}>
                        {location.status || 'Coming Soon'}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-bold text-lg">{location.name}</h3>
                      <p className="text-emerald-200 text-sm">{location.city}, {location.state || location.province}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {location.description && (
                      <p className="text-gray-600 text-sm mb-4">{location.description}</p>
                    )}
                    {location.features && location.features.length > 0 && (
                      <div className="space-y-2">
                        {location.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 text-lg">No locations available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}