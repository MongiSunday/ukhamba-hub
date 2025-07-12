
// This file is no longer needed since we're using the edge function approach
// All Cloudflare Images API calls are now handled securely via the get-cloudflare-images edge function

export const getCloudflareConfig = async () => {
  console.warn('getCloudflareConfig is deprecated - using edge function approach instead');
  return null;
};

export const getCloudflareImageUrl = async (imageId: string, variant: string = 'public') => {
  console.warn('getCloudflareImageUrl is deprecated - URLs are now provided directly from the API');
  return '';
};

export const getCloudflareImageUrlSync = (imageId: string, variant: string = 'public', config: any) => {
  console.warn('getCloudflareImageUrlSync is deprecated - URLs are now provided directly from the API');
  return '';
};
