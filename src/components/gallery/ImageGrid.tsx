
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import ImageModal from './ImageModal';
import { getGalleryImages } from '@/data/gallery/images';
import { CloudflareImage } from '@/types/gallery';

const ImageGrid = () => {
  const [selectedImage, setSelectedImage] = useState<CloudflareImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [galleryImages, setGalleryImages] = useState<CloudflareImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadImages = async () => {
    try {
      console.log('Loading gallery images...');
      const images = await getGalleryImages();
      console.log('Gallery images loaded:', images);
      setGalleryImages(images);
      setError(null);
    } catch (err) {
      console.error('Error loading gallery images:', err);
      let message = 'Failed to load gallery images from Cloudflare.';
      if (err instanceof Error) {
        message = `${message} ${err.message}`;
      }
      setError(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadImages();
  };

  const categories = ['all', ...new Set(galleryImages.map(img => img.category))];
  
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ukhamba-terracotta mx-auto mb-4"></div>
            <p className="text-ukhamba-brown/70">Loading images from Cloudflare...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to Load Images</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={handleRefresh} variant="outline" className="mt-4">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (galleryImages.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Images Found</h3>
              <p className="text-yellow-600 mb-4">
                No images were found in your Cloudflare Images account.
              </p>
              <p className="text-sm text-yellow-600 mb-4">
                Upload some images to your Cloudflare Images account to see them here.
              </p>
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Header with refresh button */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-ukhamba-brown/80">
            Showing {filteredImages.length} of {galleryImages.length} images
          </p>
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            size="sm"
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

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
