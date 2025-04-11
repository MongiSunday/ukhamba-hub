
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import LocationMap from '@/components/LocationMap';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Contact Us</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                Have questions or want to connect? We're here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information and Form */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  We're eager to hear from you. Whether you have questions about our programs, 
                  want to collaborate, or just want to share your thoughts, use any of these channels to reach us.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin size={24} className="text-ukhamba-terracotta mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg">Visit Us</h3>
                      <p className="text-muted-foreground">
                        123 Community Way<br />
                        Johannesburg, 2000<br />
                        South Africa
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone size={24} className="text-ukhamba-terracotta mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg">Call Us</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+27123456789" className="hover:text-ukhamba-terracotta transition-colors">
                          +27 12 345 6789
                        </a>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Monday-Friday: 9am - 5pm<br />
                        Saturday: 10am - 2pm
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail size={24} className="text-ukhamba-terracotta mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg">Email Us</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:info@ukhamba.org" className="hover:text-ukhamba-terracotta transition-colors">
                          info@ukhamba.org
                        </a>
                      </p>
                      <p className="text-muted-foreground">
                        <a href="mailto:support@ukhamba.org" className="hover:text-ukhamba-terracotta transition-colors">
                          support@ukhamba.org
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="mt-10">
                  <h3 className="font-medium text-lg mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                      className="bg-foreground text-white p-3 rounded-full hover:bg-ukhamba-terracotta transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                      className="bg-foreground text-white p-3 rounded-full hover:bg-ukhamba-terracotta transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                      className="bg-foreground text-white p-3 rounded-full hover:bg-ukhamba-terracotta transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                      className="bg-foreground text-white p-3 rounded-full hover:bg-ukhamba-terracotta transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Find Us</h2>
            <div className="rounded-lg overflow-hidden shadow-lg h-[400px] md:h-[500px]">
              <LocationMap />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
