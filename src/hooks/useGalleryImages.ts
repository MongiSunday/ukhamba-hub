
import { useState, useEffect } from 'react';
import { galleryItems as fallbackGalleryItems, GalleryItem } from '@/data/gallery/images';
import { fetchGalleryImages, extractCategoriesFromMapping } from '@/services/galleryService';
import { formatDisplayName } from '@/utils/galleryUtils';

interface UseGalleryImagesOptions {
  categoryId: string | null;
  subcategoryId: string | null;
  page?: number;
  itemsPerPage?: number;
}

/**
 * Custom hook for fetching and filtering gallery images from Cloudinary
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
        
        // Fetch gallery images from Cloudinary
        const galleryImages = await fetchGalleryImages();
        
        // Extract categories and subcategories from the mapping
        const { categories: extractedCategories, subcategories: extractedSubcategories } = extractCategoriesFromMapping();
        setCategories(extractedCategories);
        setSubcategories(extractedSubcategories);
        
        // Store all fetched images
        setAllItems(galleryImages);
        
        // Filter images based on category and subcategory
        let filteredImages = [...galleryImages];
        
        if (categoryId) {
          filteredImages = filteredImages.filter(item => item.categoryId === categoryId);
          
          if (subcategoryId) {
            filteredImages = filteredImages.filter(item => item.subcategoryId === subcategoryId);
          }
        }
        
        // Calculate pagination
        const totalFilteredImages = filteredImages.length;
        const calculatedTotalPages = Math.ceil(totalFilteredImages / itemsPerPage);
        setTotalPages(calculatedTotalPages || 1);
        
        // Apply pagination
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);
        
        setItems(paginatedImages);
        setError(null);
      } catch (err) {
        console.error('Error in useGalleryImages:', err);
        setError(err instanceof Error ? err.message : 'Failed to load images');
        
        // Use fallback images if available
        if (fallbackGalleryItems && fallbackGalleryItems.length > 0) {
          console.log('Using fallback gallery items');
          setAllItems(fallbackGalleryItems);
          
          // Apply the same filtering and pagination to fallback items
          let filteredFallbacks = [...fallbackGalleryItems];
          
          if (categoryId) {
            filteredFallbacks = filteredFallbacks.filter(item => item.categoryId === categoryId);
            
            if (subcategoryId) {
              filteredFallbacks = filteredFallbacks.filter(item => item.subcategoryId === subcategoryId);
            }
          }
          
          const totalFilteredFallbacks = filteredFallbacks.length;
          const calculatedTotalPages = Math.ceil(totalFilteredFallbacks / itemsPerPage);
          setTotalPages(calculatedTotalPages || 1);
          
          const startIndex = (page - 1) * itemsPerPage;
          const paginatedFallbacks = filteredFallbacks.slice(startIndex, startIndex + itemsPerPage);
          
          setItems(paginatedFallbacks);
        } else {
          setItems([]);
          setAllItems([]);
          setCategories([]);
          setSubcategories({});
          setTotalPages(1);
        }
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
