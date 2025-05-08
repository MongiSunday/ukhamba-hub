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
    // Get Cloudinary credentials from the supabase client
    const { supabase } = await import('@/integrations/supabase/client');
    
    // Fetch secrets from Supabase
    const { data: secretsData, error: secretsError } = await supabase.functions.invoke('get-secrets', {
      body: {
        secrets: ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'],
      },
    });
    
    if (secretsError) {
      console.error('Error fetching Cloudinary secrets:', secretsError);
      throw new Error('Failed to fetch Cloudinary credentials from Supabase');
    }
    
    const cloudName = secretsData?.CLOUDINARY_CLOUD_NAME;
    const apiKey = secretsData?.CLOUDINARY_API_KEY;
    const apiSecret = secretsData?.CLOUDINARY_API_SECRET;
    
    // Provide fallbacks in case the Supabase function fails but keep the console warning
    const cloudNameToUse = cloudName || "dtqdq3fqq";
    const apiKeyToUse = apiKey || "249797775448449";
    const apiSecretToUse = apiSecret || "4jWOc1sTJdY7YncGBjAt6d7g93k";
    
    if (!cloudNameToUse || !apiKeyToUse) {
      throw new Error('Cloudinary credentials not found');
    }
    
    console.log('Using Cloudinary cloud name:', cloudNameToUse);

    // For Cloudinary Admin API, we need to use the Search API
    const url = `https://api.cloudinary.com/v1_1/${cloudNameToUse}/resources/search`;
    
    // Using a Fetch signature that can't be blocked by CORS
    const params = new URLSearchParams({
      expression: 'folder:ukhamba-gallery/*',
      max_results: '500', // Adjust if needed
      sort_by: 'public_id',
      type: 'upload'
    });
    
    // Instead of using the authentication header, we'll use the API key and secret as URL parameters
    params.append('api_key', apiKeyToUse);
    
    // Create timestamp for signature
    const timestamp = Math.floor(Date.now() / 1000).toString();
    params.append('timestamp', timestamp);
    
    // Generate signature
    // Only include API secret in the signature computation, not in the request itself
    const signatureString = `expression=folder:ukhamba-gallery/*&max_results=500&sort_by=public_id&timestamp=${timestamp}&type=upload${apiSecretToUse}`;
    
    // Create SHA-1 hash for signature
    const signature = await sha1(signatureString);
    params.append('signature', signature);
    
    console.log('Fetching from URL:', `${url}?${params.toString()}`);
    
    const response = await fetch(`${url}?${params.toString()}`, { 
      method: 'GET'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch images: ${response.status} ${errorText}`);
    }
    
    const data: CloudinaryResponse = await response.json();
    console.log('Cloudinary response received:', data);
    
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
 * Generate SHA-1 hash for Cloudinary signature
 */
async function sha1(message: string): Promise<string> {
  // Use the browser's built-in crypto API to generate the hash
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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
