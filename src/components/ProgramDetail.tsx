
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Calendar, Users, MapPin } from 'lucide-react';

interface ProgramDetailProps {
  id: string;
  title: string;
  description: string;
  image: string;
  longDescription?: string;
  impact?: string;
  location?: string;
  date?: string;
  participants?: string;
}

const ProgramDetail = ({
  id,
  title,
  description,
  image,
  longDescription = 'This program aims to create lasting impact in South African communities through awareness, education, and community engagement.',
  impact = 'Over 1,000 individuals have benefited from this initiative since its inception.',
  location = 'Various locations across South Africa',
  date = 'Ongoing',
  participants = 'Open to all'
}: ProgramDetailProps) => {
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg overflow-hidden mb-8">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-auto"
            />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-foreground/80 mb-6">{description}</p>
          
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center text-foreground/70">
              <Calendar size={18} className="mr-2 text-ukhamba-terracotta" />
              <span>{date}</span>
            </div>
            <div className="flex items-center text-foreground/70">
              <MapPin size={18} className="mr-2 text-ukhamba-terracotta" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-foreground/70">
              <Users size={18} className="mr-2 text-ukhamba-terracotta" />
              <span>{participants}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-10">
            <Button className="bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white">
              Join This Program
            </Button>
            <Button variant="outline" className="border-ukhamba-teal text-ukhamba-teal hover:bg-ukhamba-teal hover:text-white">
              Donate
            </Button>
            <Button variant="ghost" className="text-foreground/70">
              <Share2 size={18} className="mr-2" /> Share
            </Button>
          </div>
          
          <div className="space-y-6 mb-10">
            <h2 className="text-2xl font-bold">About This Program</h2>
            <p className="text-foreground/80">
              {longDescription}
            </p>
            
            <h2 className="text-2xl font-bold">Impact</h2>
            <p className="text-foreground/80">
              {impact}
            </p>
          </div>
          
          <div className="bg-ukhamba-cream p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Get Involved</h3>
            <p className="mb-4">
              Interested in participating or supporting this program? Contact us to learn more.
            </p>
            <Button className="bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
