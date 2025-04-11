
import React from 'react';

const GalleryHero = () => {
  return (
    <section className="bg-gradient-to-r from-ukhamba-cream to-ukhamba-sand py-12 md:py-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Gallery</h1>
          <div className="w-24 h-1 bg-ukhamba-terracotta mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80">
            Explore the visual journey of our community initiatives, events, and the positive impact 
            we're creating across South Africa through powerful imagery and stories. Our gallery is dynamically updated with the latest images from our programs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GalleryHero;
