import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { getLocations } from '../../lib/supabase';

export default function CountrySelectorSection() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountriesData();
  }, []);

  const fetchCountriesData = async () => {
    try {
      setLoading(true);
      const locations = await getLocations();
      
      // Group locations by country
      const countriesMap = {};
      locations?.forEach(location => {
        const country = location.country;
        if (!countriesMap[country]) {
          countriesMap[country] = {
            name: country,
            flag: getCountryFlag(country),
            status: getCountryStatus(country),
            locations: [],
            description: getCountryDescription(country),
            image: location.image_url || getDefaultCountryImage(country),
            available: true,
            link: country.toLowerCase() === 'canada' ? createPageUrl('Canada') : '#'
          };
        }
        countriesMap[country].locations.push(location.name || location.city);
      });
      
      setCountries(Object.values(countriesMap));
    } catch (error) {
      console.error('Error fetching countries data:', error);
      // Fallback to static data if fetch fails
      setCountries([
        {
          name: "Canada",
          flag: "🇨🇦",
          status: "Launching Early 2026",
          locations: ["Milton", "Mississauga", "Brampton"],
          description: "Bringing Australian cricket excellence to the Greater Toronto Area with state-of-the-art facilities.",
          image: "https://media.licdn.com/dms/image/v2/C561BAQEIKtxD6I1XqA/company-background_10000/company-background_10000/0/1588034264143/icc_world_t20_cover?e=2147483647&v=beta&t=-6DA5uUw2c7jC3PuyV0_LNbm3jAGd0gDTw5MnJT_cTU",
          available: true,
          link: createPageUrl("Canada")
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getCountryFlag = (country) => {
    const flags = {
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧'
    };
    return flags[country] || '🌍';
  };

  const getCountryStatus = (country) => {
    const statuses = {
      'Canada': 'Launching Early 2026',
      'Australia': 'Established Programs'
    };
    return statuses[country] || 'Coming Soon';
  };

  const getCountryDescription = (country) => {
    const descriptions = {
      'Canada': 'Bringing Australian cricket excellence to the Greater Toronto Area with state-of-the-art facilities.',
      'Australia': 'Our flagship programs in the cricket capital of the world, where our journey began.'
    };
    return descriptions[country] || `Expanding cricket excellence to ${country}.`;
  };

  const getDefaultCountryImage = (country) => {
    const images = {
      'Canada': 'https://media.licdn.com/dms/image/v2/C561BAQEIKtxD6I1XqA/company-background_10000/company-background_10000/0/1588034264143/icc_world_t20_cover?e=2147483647&v=beta&t=-6DA5uUw2c7jC3PuyV0_LNbm3jAGd0gDTw5MnJT_cTU',
      'Australia': 'https://resources.cricket-nt.pulselive.com/photo-resources/2024/04/30/d34eacba-4e8f-406a-a797-aa2f3514886f/U12s-Waratah-PINT-1.jpg?width=950&height=535'
    };
    return images[country] || 'https://images.unsplash.com/photo-1593563972583-f9339411b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  const statusColors = {
    "Launching Early 2026": "bg-emerald-100 text-emerald-800",
    "Established Programs": "bg-blue-100 text-blue-800",
    "Coming Soon": "bg-yellow-100 text-yellow-800",
  };

  if (loading) {
    return (
      <section id="country-selector" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-full max-w-4xl mx-auto"></div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-56 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
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
          {countries.length > 0 ? (
            countries.map((country, index) => (
              <motion.div
                key={country.name || index}
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
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1593563972583-f9339411b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 flex items-center gap-3">
                      <span className="text-5xl drop-shadow-lg">{country.flag}</span>
                    </div>

                    <div className="absolute bottom-4 left-4">
                       <Badge className={`${statusColors[country.status] || 'bg-gray-100 text-gray-800'} mb-2`}>
                        {country.status}
                      </Badge>
                      <h3 className="text-white font-bold text-3xl mb-2 drop-shadow-md">{country.name}</h3>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{country.description}</p>
                    
                    {country.locations && country.locations.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Available Locations:</h4>
                        <div className="flex flex-wrap gap-2">
                          {country.locations.slice(0, 3).map((location, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {location}
                            </Badge>
                          ))}
                          {country.locations.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{country.locations.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
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
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500 text-lg">No countries available at the moment.</p>
            </div>
          )}
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