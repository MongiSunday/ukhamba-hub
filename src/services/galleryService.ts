
/**
 * Service for fetching and processing gallery images from Cloudinary
 */

// Define types to match the expected Cloudinary API response
interface CloudinaryResource {
  public_id: string;
  format: string;
  secure_url: string;
  created_at: string;
  width: number;
  height: number;
  folder?: string;
  resource_type: string;
  asset_id: string;
  name?: string;
  tags?: string[];
  context?: any;
}

interface CloudinaryResponse {
  resources: CloudinaryResource[];
  next_cursor?: string;
}

// Mapping between folder paths and category/subcategory IDs
const folderToCategoryMap: Record<string, { categoryId: string, subcategoryId?: string }> = {
  'ukhamba-gallery/youth': { categoryId: 'youth' },
  'ukhamba-gallery/youth/school-visits': { categoryId: 'youth', subcategoryId: 'youth-school' },
  'ukhamba-gallery/youth/workshops': { categoryId: 'youth', subcategoryId: 'youth-workshops' },
  'ukhamba-gallery/youth/leadership': { categoryId: 'youth', subcategoryId: 'youth-leadership' },
  'ukhamba-gallery/community': { categoryId: 'community' },
  'ukhamba-gallery/community/events': { categoryId: 'community', subcategoryId: 'community-events' },
  'ukhamba-gallery/community/workshops': { categoryId: 'community', subcategoryId: 'community-workshops' },
  'ukhamba-gallery/community/relief': { categoryId: 'community-relief' },
  'ukhamba-gallery/culture': { categoryId: 'culture' },
  'ukhamba-gallery/culture/celebrations': { categoryId: 'culture', subcategoryId: 'culture-celebrations' },
  'ukhamba-gallery/culture/preservation': { categoryId: 'culture', subcategoryId: 'culture-preservation' },
  'ukhamba-gallery/events': { categoryId: 'events' },
  'ukhamba-gallery/events/fundraisers': { categoryId: 'events', subcategoryId: 'events-fundraisers' },
  'ukhamba-gallery/events/conferences': { categoryId: 'events', subcategoryId: 'events-conferences' },
};

/**
 * Extract categories and subcategories from the folder mapping
 */
export function extractCategoriesFromMapping() {
  const categories = new Set<string>();
  const subcategories: Record<string, string[]> = {};
  
  Object.values(folderToCategoryMap).forEach(({ categoryId, subcategoryId }) => {
    categories.add(categoryId);
    
    if (subcategoryId) {
      if (!subcategories[categoryId]) {
        subcategories[categoryId] = [];
      }
      if (!subcategories[categoryId].includes(subcategoryId)) {
        subcategories[categoryId].push(subcategoryId);
      }
    }
  });
  
  return {
    categories: Array.from(categories),
    subcategories
  };
}

/**
 * Fetch gallery images from Cloudinary
 */
export async function fetchGalleryImages() {
  try {
    // In Vite, environment variables need to be prefixed with VITE_
    // If they're not available directly, fall back to the .env values
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dtqdq3fqq";
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY || "249797775448449";
    
    if (!cloudName || !apiKey) {
      throw new Error('Cloudinary credentials not found');
    }

    // Construct the Cloudinary Admin API URL to list resources in the ukhamba-gallery folder
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;
    
    // Basic authentication for Cloudinary Admin API using API key
    const headers = new Headers();
    headers.append('Authorization', `Basic ${btoa(`${apiKey}:`)}`);
    
    const params = new URLSearchParams({
      expression: 'folder=ukhamba-gallery/*',
      max_results: '500', // Adjust if needed
      type: 'upload'
    });
    
    const response = await fetch(`${url}?${params.toString()}`, { 
      method: 'GET',
      headers
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch images: ${response.status} ${errorText}`);
    }
    
    const data: CloudinaryResponse = await response.json();
    
    // Process and categorize images based on their folders
    const { resources } = data;
    
    // If no resources found, throw error
    if (!resources || resources.length === 0) {
      throw new Error('No images found in the ukhamba-gallery folder');
    }
    
    return processCloudinaryResources(resources);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    throw error;
  }
}

/**
 * Process Cloudinary resources to categorize them based on folders
 */
function processCloudinaryResources(resources: CloudinaryResource[]) {
  // Extract folder path from public_id and categorize resources
  return resources.map((resource, index) => {
    const publicId = resource.public_id;
    const folderPath = publicId.substring(0, publicId.lastIndexOf('/'));
    const fileName = publicId.substring(publicId.lastIndexOf('/') + 1);
    
    // Find the matching category and subcategory based on the folder path
    const mapping = folderToCategoryMap[folderPath] || { 
      categoryId: 'uncategorized' 
    };
    
    // Check if this is a video
    const isVideo = resource.resource_type === 'video';
    
    return {
      id: resource.asset_id || `image-${index}`,
      title: resource.name || fileName.replace(/[-_]/g, ' ').replace(/\.\w+$/, ''),
      description: `${mapping.categoryId}${mapping.subcategoryId ? ' - ' + mapping.subcategoryId : ''}`,
      imageUrl: resource.secure_url,
      categoryId: mapping.categoryId,
      subcategoryId: mapping.subcategoryId,
      type: isVideo ? 'video' as const : 'image' as const,
      date: resource.created_at || new Date().toISOString(),
      featured: index % 7 === 0, // Mark some items as featured
    };
  });
}
