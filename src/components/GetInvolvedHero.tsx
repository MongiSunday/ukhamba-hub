
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const GetInvolvedHero = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-ukhamba-cream to-ukhamba-sand overflow-hidden">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Involved</h1>
          <div className="w-24 h-1 bg-ukhamba-terracotta mx-auto mb-8"></div>
          <p className="text-lg text-foreground/80 mb-8">
            Join our mission to transform South African communities through education, 
            empowerment, and advocacy. There are many ways to contribute – whether through 
            volunteering your time or forming a partnership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white"
              onClick={() => document.getElementById('volunteer-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Volunteer With Us
            </Button>
            <Button 
              variant="outline" 
              className="border-ukhamba-teal text-ukhamba-teal hover:bg-ukhamba-teal hover:text-white"
              asChild
            >
              <Link to="/donate">Make a Donation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedHero;
