
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { featuredPrograms } from '@/data/programs';
import { scrollToTop } from '@/hooks/useScrollToTop';

const FeaturedPrograms = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Impact <span className="text-ukhamba-terracotta">Programs</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Transformative initiatives addressing key social challenges in South African communities, fostering sustainable change and empowerment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPrograms.map((program) => (
            <Card key={program.id} className="overflow-hidden card-hover">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-ukhamba-terracotta">{program.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{program.description}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full border-ukhamba-teal text-ukhamba-teal hover:bg-ukhamba-teal hover:text-white"
                  asChild
                >
                  <Link to={`/programs/${program.id}`} onClick={scrollToTop}>Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            className="bg-ukhamba-teal hover:bg-ukhamba-teal/90 text-white"
            asChild
          >
            <Link to="/programs" onClick={scrollToTop}>View All Programs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
