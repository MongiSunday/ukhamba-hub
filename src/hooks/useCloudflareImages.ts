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
        const allImages = await getGalleryImages();
        
        if (category) {
          const filteredImages = allImages.filter(img => 
            img.category.includes(category) || 
            img.title.toLowerCase().includes(category.toLowerCase())
          );
          setImages(filteredImages.length > 0 ? filteredImages : allImages.slice(0, 5));
        } else {
          setImages(allImages);
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