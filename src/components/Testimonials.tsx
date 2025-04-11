
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "The youth development program has given me the confidence and skills to make a real difference in my community. I'm now leading a local initiative to improve education access.",
    name: "Themba Ndlovu",
    role: "Community Leader, Cape Town"
  },
  {
    id: 2,
    quote: "As a survivor of gender-based violence, Ukhamba's support programs gave me hope and a path forward. Now I help other women find their voice and strength.",
    name: "Nomzamo Khumalo",
    role: "Advocate & Volunteer"
  },
  {
    id: 3,
    quote: "The mental health resources provided by Ukhamba have transformed how our township addresses psychological wellness. The stigma is decreasing, and more people are seeking help.",
    name: "Dr. Sipho Mthembu",
    role: "Healthcare Professional, Johannesburg"
  },
  {
    id: 4,
    quote: "Partnering with Ukhamba has amplified our impact in rural communities. Their approach to community development is both respectful and effective.",
    name: "Sarah Mokoena",
    role: "NGO Director"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay]);

  const handlePrevious = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-ukhamba-cream">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Voices of <span className="text-ukhamba-gold">Change</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Hear from community members and partners about the impact of our programs and initiatives across South Africa.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute -left-12 top-1/2 -translate-y-1/2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white shadow-md hover:bg-ukhamba-terracotta hover:text-white"
              onClick={handlePrevious}
            >
              <ChevronLeft size={24} />
            </Button>
          </div>
          
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="pt-12 pb-10 px-6 sm:px-12">
              <div className="flex justify-center mb-6">
                <div className="bg-ukhamba-gold/10 rounded-full p-4">
                  <Quote size={32} className="text-ukhamba-gold" />
                </div>
              </div>
              
              <blockquote className="text-center">
                <p className="text-xl md:text-2xl italic text-foreground/80 mb-8">
                  "{testimonials[currentIndex].quote}"
                </p>
                <footer>
                  <p className="font-bold text-ukhamba-terracotta text-lg">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-foreground/60">
                    {testimonials[currentIndex].role}
                  </p>
                </footer>
              </blockquote>
            </CardContent>
          </Card>
          
          <div className="hidden md:block absolute -right-12 top-1/2 -translate-y-1/2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white shadow-md hover:bg-ukhamba-terracotta hover:text-white"
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </Button>
          </div>
          
          {/* Mobile navigation */}
          <div className="flex justify-center space-x-4 mt-6 md:hidden">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white shadow-md hover:bg-ukhamba-terracotta hover:text-white"
              onClick={handlePrevious}
            >
              <ChevronLeft size={18} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white shadow-md hover:bg-ukhamba-terracotta hover:text-white"
              onClick={handleNext}
            >
              <ChevronRight size={18} />
            </Button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-ukhamba-gold' : 'bg-gray-300'
                }`}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentIndex(index);
                }}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
