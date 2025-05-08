import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
 * Generates a srcSet string for responsive images given a base image URL.
 * Assumes the image service supports width parameters via `w` query (e.g., Cloudinary, modern CDNs).
 * @param imageUrl The base image URL
 * @param widths Array of widths to generate (default: [400, 800, 1200])
 * @returns srcSet string for <img srcSet="..." />
 */
export function generateSrcSet(imageUrl: string, widths: number[] = [400, 800, 1200]): string {
  if (!imageUrl) return '';
  // Example: append ?w=WIDTH or &w=WIDTH depending on existing query
  const hasQuery = imageUrl.includes('?');
  return widths
    .map(w => `${imageUrl}${hasQuery ? '&' : '?'}w=${w} ${w}w`)
    .join(', ');
}

/**
 * Returns an optimized image URL with optional width, height, and quality parameters.
 * If the image service supports query params (?w=, &h=, &q=), they will be appended.
 * @param imageUrl The base image URL
 * @param width Optional width
 * @param height Optional height
 * @param options Optional object: { quality }
 * @returns Optimized image URL string
 */
export function getOptimizedImageUrl(
  imageUrl: string,
  width?: number,
  height?: number,
  options?: { quality?: number }
): string {
  if (!imageUrl) return '';
  const params = [];
  if (width) params.push(`w=${width}`);
  if (height) params.push(`h=${height}`);
  if (options?.quality) params.push(`q=${options.quality}`);
  if (params.length === 0) return imageUrl;
  const joinChar = imageUrl.includes('?') ? '&' : '?';
  return imageUrl + joinChar + params.join('&');
}
