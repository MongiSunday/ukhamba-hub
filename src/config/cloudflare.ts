
import { CloudflareConfig } from '@/types/gallery';

// TODO: Replace with your actual Cloudflare Images configuration
export const cloudflareConfig: CloudflareConfig = {
  // Your Cloudflare account hash (found in your Cloudflare Images dashboard)
  accountHash: 'YOUR_ACCOUNT_HASH',
  
  // Your delivery URL base
  deliveryUrl: 'https://imagedelivery.net',
  
  // Variants for different image sizes/transformations
  variants: {
    thumbnail: 'thumbnail', // 400x400 square crop
    full: 'public',         // Original size
    medium: 'medium',       // 800px width
    // Add more variants as needed
  }
};

// Helper function to generate Cloudflare image URLs
export const getCloudflareImageUrl = (imageId: string, variant: string = 'public'): string => {
  return `${cloudflareConfig.deliveryUrl}/${cloudflareConfig.accountHash}/${imageId}/${variant}`;
};
