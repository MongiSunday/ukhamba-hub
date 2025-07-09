
import React from 'react';
import { Link } from 'react-router-dom';
import ProgramCard from './ProgramCard';
import { Button } from '@/components/ui/button';
import { programCategories } from '@/data/programs';
import { scrollToTop } from '@/hooks/useScrollToTop';

const ProgramCategories = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-custom">
        {programCategories.map((category, index) => (
          <div 
            key={category.id} 
            className={`mb-20 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
              <div className={`w-20 h-1 ${index % 2 === 0 ? 'bg-ukhamba-terracotta' : 'bg-ukhamba-teal'} mb-6`}></div>
              <p className="text-lg text-foreground/80 max-w-3xl mb-8">
                {category.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.programs.map(program => (
                <ProgramCard 
                  key={program.id}
                  title={program.title}
                  description={program.description}
                  image={program.image}
                  programId={program.id}
                />
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button 
                variant="outline" 
                className="border-ukhamba-terracotta text-ukhamba-terracotta hover:bg-ukhamba-terracotta hover:text-white"
                asChild
              >
                <Link to="/programs" onClick={scrollToTop}>View All {category.title} Programs</Link>
              </Button>
            </div>
          </div>
        ))}
        
        <div className="mt-16 pt-10 border-t border-muted text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Movement</h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-8">
            Ukhamba Communicare is not just an organization—it is a movement. Every program, 
            every initiative, and every conversation is a step toward a South Africa where empowerment 
            replaces fear, education replaces ignorance, and community replaces isolation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white" asChild>
              <Link to="/get-involved" onClick={scrollToTop}>Volunteer With Us</Link>
            </Button>
            <Button className="bg-ukhamba-teal hover:bg-ukhamba-teal/90 text-white" asChild>
              <Link to="/donate" onClick={scrollToTop}>Donate Now</Link>
            </Button>
            <Button variant="outline" className="border-ukhamba-gold text-ukhamba-gold hover:bg-ukhamba-gold hover:text-white" asChild>
              <Link to="/contact" onClick={scrollToTop}>Partner With Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramCategories;
