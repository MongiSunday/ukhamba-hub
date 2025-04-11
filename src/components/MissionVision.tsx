
import React from 'react';
import { Award, Heart, Users, BookOpen } from 'lucide-react';

const MissionVision = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Mission & Vision</h2>
          <div className="w-24 h-1 bg-ukhamba-teal mx-auto mb-8"></div>
          <p className="text-lg text-foreground/80">
            We don't just address problems—we create solutions. Our mission is to foster unity, 
            equip youth, support those in need, and celebrate South Africa's cultural heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-ukhamba-cream p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Award className="text-ukhamba-terracotta mr-3" size={28} />
              Our Mission
            </h3>
            <p className="mb-4">
              At Ukhamba Communicare, our mission is to educate, empower, and uplift individuals 
              in South African communities through informative content, resources, and engagement 
              on critical social issues.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Heart className="text-ukhamba-terracotta mr-3 mt-1" size={20} />
                <span>Foster a culture of tolerance and unity.</span>
              </li>
              <li className="flex items-start">
                <Users className="text-ukhamba-terracotta mr-3 mt-1" size={20} />
                <span>Equip young people with the skills to build a brighter future.</span>
              </li>
              <li className="flex items-start">
                <BookOpen className="text-ukhamba-terracotta mr-3 mt-1" size={20} />
                <span>Offer counseling and support to those affected by violence and mental health struggles.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-ukhamba-sand p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Award className="text-ukhamba-teal mr-3" size={28} />
              Our Vision
            </h3>
            <p className="mb-4">
              Our vision is a South Africa where every individual has access to the resources, knowledge, 
              and support they need to thrive. We envision communities where:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Heart className="text-ukhamba-teal mr-3 mt-1" size={20} />
                <span>People live free from violence, discrimination, and poverty.</span>
              </li>
              <li className="flex items-start">
                <Users className="text-ukhamba-teal mr-3 mt-1" size={20} />
                <span>Youth are empowered to become leaders and change-makers.</span>
              </li>
              <li className="flex items-start">
                <BookOpen className="text-ukhamba-teal mr-3 mt-1" size={20} />
                <span>Cultural heritage is celebrated and preserved through generations.</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 text-center bg-gradient-to-r from-ukhamba-terracotta to-ukhamba-teal p-10 rounded-lg text-white">
          <p className="text-xl md:text-2xl font-bold italic">
            "We believe in the power of community, education, and action to drive lasting change. 
            Join us as we rewrite the future, one empowered individual at a time."
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
