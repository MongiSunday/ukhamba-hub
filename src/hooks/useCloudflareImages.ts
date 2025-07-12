import { useState, useEffect } from 'react';
import { CloudflareImage } from '@/types/gallery';
import { getGalleryImages } from '@/data/gallery/images';

export const useCloudflareImages = (category?: string) => {
  const [images, setImages] = useState<CloudflareImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const allImages = await getGalleryImages();
        
        let filteredImages = allImages;
        
        if (category) {
          filteredImages = allImages.filter(img => 
            img.category.includes(category) || 
            img.title.toLowerCase().includes(category.toLowerCase())
          );
          // If no category matches, fallback to first few images
          if (filteredImages.length === 0) {
            filteredImages = allImages.slice(0, 8);
          }
        }
        
        setImages(filteredImages);
        
        // Preload first few image thumbnails for better performance
        if (filteredImages.length > 0) {
          filteredImages.slice(0, 6).forEach(img => {
            if (img.thumbnailUrl) {
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = img.thumbnailUrl;
              document.head.appendChild(link);
            }
          });
        }
      } catch (err) {
        console.error('Failed to load Cloudflare images:', err);
        setError(err instanceof Error ? err.message : 'Failed to load images');
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [category]);

  const getRandomImage = () => {
    if (images.length === 0) return null;
    return images[Math.floor(Math.random() * images.length)];
  };

  const getImageByIndex = (index: number) => {
    if (images.length === 0) return null;
    return images[index % images.length];
  };

  return {
    images,
    loading,
    error,
    getRandomImage,
    getImageByIndex
  };
};