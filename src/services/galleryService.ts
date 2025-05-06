
import { supabase } from '@/integrations/supabase/client';
import { GalleryItem } from '@/data/gallery/images';
import { categoryDescriptions, subcategoryDescriptions } from '@/data/gallery/descriptions';
import { formatDisplayName, createGalleryItemFromMetadata } from '@/utils/galleryUtils';

/**
 * Service for fetching and processing gallery images
 */
export async function fetchGalleryImages(): Promise<{
  images: GalleryItem[];
  categories: string[];
  subcategories: Record<string, string[]>;
  error?: string;
}> {
  try {
    console.log('Fetching gallery images from Cloudflare R2');
    
    // Use the edge function that connects to Cloudflare R2
    const { data, error } = await supabase.functions.invoke("fetch-gallery-images", {
      method: "GET",
    });

    if (error) {
      console.error('Error calling fetch-gallery-images function:', error);
      throw new Error(`Failed to fetch gallery images: ${error.message}`);
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.warn('No images returned from the gallery function');
      throw new Error('No images found in the gallery');
    }

    // Check if we received an error object instead of image data
    if (!Array.isArray(data) && data.error) {
      console.error('Error from Edge function:', data);
      throw new Error(`Error from Cloudflare R2: ${data.error}`);
    }

    console.log(`Received ${data.length} gallery items from Cloudflare R2`);

    // Process the returned data to extract categories and subcategories
    const uniqueCategories = new Set<string>();
    const subcategoriesByCategory: Record<string, Set<string>> = {};
    
    // Add category and subcategory metadata to the items
    const galleryImages: GalleryItem[] = data.map((item: GalleryItem) => {
      uniqueCategories.add(item.categoryId);
      
      if (item.subcategoryId) {
        if (!subcategoriesByCategory[item.categoryId]) {
          subcategoriesByCategory[item.categoryId] = new Set<string>();
        }
        subcategoriesByCategory[item.categoryId].add(item.subcategoryId);
      }
      
      // Enhance description using our local category/subcategory descriptions
      const categoryName = formatDisplayName(item.categoryId);
      const categoryDesc = categoryDescriptions[item.categoryId] || '';
      
      let description = `${categoryDesc} - ${categoryName}`;
      
      if (item.subcategoryId) {
        const subcategoryName = formatDisplayName(item.subcategoryId);
        const subcategoryDesc = subcategoryDescriptions[item.categoryId]?.[item.subcategoryId] || '';
        description = `${subcategoryDesc} - ${categoryName}: ${subcategoryName}`;
      }
      
      return {
        ...item,
        description
      };
    });
    
    // Convert Sets to arrays for categories and subcategories
    const categoriesArray = Array.from(uniqueCategories);
    const subcategoriesRecord: Record<string, string[]> = {};
    
    Object.entries(subcategoriesByCategory).forEach(([category, subcategorySet]) => {
      subcategoriesRecord[category] = Array.from(subcategorySet);
    });

    console.log(`Processed ${galleryImages.length} gallery images with ${categoriesArray.length} categories`);
    
    return {
      images: galleryImages,
      categories: categoriesArray,
      subcategories: subcategoriesRecord
    };
  } catch (err) {
    console.error('Error fetching gallery images from Cloudflare R2:', err);
    
    // Fall back to Bunny.net implementation
    try {
      console.log('Falling back to Bunny.net storage');
      const { data, error } = await supabase.functions.invoke("fetch-gallery-images-bunny", {
        method: "GET",
      });
      
      if (error) throw error;
      
      // Process the data similar to above to extract categories and subcategories
      const uniqueCategories = new Set<string>();
      const subcategoriesByCategory: Record<string, Set<string>> = {};
      
      const galleryImages = data.map((item: GalleryItem) => {
        uniqueCategories.add(item.categoryId);
        
        if (item.subcategoryId) {
          if (!subcategoriesByCategory[item.categoryId]) {
            subcategoriesByCategory[item.categoryId] = new Set<string>();
          }
          subcategoriesByCategory[item.categoryId].add(item.subcategoryId);
        }
        
        return item;
      });
      
      // Convert Sets to arrays
      const categoriesArray = Array.from(uniqueCategories);
      const subcategoriesRecord: Record<string, string[]> = {};
      
      Object.entries(subcategoriesByCategory).forEach(([category, subcategorySet]) => {
        subcategoriesRecord[category] = Array.from(subcategorySet);
      });
      
      return {
        images: galleryImages,
        categories: categoriesArray,
        subcategories: subcategoriesRecord
      };
    } catch (fallbackErr) {
      console.error('Error with fallback method:', fallbackErr);
      return {
        images: [],
        categories: [],
        subcategories: {},
        error: err instanceof Error ? err.message : 'Failed to fetch gallery images'
      };
    }
  }
}
