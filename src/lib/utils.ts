
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates an optimized image URL based on the source provider
 * @param url Original image URL
 * @param width Desired width
 * @param height Desired height
 * @returns Optimized image URL with appropriate parameters
 */
export function getOptimizedImageUrl(url: string, width?: number, height?: number): string {
  // Check if this is a Cloudflare R2 URL
  if (url.includes('r2.cloudflarestorage.com')) {
    const params = [];
    
    if (width) {
      params.push(`width=${width}`);
    }
    
    if (height) {
      params.push(`height=${height}`);
    }
    
    // Add image optimization parameters for Cloudflare R2
    if (params.length > 0) {
      return `${url}?${params.join('&')}`;
    }
    
    return url;
  }
  
  // Check if this is a Bunny.net URL
  if (url.includes('b-cdn.net')) {
    const params = [];
    
    if (width) {
      params.push(`width=${width}`);
    }
    
    if (height) {
      params.push(`height=${height}`);
    }
    
    // Add more image optimization parameters for Bunny.net
    if (params.length > 0) {
      // Apply webp format for better compression and quality settings
      return `${url}?${params.join('&')}&format=webp&quality=80&optimize=medium`;
    } else {
      return `${url}?format=webp&quality=80&optimize=medium`;
    }
  }
  
  // Return the original URL for other providers or static images
  return url;
}
