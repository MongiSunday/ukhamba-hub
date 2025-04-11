
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold font-ubuntu">
              <span className="text-ukhamba-terracotta">Ukhamba</span>
              <span className="text-ukhamba-teal">Communicare</span>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-ukhamba-terracotta"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-ukhamba-terracotta font-medium">
            Home
          </Link>
          <Link to="/about" className="text-foreground hover:text-ukhamba-terracotta font-medium">
            About Us
          </Link>
          <Link to="/programs" className="text-foreground hover:text-ukhamba-terracotta font-medium">
            Programs
          </Link>
          <Link to="/gallery" className="text-foreground hover:text-ukhamba-terracotta font-medium">
            Gallery
          </Link>
          <Link to="/contact" className="text-foreground hover:text-ukhamba-terracotta font-medium">
            Contact
          </Link>
        </nav>

        {/* CTA Buttons (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/get-involved">
            <Button variant="outline" className="border-ukhamba-terracotta text-ukhamba-terracotta hover:bg-ukhamba-terracotta hover:text-white">
              Get Involved
            </Button>
          </Link>
          <Link to="/donate">
            <Button className="bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white">
              Donate
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 inset-x-0 bg-white shadow-md py-4 px-6 z-20">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-ukhamba-terracotta font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-ukhamba-terracotta font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/programs" 
                className="text-foreground hover:text-ukhamba-terracotta font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Programs
              </Link>
              <Link 
                to="/gallery" 
                className="text-foreground hover:text-ukhamba-terracotta font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/contact" 
                className="text-foreground hover:text-ukhamba-terracotta font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-3 pt-3">
                <Link to="/get-involved" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-ukhamba-terracotta text-ukhamba-terracotta hover:bg-ukhamba-terracotta hover:text-white">
                    Get Involved
                  </Button>
                </Link>
                <Link to="/donate" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white">
                    Donate
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
