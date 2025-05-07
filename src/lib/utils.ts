
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { buildCloudinaryUrl, buildCloudinarySrcSet } from "@/integrations/cloudinary/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Determines the image provider from the URL
 */
export function determineImageProvider(url: string): 'cloudflare' | 'bunny' | 'cloudinary' | 'unknown' {
  if (!url) return 'unknown';
  
  if (url.includes('r2.cloudflarestorage.com')) return 'cloudflare';
  if (url.includes('b-cdn.net')) return 'bunny';
  if (url.includes('cloudinary.com')) return 'cloudinary';
  
  return 'unknown';
}

/**
 * Generates an optimized image URL based on the source provider
 * @param url Original image URL
 * @param width Desired width
 * @param height Desired height
 * @param options Additional optimization options
 * @returns Optimized image URL with appropriate parameters
 */
export function getOptimizedImageUrl(
  url: string, 
  width?: number, 
  height?: number, 
  options?: {
    quality?: number;
    format?: 'auto' | 'webp' | 'avif' | 'png' | 'jpeg';
    fit?: 'cover' | 'contain' | 'fill';
  }
): string {
  if (!url) return '';
  
  // Default options
  const quality = options?.quality || 80;
  const format = options?.format || 'webp';
  const fit = options?.fit || 'cover';
  
  // Determine provider
  const provider = determineImageProvider(url);

  // Handle based on provider
  switch (provider) {
    case 'cloudinary':
      // If this is already a Cloudinary URL, optimize it
      return buildCloudinaryUrl(url, {
        width,
        height,
        quality,
        format: format === 'auto' ? 'auto' : format,
        crop: fit === 'cover' ? 'fill' : 'scale'
      });
      
    case 'cloudflare':
      // Check if this is a Cloudflare R2 URL
      const params = [];
      
      // Add dimensions if specified
      if (width) params.push(`width=${width}`);
      if (height) params.push(`height=${height}`);
      
      // Add image optimization parameters specific to Cloudflare R2
      params.push(`format=${format}`);
      params.push(`quality=${quality}`);
      params.push(`fit=${fit}`);
      
      // For Cloudflare Images API compatibility
      params.push(`sharpen=1`);
      
      // Apply parameters
      return params.length > 0 ? `${url}?${params.join('&')}` : url;
      
    case 'bunny':
      // Check if this is a Bunny.net URL
      const bunnyParams = [];
      
      // Add dimensions if specified
      if (width) bunnyParams.push(`width=${width}`);
      if (height) bunnyParams.push(`height=${height}`);
      
      // Add optimization parameters for Bunny.net
      bunnyParams.push(`format=${format}`);
      bunnyParams.push(`quality=${quality}`);
      bunnyParams.push(`optimize=medium`);
      
      // Apply parameters
      return bunnyParams.length > 0 ? `${url}?${bunnyParams.join('&')}` : url;
    
    default:
      // For unknown providers, return the original URL
      return url;
  }
}

/**
 * Determines if the source is a video based on file extension or URL
 * @param source URL or file path to check
 * @returns Boolean indicating if the source is a video
 */
export function isVideoSource(source: string): boolean {
  if (!source) return false;
  const videoExtensions = ['.mp4', '.mov', '.webm', '.ogg', '.avi'];
  return videoExtensions.some(ext => source.toLowerCase().endsWith(ext));
}

/**
 * Generates appropriate srcSet for responsive images
 * @param url Base image URL
 * @returns String containing srcSet attribute value
 */
export function generateSrcSet(url: string): string {
  if (!url) return '';
  
  // Determine provider
  const provider = determineImageProvider(url);
  
  switch (provider) {
    case 'cloudinary':
      return buildCloudinarySrcSet(url);
      
    case 'cloudflare':
    case 'bunny':
      // Width breakpoints for responsive images
      const widths = [320, 480, 640, 768, 1024, 1280, 1536, 1920];
      
      return widths
        .map(w => {
          const optimizedUrl = getOptimizedImageUrl(url, w);
          return `${optimizedUrl} ${w}w`;
        })
        .join(', ');
        
    default:
      return '';
  }
}

/**
 * Converts a Cloudflare R2 or other URL to a Cloudinary URL
 * @param url Original image URL
 * @returns Cloudinary URL
 */
export function convertToCloudinaryUrl(url: string): string {
  if (!url) return '';
  
  // If already a Cloudinary URL, return as is
  if (url.includes('cloudinary.com')) return url;
  
  // Extract the filename from the URL or path
  const filename = url.split('/').pop() || '';
  
  // Generate a Cloudinary public ID from the filename
  // Note: In a real implementation, you would likely need to upload the image to Cloudinary first
  // or use remote fetching via Cloudinary's fetch feature
  const publicId = `gallery_images/${filename.replace(/\.[^/.]+$/, '')}`;
  
  // Return a Cloudinary URL using a preset transformation
  return buildCloudinaryUrl(publicId, {
    width: 800,
    quality: 80,
    format: 'auto',
    crop: 'fill'
  });
}
