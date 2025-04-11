
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ProgramHero = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-ukhamba-cream to-ukhamba-sand overflow-hidden">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Programs & Initiatives</h1>
          <div className="w-24 h-1 bg-ukhamba-terracotta mx-auto mb-8"></div>
          <p className="text-lg text-foreground/80 mb-8">
            At Ukhamba Communicare, we don't just talk about change—we create it. Through powerful 
            programs and initiatives, we are building a future where knowledge, empowerment, and 
            community come together to uplift every South African.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white"
              asChild
            >
              <Link to="/get-involved">Get Involved</Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-ukhamba-teal text-ukhamba-teal hover:bg-ukhamba-teal hover:text-white"
              asChild
            >
              <Link to="/donate">Support Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramHero;
