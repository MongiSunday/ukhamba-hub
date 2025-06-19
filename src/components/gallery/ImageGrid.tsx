
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ImageModal from './ImageModal';
import { getGalleryImages } from '@/data/gallery/images';
import { CloudflareImage } from '@/types/gallery';

const ImageGrid = () => {
  const [selectedImage, setSelectedImage] = useState<CloudflareImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [galleryImages, setGalleryImages] = useState<CloudflareImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = await getGalleryImages();
        setGalleryImages(images);
      } catch (error) {
        console.error('Error loading gallery images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const categories = ['all', ...new Set(galleryImages.map(img => img.category))];
  
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-ukhamba-brown/70">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm capitalize hover:bg-ukhamba-terracotta hover:text-white transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {category.replace('-', ' ')}
            </Badge>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <Card 
              key={image.id} 
              className="card-hover cursor-pointer group overflow-hidden"
              onClick={() => setSelectedImage(image)}
            >
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.thumbnailUrl}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-ukhamba-brown mb-2 line-clamp-2">
                    {image.title}
                  </h3>
                  <p className="text-sm text-ukhamba-brown/70 line-clamp-2">
                    {image.description}
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {image.category.replace('-', ' ')}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <ImageModal
            image={selectedImage}
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>
    </section>
  );
};

export default ImageGrid;
