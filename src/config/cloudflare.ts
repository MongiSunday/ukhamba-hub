
import { CloudflareConfig } from '@/types/gallery';
import { supabase } from '@/integrations/supabase/client';

let cachedConfig: CloudflareConfig | null = null;

// Fetch Cloudflare configuration from edge function
export const getCloudflareConfig = async (): Promise<CloudflareConfig> => {
  if (cachedConfig) {
    console.log('Using cached Cloudflare config:', cachedConfig);
    return cachedConfig;
  }

  try {
    console.log('Fetching Cloudflare config from edge function...');
    const { data, error } = await supabase.functions.invoke('get-cloudflare-config');
    
    if (error) {
      console.error('Error fetching Cloudflare config:', error);
      throw new Error(`Failed to fetch Cloudflare configuration: ${error.message}`);
    }

    if (!data || !data.accountHash) {
      console.error('Invalid Cloudflare config received:', data);
      throw new Error('Invalid Cloudflare configuration received');
    }

    console.log('Cloudflare config fetched successfully:', data);
    cachedConfig = data;
    return data;
  } catch (error) {
    console.error('Error in getCloudflareConfig:', error);
    // Fallback configuration for development - but this will likely cause image load failures
    const fallbackConfig = {
      accountHash: 'YOUR_ACCOUNT_HASH',
      deliveryUrl: 'https://imagedelivery.net',
      variants: {
        thumbnail: 'thumbnail',
        full: 'public',
        medium: 'medium'
      }
    };
    console.warn('Using fallback Cloudflare config:', fallbackConfig);
    return fallbackConfig;
  }
};

// Helper function to generate Cloudflare image URLs
export const getCloudflareImageUrl = async (imageId: string, variant: string = 'public'): Promise<string> => {
  try {
    const config = await getCloudflareConfig();
    const url = `${config.deliveryUrl}/${config.accountHash}/${imageId}/${variant}`;
    console.log(`Generated Cloudflare URL for ${imageId}:`, url);
    return url;
  } catch (error) {
    console.error('Error generating Cloudflare image URL:', error);
    // Return a placeholder URL to prevent complete failure
    return '/placeholder.svg';
  }
};

// Synchronous version for when config is already loaded
export const getCloudflareImageUrlSync = (imageId: string, variant: string = 'public', config: CloudflareConfig): string => {
  const url = `${config.deliveryUrl}/${config.accountHash}/${imageId}/${variant}`;
  console.log(`Generated sync Cloudflare URL for ${imageId}:`, url);
  return url;
};
