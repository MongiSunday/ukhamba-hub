
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
  
  // Check if this is a Cloudflare R2 URL
  if (url.includes('r2.cloudflarestorage.com')) {
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
  }
  
  // Check if this is a Bunny.net URL
  if (url.includes('b-cdn.net')) {
    const params = [];
    
    // Add dimensions if specified
    if (width) params.push(`width=${width}`);
    if (height) params.push(`height=${height}`);
    
    // Add optimization parameters for Bunny.net
    params.push(`format=${format}`);
    params.push(`quality=${quality}`);
    params.push(`optimize=medium`);
    
    // Apply parameters
    return params.length > 0 ? `${url}?${params.join('&')}` : url;
  }
  
  // For local development or other providers
  // Just return the original URL if no provider is matched
  return url;
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
 * @param provider Image provider ('cloudflare' or 'bunny')
 * @returns String containing srcSet attribute value
 */
export function generateSrcSet(url: string): string {
  if (!url) return '';
  
  // Determine provider
  const isCloudflare = url.includes('r2.cloudflarestorage.com');
  const isBunny = url.includes('b-cdn.net');
  
  if (!isCloudflare && !isBunny) return '';
  
  // Width breakpoints for responsive images
  const widths = [320, 480, 640, 768, 1024, 1280, 1536, 1920];
  
  return widths
    .map(w => {
      const optimizedUrl = getOptimizedImageUrl(url, w);
      return `${optimizedUrl} ${w}w`;
    })
    .join(', ');
}
