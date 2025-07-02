
import React from 'react';
import { useCloudflareImages } from '@/hooks/useCloudflareImages';

const AboutHero = () => {
  const { getRandomImage } = useCloudflareImages('community');
  const heroImage = getRandomImage();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-ukhamba-cream to-ukhamba-sand overflow-hidden">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <div className="w-24 h-1 bg-ukhamba-terracotta mx-auto mb-8"></div>
          <p className="text-lg text-foreground/80">
            Founded in 2021, Ukhamba Communicare is a South African non-profit organization 
            dedicated to empowering individuals and transforming communities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
            <p className="mb-4">
              Welcome to Ukhamba Communicare, a South African non-profit organization dedicated to 
              empowering individuals and transforming communities. Founded in 2021, our mission is 
              rooted in the belief that attainment of knowledge is the key to opportunity. We exist 
              to inspire hope, uplift lives, and create a South Africa where no one is left behind.
            </p>
            <p className="mb-4">
              Our work is driven by the urgent need to address critical social issues, including 
              unemployment, poverty, gender-based violence, school bullying, drug and alcohol abuse, 
              and mental health challenges. We use the power of television, radio, film, theatre, 
              and social media to educate, inform, and empower people across the nation.
            </p>
            <p>
              At Ukhamba Communicare, we collaborate with churches, schools, higher education 
              institutions, and traditional leaders to reach communities at their core. Through 
              dynamic workshops, stage plays, youth empowerment programs, and outreach initiatives, 
              we provide safe spaces for individuals to share their stories, heal, and grow.
            </p>
          </div>
          <div className="relative">
            <div className="bg-white p-2 shadow-xl rounded-lg transform rotate-2">
              <img 
                src={heroImage?.fullUrl || "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"} 
                alt={heroImage?.alt || "Team working together"} 
                className="w-full h-auto rounded"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-ukhamba-terracotta p-8 rounded-lg shadow-lg z-10">
              <p className="text-white font-bold text-xl">Together, we rise.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
