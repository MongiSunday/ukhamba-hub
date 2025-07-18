
import React from 'react';
import { useCloudflareImages } from '@/hooks/useCloudflareImages';

const leadershipTeam = [
  {
    name: "Thando Nkosi",
    position: "Founder & Executive Director",
    bio: "Thando founded Ukhamba Communicare with a vision to transform South African communities through education and empowerment. With over 15 years of experience in community development and social activism, she has dedicated her life to creating opportunities for the marginalized."
  },
  {
    name: "Sipho Mabaso",
    position: "Programs Director",
    bio: "Sipho oversees all Ukhamba programs, bringing 10 years of experience in educational program development. His passion for youth empowerment has shaped our most successful initiatives, reaching thousands of young South Africans annually."
  },
  {
    name: "Nomsa Dlamini",
    position: "Community Relations",
    bio: "With deep roots in grassroots organizing, Nomsa manages our relationships with community partners and stakeholders. Her expertise in conflict resolution and community engagement ensures our programs address real community needs."
  },
  {
    name: "Mandla Khumalo",
    position: "Media & Communications",
    bio: "A former journalist with a passion for storytelling, Mandla leads our media initiatives. He leverages the power of television, radio, and social media to amplify community voices and create awareness about critical social issues."
  }
];

const Leadership = () => {
  const { images, getImageByIndex } = useCloudflareImages('community');

  return (
    <section className="py-16 bg-gradient-to-r from-ukhamba-cream to-ukhamba-sand">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Leadership Team</h2>
          <div className="w-24 h-1 bg-ukhamba-gold mx-auto mb-8"></div>
          <p className="text-lg text-foreground/80">
            Meet the dedicated individuals who guide our organization and drive our mission forward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadershipTeam.map((leader, index) => {
            const leaderImage = getImageByIndex(index);
            return (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="h-64 overflow-hidden bg-gradient-to-br from-ukhamba-cream to-ukhamba-sand flex items-center justify-center">
                  {leaderImage ? (
                    <img 
                      src={leaderImage.fullUrl} 
                      alt={leader.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center text-ukhamba-terracotta font-bold text-lg">
                      {leader.name.split(' ').map(name => name[0]).join('')}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                  <p className="text-ukhamba-terracotta font-medium mb-3">{leader.position}</p>
                  <p className="text-foreground/80 text-sm">{leader.bio}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg font-medium">
            Our team is supported by dedicated staff and volunteers who share our commitment to 
            creating positive change in South African communities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
