import { useState, useEffect } from 'react';
import { galleryItems as fallbackGalleryItems, GalleryItem } from '@/data/gallery/images';

interface UseGalleryImagesOptions {
  categoryId: string | null;
  subcategoryId: string | null;
  page?: number;
  itemsPerPage?: number;
}

/**
 * Custom hook for fetching and filtering gallery images (Cloudinary only)
 */
export const useGalleryImages = ({ 
  categoryId, 
  subcategoryId,
  page = 1,
  itemsPerPage = 12
}: UseGalleryImagesOptions) => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [allItems, setAllItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<Record<string, string[]>>({});
  const [totalPages, setTotalPages] = useState(1);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        setLoading(true);
        // Image fetching logic removed. Implement your own logic here if needed.
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load images');
        setItems([]);
        setAllItems([]);
        setCategories([]);
        setSubcategories({});
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    loadGalleryData();
  }, [categoryId, subcategoryId, page, itemsPerPage, retryCount]);

  // Function to allow manual retry from UI
  const retryLoading = () => {
    setRetryCount(prev => prev + 1);
  };

  return { 
    items, 
    loading, 
    error, 
    categories, 
    subcategories, 
    totalPages, 
    totalItems: allItems.length,
    retryLoading
  };
};
