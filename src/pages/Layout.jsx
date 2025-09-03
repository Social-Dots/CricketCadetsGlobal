

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/global/Footer';
import { getNavigationMenu, getSiteSettings } from '../lib/supabase';

const AnimatedCricketCadet = ({ className }) => {
  const text = "Cricket Cadet";
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex font-bold tracking-wide ${className}`}
      aria-label={text}>

        {letters.map((letter, index) =>
      <motion.span key={index} variants={letterVariants}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
      )}
      </motion.div>);

};

export default function Layout({ children, currentPageName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navLinks, setNavLinks] = useState([]);
  const [siteSettings, setSiteSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegisterClick = () => {
    // Dispatch event only if on the global home or specific country page that handles registration
    window.dispatchEvent(new CustomEvent('showRegistration'));
    setIsMenuOpen(false);
  };

  // Fetch navigation and site settings on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch navigation menu for global layout
        const navigationData = await getNavigationMenu('global');
        if (navigationData && navigationData.menu_items) {
          setNavLinks(navigationData.menu_items);
        } else {
          // Fallback to static navigation if no data found
          setNavLinks([
            { name: 'About Us', href: '#about-us' },
            { name: 'Programs', href: '#global-programs' },
            { name: 'Coaches', href: '#global-coaches' },
            { name: 'Locations', href: '#country-selector' }
          ]);
        }
        
        // Fetch site settings
        const settings = await getSiteSettings();
        setSiteSettings(settings);
        
      } catch (error) {
        console.error('Error fetching navigation data:', error);
        // Fallback to static navigation on error
        setNavLinks([
          { name: 'About Us', href: '#about-us' },
          { name: 'Programs', href: '#global-programs' },
          { name: 'Coaches', href: '#global-coaches' },
          { name: 'Locations', href: '#country-selector' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    // Special case for scrolling to top or direct page navigation
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMenuOpen(false);
      return;
    }

    // Handle internal section scroll within the current page
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('header')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="relative">
            {/* Fixed Navigation Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMenuOpen ?
      'bg-emerald-900/95 shadow-lg backdrop-blur-sm' :
      'bg-transparent'}`
      }>
                <nav className="max-w-7xl mx-auto px-6 py-2">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <a
              href="/" // Link to global homepage
              className="text-white hover:opacity-80 transition-opacity flex items-center">

                           <img 
                             src="/cricket-cadets.png" 
                             alt="Cricket Cadets Logo" 
                             className="h-24 w-24 object-contain"
                           />


                        </a>
                        
                        {/* Desktop Navigation Menu */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) =>
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-emerald-100 hover:text-white transition-colors text-sm font-medium relative group">

                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                                </a>
              )}
                        </div>
                        
                        {/* Desktop CTA Button */}
                        <div className="hidden lg:flex items-center">
                            <Button
                onClick={handleRegisterClick}
                className="bg-amber-500 hover:bg-amber-600 text-amber-900 font-bold px-6 py-2 text-sm rounded-lg shadow-md hover:shadow-amber-500/20 transition-all duration-300 hover:scale-105">

                                Join Expression of Interest
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>

                        {/* Mobile Hamburger Menu Button */}
                        <div className="lg:hidden">
                            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:bg-white/10 transition-colors"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}>

                                <motion.div
                  initial={false}
                  animate={isMenuOpen ? "open" : "closed"}>

                                    {isMenuOpen ?
                  <X className="w-6 h-6" /> :

                  <Menu className="w-6 h-6" />
                  }
                                </motion.div>
                            </Button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen &&
        <>
                        {/* Background Overlay */}
                        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMenuOpen(false)} />

                        
                        {/* Mobile Menu Panel */}
                        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[80px] left-0 right-0 z-50 bg-emerald-900/95 backdrop-blur-sm shadow-xl lg:hidden">

                            <div className="p-6">
                                <nav className="flex flex-col gap-6 items-center">
                                    {navLinks.map((link, index) => // Corrected map signature
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-emerald-100 hover:text-white transition-colors text-lg font-medium py-2 px-4 rounded-lg hover:bg-white/10 w-full text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}>

                                            {link.name}
                                        </motion.a>
                )}
                                    
                                    {/* Mobile CTA Button */}
                                    <motion.div
                  className="mt-4 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}>

                                        <Button
                    onClick={handleRegisterClick}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-amber-900 font-bold px-8 py-3 text-base rounded-lg shadow-md hover:shadow-amber-500/20 transition-all duration-300">

                                            Join Expression of Interest
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </motion.div>
                                </nav>
                            </div>
                        </motion.div>
                    </>
        }
            </AnimatePresence>

            {/* Main Content with proper spacing */}
            <main>{children}</main>
            <Footer />
        </div>);

}1
