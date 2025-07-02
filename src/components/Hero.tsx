
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getGalleryImages } from '@/data/gallery/images';
import { CloudflareImage } from '@/types/gallery';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState<CloudflareImage | null>(null);
  const [images, setImages] = useState<CloudflareImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const galleryImages = await getGalleryImages();
        if (galleryImages.length > 0) {
          setImages(galleryImages);
          setCurrentImage(galleryImages[0]);
        }
      } catch (error) {
        console.error('Failed to load hero images:', error);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % images.length;
          setCurrentImage(images[nextIndex]);
          return nextIndex;
        });
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-r from-ukhamba-cream to-ukhamba-sand overflow-hidden">
      {currentImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 transition-opacity duration-1000"
          style={{ backgroundImage: `url(${currentImage.fullUrl})` }}
        />
      )}
      {!currentImage && (
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-cover bg-center opacity-10"></div>
      )}
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
            Empowering <span className="gradient-text">South African</span> Communities
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Connecting communities through education, resources, and support to address social challenges, foster change, and build a stronger South Africa together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              className="bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white px-8 py-6 text-lg"
              asChild
            >
              <Link to="/get-involved">Get Involved</Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-ukhamba-gold text-ukhamba-gold hover:bg-ukhamba-gold hover:text-white px-8 py-6 text-lg"
              asChild
            >
              <Link to="/donate">Donate Now</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
