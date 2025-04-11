
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgramHero from '@/components/ProgramHero';
import ProgramCategories from '@/components/ProgramCategories';

const Programs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ProgramHero />
        <ProgramCategories />
      </main>
      <Footer />
    </div>
  );
};

export default Programs;
