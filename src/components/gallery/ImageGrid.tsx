
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        console.log('Loading gallery images...');
        const images = await getGalleryImages();
        console.log('Gallery images loaded:', images);
        setGalleryImages(images);
        setError(null);
      } catch (err) {
        console.error('Error loading gallery images:', err);
        let message = 'Failed to load gallery images. Please check your Cloudflare configuration.';
        if (err instanceof Error) {
          if (!err.message.includes('Cloudflare configuration')) {
            message = `An unexpected error occurred while trying to load images. ${err.message}`;
          } else {
            message = err.message; // Use the more specific error from getCloudflareConfig
          }
        }
        setError(message);
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

  if (error) {
    if (galleryImages.length === 0) {
      // Detailed error if no images loaded at all
      return (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Gallery Loading Error</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <div className="text-sm text-red-500">
                  <p>Please ensure:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Your Cloudflare Account Hash is correctly configured</li>
                    <li>You have replaced the example image IDs with real Cloudflare image IDs</li>
                    <li>Your images are uploaded to Cloudflare Images</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      // Generic error if some images might have loaded but an error still occurred
      return (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Image Loading Issue</h3>
                <p className="text-yellow-600 mb-4">
                  Some images may not have loaded correctly. Please try refreshing the page.
                </p>
                {error && <p className="text-sm text-yellow-500 mt-2">Error details: {error}</p>}
              </div>
            </div>
          </div>
        </section>
      );
    }
  }

  if (galleryImages.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Images Found</h3>
              <p className="text-yellow-600 mb-4">
                The gallery is configured but no images are available to display.
              </p>
              <p className="text-sm text-yellow-600">
                Please update the image IDs in the gallery configuration with your actual Cloudflare image IDs.
              </p>
            </div>
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
                    onError={(e) => {
                      console.error('Image failed to load:', image.thumbnailUrl);
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', image.thumbnailUrl);
                    }}
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
