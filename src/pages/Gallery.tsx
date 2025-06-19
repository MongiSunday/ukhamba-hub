
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GalleryHero from '@/components/gallery/GalleryHero';
import ImageGrid from '@/components/gallery/ImageGrid';

const Gallery = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <GalleryHero />
        <ImageGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
