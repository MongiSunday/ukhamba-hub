
import { CloudflareConfig } from '@/types/gallery';
import { supabase } from '@/integrations/supabase/client';

let cachedConfig: CloudflareConfig | null = null;

// Fetch Cloudflare configuration from edge function
export const getCloudflareConfig = async (): Promise<CloudflareConfig> => {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const { data, error } = await supabase.functions.invoke('get-cloudflare-config');
    
    if (error) {
      console.error('Error fetching Cloudflare config:', error);
      throw new Error('Failed to fetch Cloudflare configuration');
    }

    cachedConfig = data;
    return data;
  } catch (error) {
    console.error('Error in getCloudflareConfig:', error);
    // Fallback configuration for development
    return {
      accountHash: 'YOUR_ACCOUNT_HASH',
      deliveryUrl: 'https://imagedelivery.net',
      variants: {
        thumbnail: 'thumbnail',
        full: 'public',
        medium: 'medium'
      }
    };
  }
};

// Helper function to generate Cloudflare image URLs
export const getCloudflareImageUrl = async (imageId: string, variant: string = 'public'): Promise<string> => {
  const config = await getCloudflareConfig();
  return `${config.deliveryUrl}/${config.accountHash}/${imageId}/${variant}`;
};

// Synchronous version for when config is already loaded
export const getCloudflareImageUrlSync = (imageId: string, variant: string = 'public', config: CloudflareConfig): string => {
  return `${config.deliveryUrl}/${config.accountHash}/${imageId}/${variant}`;
};
