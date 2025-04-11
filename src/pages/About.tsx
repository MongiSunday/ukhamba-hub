
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from '@/components/AboutHero';
import MissionVision from '@/components/MissionVision';
import Leadership from '@/components/Leadership';
import CommunityImpact from '@/components/CommunityImpact';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <AboutHero />
        <MissionVision />
        <Leadership />
        <CommunityImpact />
      </main>
      <Footer />
    </div>
  );
};

export default About;
