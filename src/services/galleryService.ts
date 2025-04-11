
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
    console.log('Fetching gallery images from Supabase storage');
    
    // First, get all top-level folders (categories)
    const { data: topLevelData, error: topLevelError } = await supabase
      .storage
      .from('gallery')
      .list('', {
        sortBy: { column: 'name', order: 'asc' }
      });

    if (topLevelError) {
      console.error('Error fetching top-level folders:', topLevelError);
      throw new Error(`Failed to fetch gallery categories: ${topLevelError.message}`);
    }

    // Filter to get only folders (items without mimetype)
    const categoryFolders = topLevelData.filter(item => !item.name.includes('.'));
    console.log(`Found ${categoryFolders.length} category folders:`, categoryFolders.map(f => f.name));
    
    if (categoryFolders.length === 0) {
      console.warn('No category folders found in gallery bucket');
      throw new Error('No category folders found in gallery bucket');
    }

    const uniqueCategories = new Set<string>();
    const subcategoriesByCategory: Record<string, Set<string>> = {};
    const galleryImages: GalleryItem[] = [];
    
    // Process each category folder
    for (const categoryFolder of categoryFolders) {
      const categoryId = categoryFolder.name;
      uniqueCategories.add(categoryId);
      
      // Get contents of the category folder
      const { data: categoryContents, error: categoryError } = await supabase
        .storage
        .from('gallery')
        .list(categoryId, {
          sortBy: { column: 'name', order: 'asc' }
        });
        
      if (categoryError) {
        console.error(`Error fetching contents of category ${categoryId}:`, categoryError);
        continue;
      }

      console.log(`Category ${categoryId} has ${categoryContents.length} items`);
      
      // Filter out placeholder files
      const filteredCategoryContents = categoryContents.filter(item => 
        !item.name.includes('.emptyFolderPlaceholder')
      );
      
      await processContents(
        filteredCategoryContents, 
        categoryId,
        galleryImages,
        subcategoriesByCategory
      );
    }

    console.log(`Processed a total of ${galleryImages.length} gallery images`);
    
    // Convert Sets to arrays for categories and subcategories
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
  } catch (err) {
    console.error('Error fetching gallery images:', err);
    return {
      images: [],
      categories: [],
      subcategories: {},
      error: err instanceof Error ? err.message : 'Unknown error fetching gallery images'
    };
  }
}

/**
 * Process the contents of a category folder
 */
async function processContents(
  contents: any[],
  categoryId: string,
  galleryImages: GalleryItem[],
  subcategoriesByCategory: Record<string, Set<string>>
): Promise<void> {
  for (const item of contents) {
    if (!item.name.includes('.')) {
      // This is likely a subcategory folder
      await processSubcategory(
        item,
        categoryId,
        galleryImages,
        subcategoriesByCategory
      );
    } else if (item.metadata?.mimetype?.startsWith('image/') || 
              item.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      // This is a direct image in the category folder
      processDirectCategoryImage(
        item,
        categoryId,
        galleryImages
      );
    }
  }
}

/**
 * Process a subcategory folder and its images
 */
async function processSubcategory(
  item: any,
  categoryId: string,
  galleryImages: GalleryItem[],
  subcategoriesByCategory: Record<string, Set<string>>
): Promise<void> {
  const subcategoryId = item.name;
  
  if (!subcategoriesByCategory[categoryId]) {
    subcategoriesByCategory[categoryId] = new Set<string>();
  }
  subcategoriesByCategory[categoryId].add(subcategoryId);
  
  // Get images from this subcategory
  const { data: subcategoryImages, error: subcategoryError } = await supabase
    .storage
    .from('gallery')
    .list(`${categoryId}/${subcategoryId}`, {
      sortBy: { column: 'name', order: 'asc' }
    });
    
  if (subcategoryError) {
    console.error(`Error fetching images from subcategory ${categoryId}/${subcategoryId}:`, subcategoryError);
    return;
  }

  // Filter out placeholder files
  const filteredSubcategoryImages = subcategoryImages.filter(image => 
    !image.name.includes('.emptyFolderPlaceholder')
  );

  console.log(`Subcategory ${categoryId}/${subcategoryId} has ${filteredSubcategoryImages.length} images`);
  
  // Add each image from this subcategory
  filteredSubcategoryImages.forEach((image, index) => {
    if (image.metadata?.mimetype?.startsWith('image/') || 
        image.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      
      const imageUrl = supabase.storage
        .from('gallery')
        .getPublicUrl(`${categoryId}/${subcategoryId}/${image.name}`).data.publicUrl;
      
      const galleryItem = createGalleryItemFromMetadata({
        image,
        index,
        categoryId,
        subcategoryId,
        imageUrl,
        categoryDescriptions,
        subcategoryDescriptions
      });
      
      galleryImages.push(galleryItem);
    }
  });
}

/**
 * Process a direct image in a category folder
 */
function processDirectCategoryImage(
  item: any,
  categoryId: string,
  galleryImages: GalleryItem[]
): void {
  const imageUrl = supabase.storage
    .from('gallery')
    .getPublicUrl(`${categoryId}/${item.name}`).data.publicUrl;
  
  const galleryItem = createGalleryItemFromMetadata({
    image: item,
    index: galleryImages.length,
    categoryId,
    imageUrl,
    categoryDescriptions,
    subcategoryDescriptions
  });
  
  galleryImages.push(galleryItem);
}
