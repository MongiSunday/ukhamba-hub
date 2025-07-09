
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { scrollToTop } from '@/hooks/useScrollToTop';

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ukhamba Communicare</h3>
            <p className="text-white/70 mb-6">
              Empowering South African communities through education, resources, and support to address social challenges and foster positive change.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-ukhamba-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-ukhamba-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-ukhamba-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/70 hover:text-ukhamba-gold transition-colors" onClick={scrollToTop}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-white/70 hover:text-ukhamba-gold transition-colors" onClick={scrollToTop}>
                  Our Programs
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/70 hover:text-ukhamba-gold transition-colors" onClick={scrollToTop}>
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="text-white/70 hover:text-ukhamba-gold transition-colors" onClick={scrollToTop}>
                  Get Involved
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-white/70 hover:text-ukhamba-gold transition-colors" onClick={scrollToTop}>
                  Donate
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-ukhamba-gold shrink-0 mr-3 mt-1" />
                <span className="text-white/70">
                  123 Community Way, <br />
                  Johannesburg, 2000, <br />
                  South Africa
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-ukhamba-gold shrink-0 mr-3" />
                <a href="tel:+27123456789" className="text-white/70 hover:text-ukhamba-gold transition-colors">
                  +27 12 345 6789
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-ukhamba-gold shrink-0 mr-3" />
                <a href="mailto:info@ukhamba.org" className="text-white/70 hover:text-ukhamba-gold transition-colors">
                  info@ukhamba.org
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter Brief */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
            <p className="text-white/70 mb-4">
              To educate, empower, and uplift individuals in South African communities through informative content, resources, and engagement on critical social issues.
            </p>
            <Link to="/about" className="text-ukhamba-gold hover:text-ukhamba-gold/80 font-medium" onClick={scrollToTop}>
              Learn More About Our Work →
            </Link>
          </div>
        </div>
        
        <hr className="border-white/10 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Ukhamba Communicare. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-white/50 text-sm hover:text-ukhamba-gold transition-colors" onClick={scrollToTop}>
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/50 text-sm hover:text-ukhamba-gold transition-colors" onClick={scrollToTop}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
