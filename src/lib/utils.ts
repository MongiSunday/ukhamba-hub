
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates an optimized image URL for a Bunny.net CDN image
 * @param url Original image URL
 * @param width Desired width
 * @param height Desired height
 * @returns Optimized image URL with width and height parameters
 */
export function getOptimizedImageUrl(url: string, width?: number, height?: number): string {
  // Check if this is a Bunny.net URL
  if (url.includes('b-cdn.net')) {
    const params = [];
    
    if (width) {
      params.push(`width=${width}`);
    }
    
    if (height) {
      params.push(`height=${height}`);
    }
    
    // Add image optimization parameters
    if (params.length > 0) {
      return `${url}?${params.join('&')}&format=webp&quality=85`;
    } else {
      return `${url}?format=webp&quality=85`;
    }
  }
  
  // Return the original URL for non-Bunny URLs
  return url;
}
