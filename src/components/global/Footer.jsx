import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { getSiteSettings } from '../../lib/supabase';

export default function Footer() {
  const [siteSettings, setSiteSettings] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Fetch site settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const settings = await getSiteSettings();
        setSiteSettings(settings);
      } catch (error) {
        console.error('Error fetching site settings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);
  
  // Dynamic social links from settings or fallback to static
  const socialLinks = [
    { icon: Twitter, href: siteSettings.social_media?.twitter || '#', label: 'Twitter' },
    { icon: Facebook, href: siteSettings.social_media?.facebook || '#', label: 'Facebook' },
    { icon: Instagram, href: siteSettings.social_media?.instagram || '#', label: 'Instagram' },
    { icon: Youtube, href: siteSettings.social_media?.youtube || '#', label: 'YouTube' },
    { icon: Linkedin, href: siteSettings.social_media?.linkedin || '#', label: 'LinkedIn' }
  ];

  const quickLinks = [
    'About Us', // Global About Us
    'Programs', // Global Programs
    'Coaches', // Global Coaches
    'Locations', // Global Locations selector
    'Registration', // Global waitlist/registration
    'Contact Us' // Global Contact
  ];

  return (
    <footer className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              {/* <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center"> */}
                <img
                  src="/cricket-cadets.png"
                  alt="Cricket Cadet"
                  className=" h-16 auto"
                />
              {/* </div> */}
              <div>
                <h3 className="text-2xl font-bold">{siteSettings.site_name || 'Cricket Cadet'}</h3>
                <p className="text-emerald-200">{siteSettings.site_tagline || "World's Premier Junior Cricket Academy"}</p>
              </div>
            </div>
            
            <p className="text-emerald-100 leading-relaxed mb-6 max-w-md">
              {siteSettings.site_description || 'Developing the next generation of global cricket talent through expert Australian coaching, proven methodologies, and a passion for the game.'}
            </p>

            <div className="flex flex-wrap gap-3">
              <Badge className="bg-amber-500 text-amber-900 hover:bg-amber-400">
                Ages 8-17
              </Badge>
              <Badge className="bg-emerald-600 text-white hover:bg-emerald-500">
                Global Reach
              </Badge>
              <Badge className="bg-white text-emerald-800 hover:bg-gray-100">
                Elite Coaches
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.toLowerCase().replace(/ /g, '-')} // Simple slug for now, better to use createPageUrl if these are pages
                    className="text-emerald-200 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-bold mb-6">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-300" />
                <div>
                  <p className="text-emerald-100">Email us at:</p>
                  <a 
                    href={`mailto:${siteSettings.contact_email || 'info@cricketcadet.ca'}`} 
                    className="text-white hover:text-amber-300 transition-colors"
                  >
                    {siteSettings.contact_email || 'info@cricketcadet.ca'}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-300" />
                <div>
                  <p className="text-emerald-100">Global Enquiries:</p>
                  <a 
                    href={`tel:${siteSettings.contact_phone || '+12898153123'}`} 
                    className="text-white hover:text-amber-300 transition-colors"
                  >
                    {siteSettings.contact_phone || '+1 (289) 815-3123'}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-300 mt-1" />
                <div>
                  <p className="text-emerald-100">Global Presence:</p>
                  <p className="text-white">{siteSettings.contact_address || 'Australia, Canada + More'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-emerald-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-emerald-200 font-medium">Follow us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-emerald-700 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-emerald-200 text-sm">
                © {new Date().getFullYear()} {siteSettings.site_name || 'Cricket Cadet Academy'}. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-2">
                <a href="#" className="text-emerald-300 hover:text-white text-xs">Privacy Policy</a>
                <a href="#" className="text-emerald-300 hover:text-white text-xs">Terms of Service</a>
                <a href="#" className="text-emerald-300 hover:text-white text-xs">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}