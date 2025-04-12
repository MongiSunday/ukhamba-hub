
import { useState, useEffect } from 'react';
import { galleryItems as fallbackGalleryItems, GalleryItem } from '@/data/gallery/images';
import { fetchGalleryImages } from '@/services/galleryService';

interface UseGalleryImagesOptions {
  categoryId: string | null;
  subcategoryId: string | null;
  page?: number;
  itemsPerPage?: number;
}

/**
 * Custom hook for fetching and filtering gallery images
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
        
        // Fetch gallery data from service
        const { images: galleryImages, categories: categoryList, subcategories: subcategoryMap, error: fetchError } = 
          await fetchGalleryImages();
          
        if (fetchError) {
          throw new Error(fetchError);
        }
        
        setCategories(categoryList);
        setSubcategories(subcategoryMap);
        
        // Filter data based on category and subcategory if provided
        let filteredData = [...galleryImages];
        if (categoryId) {
          filteredData = filteredData.filter(item => item.categoryId === categoryId);
          if (subcategoryId) {
            filteredData = filteredData.filter(item => item.subcategoryId === subcategoryId);
          }
        }
        
        // Sort by date (newest first)
        filteredData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        // Calculate total pages
        const total = Math.ceil(filteredData.length / itemsPerPage);
        setTotalPages(total > 0 ? total : 1);
        
        // Store all filtered items
        setAllItems(filteredData);
        
        // Get paginated items
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedItems = filteredData.slice(startIndex, startIndex + itemsPerPage);
        
        setItems(paginatedItems);
        setError(null);
      } catch (err) {
        console.warn('Falling back to static gallery data:', err);
        
        // Filter the fallback data using the same logic
        let filtered = [...fallbackGalleryItems];
        if (categoryId) {
          filtered = filtered.filter(item => item.categoryId === categoryId);
          if (subcategoryId) {
            filtered = filtered.filter(item => item.subcategoryId === subcategoryId);
          }
        }
        
        // Sort by date
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        // Calculate total pages
        const total = Math.ceil(filtered.length / itemsPerPage);
        setTotalPages(total > 0 ? total : 1);
        
        // Store all filtered items
        setAllItems(filtered);
        
        // Get paginated items
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);
        
        setItems(paginatedItems);
        
        // Set a descriptive error message
        const errorMessage = err instanceof Error ? err.message : 'Failed to load images';
        setError(`Using fallback gallery images. ${errorMessage}`);
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
