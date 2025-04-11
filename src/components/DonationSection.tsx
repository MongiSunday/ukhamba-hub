
import React from 'react';
import WhyDonateCard from './donation/WhyDonateCard';
import DonationForm from './donation/DonationForm';

const DonationSection = () => {
  return (
    <section id="donation-form" className="py-16 bg-muted">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <WhyDonateCard />
          </div>
          
          <div className="lg:col-span-7">
            <DonationForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
