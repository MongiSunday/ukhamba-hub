
import { CloudflareImage } from '@/types/gallery';
import { supabase } from '@/integrations/supabase/client';

// Function to fetch all images from Cloudflare Images via edge function
export const getGalleryImages = async (): Promise<CloudflareImage[]> => {
  try {
    console.log('Fetching images from Cloudflare Images API...');
    
    const { data, error } = await supabase.functions.invoke('get-cloudflare-images');
    
    if (error) {
      console.error('Error calling get-cloudflare-images function:', error);
      throw new Error(`Failed to fetch images: ${error.message}`);
    }

    if (!data) {
      console.error('No data received from get-cloudflare-images function');
      throw new Error('No data received from Cloudflare Images API');
    }

    if (data.error) {
      console.error('API error:', data.error);
      throw new Error(data.error);
    }

    console.log('Successfully loaded images from Cloudflare Images:', data.images);
    return data.images || [];
    
  } catch (error) {
    console.error('Error in getGalleryImages:', error);
    throw error;
  }
};

// All images are now dynamically loaded from Cloudflare Images
