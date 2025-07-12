
import React from 'react';
import { Users, Award, BookOpen, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCloudflareImages } from '@/hooks/useCloudflareImages';
import { scrollToTop } from '@/hooks/useScrollToTop';

const impactStats = [
  {
    icon: <Users size={32} />,
    number: "25,000+",
    label: "Individuals Reached"
  },
  {
    icon: <Award size={32} />,
    number: "120+",
    label: "Community Workshops"
  },
  {
    icon: <BookOpen size={32} />,
    number: "45",
    label: "School Programs"
  },
  {
    icon: <Heart size={32} />,
    number: "18",
    label: "Community Partners"
  }
];

const successStories = [
  {
    title: "Youth Empowerment Initiative",
    description: "Our flagship youth program has equipped over 1,000 young South Africans with leadership skills, resulting in a 65% increase in community engagement and a 40% reduction in school dropout rates in participating communities.",
  },
  {
    title: "Gender-Based Violence Awareness",
    description: "Through our GBV awareness campaign, we've created safe spaces for over 5,000 survivors, provided counseling services, and seen a 30% increase in reporting of incidents in areas where our programs operate.",
  },
  {
    title: "Cultural Heritage Preservation",
    description: "Our cultural heritage initiative has documented traditions from 15 different South African cultures, created intergenerational dialogue opportunities, and trained 200+ youth as cultural ambassadors in their communities.",
  }
];

const CommunityImpact = () => {
  const { getRandomImage } = useCloudflareImages('community');
  const impactImage = getRandomImage();

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Impact</h2>
          <div className="w-24 h-1 bg-ukhamba-teal mx-auto mb-8"></div>
          <p className="text-lg text-foreground/80">
            Since our founding in 2021, we've made significant strides in transforming 
            communities across South Africa. Here's the impact we've created together.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {impactStats.map((stat, index) => (
            <div key={index} className="bg-ukhamba-cream rounded-lg p-6 text-center">
              <div className="text-ukhamba-terracotta mb-3 flex justify-center">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.number}</h3>
              <p className="text-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-8 text-center">Success Stories</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <div key={index} className="bg-white border border-ukhamba-sand rounded-lg p-6 shadow-md">
              <h4 className="text-xl font-bold mb-4 text-ukhamba-terracotta">{story.title}</h4>
              <p className="text-foreground/80">{story.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-ukhamba-sand p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Join Our Cause</h3>
              <p className="mb-4">
                The work we do would not be possible without the support of our community. 
                Whether through donations, volunteering, or partnerships, your contribution 
                makes a difference in the lives of thousands of South Africans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/get-involved" className="bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white px-6 py-3 rounded-md font-medium inline-flex items-center justify-center" onClick={scrollToTop}>
                  Get Involved
                </Link>
                <Link to="/donate" className="border border-ukhamba-gold text-ukhamba-gold hover:bg-ukhamba-gold hover:text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center" onClick={scrollToTop}>
                  Donate Now
                </Link>
              </div>
            </div>
            <div>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-ukhamba-teal rounded-lg"></div>
                {impactImage && (
                  <img 
                    src={impactImage.fullUrl} 
                    alt={impactImage.alt || "Community impact"}
                    loading="lazy"
                    className="rounded-lg relative z-10 object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;
