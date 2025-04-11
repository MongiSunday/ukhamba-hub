
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DonationSection from '@/components/DonationSection';

const Donations = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gradient-to-r from-ukhamba-cream to-ukhamba-sand overflow-hidden">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Our Cause</h1>
              <div className="w-24 h-1 bg-ukhamba-terracotta mx-auto mb-8"></div>
              <p className="text-lg text-foreground/80 mb-8">
                Your financial contribution helps us create lasting positive change in communities
                across South Africa. Every donation, no matter the size, makes a difference.
              </p>
            </div>
          </div>
        </section>
        <DonationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Donations;
