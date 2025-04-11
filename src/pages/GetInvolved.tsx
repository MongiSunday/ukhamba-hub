
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GetInvolvedHero from '@/components/GetInvolvedHero';
import VolunteerSection from '@/components/VolunteerSection';
import PartnershipSection from '@/components/PartnershipSection';

const GetInvolved = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <GetInvolvedHero />
        <VolunteerSection />
        <PartnershipSection />
      </main>
      <Footer />
    </div>
  );
};

export default GetInvolved;
