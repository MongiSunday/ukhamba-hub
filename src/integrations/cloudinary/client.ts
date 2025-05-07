
interface CloudinaryConfig {
  cloudName: string;
  apiKey?: string; 
  isSecure?: boolean;
}

/**
 * Cloudinary configuration
 */
export const cloudinaryConfig: CloudinaryConfig = {
  cloudName: "dtqdq3fqq", // Updated with actual cloud name
  isSecure: true,
};

/**
 * Generate a Cloudinary URL for an image
 * @param publicId Image ID or path in Cloudinary
 * @param options Transformation options
 */
export function buildCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    crop?: 'fill' | 'limit' | 'pad' | 'scale' | 'crop';
    format?: 'auto' | 'webp' | 'png' | 'jpg' | 'gif';
    effect?: string;
  }
): string {
  // Clean the public ID
  const cleanPublicId = publicId
    .replace(/^https?:\/\/[^\/]+\//, '') // Remove domain if present
    .replace(/\.[^/.]+$/, ''); // Remove file extension
  
  // Start building the transformation string
  const transformations: string[] = [];

  if (options) {
    // Add width and height if provided
    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height}`);
    
    // Add crop mode if provided
    if (options.crop) transformations.push(`c_${options.crop}`);
    
    // Add quality if provided
    if (options.quality) transformations.push(`q_${options.quality}`);
    
    // Add format if provided
    if (options.format) transformations.push(`f_${options.format}`);
    
    // Add effect if provided
    if (options.effect) transformations.push(`e_${options.effect}`);
  }
  
  // Add default optimizations if no specific transformations
  if (transformations.length === 0) {
    transformations.push('q_auto', 'f_auto');
  }
  
  // Construct the URL
  const transformationString = transformations.length > 0 ? transformations.join(',') + '/' : '';
  const protocol = cloudinaryConfig.isSecure ? 'https' : 'http';

  return `${protocol}://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformationString}${cleanPublicId}`;
}

/**
 * Generate a Cloudinary srcset for responsive images
 * @param publicId Image ID or path in Cloudinary
 */
export function buildCloudinarySrcSet(publicId: string): string {
  // Define breakpoints for srcset
  const breakpoints = [320, 480, 640, 768, 1024, 1280, 1536];
  
  return breakpoints
    .map(width => `${buildCloudinaryUrl(publicId, { width, quality: 80, format: 'auto' })} ${width}w`)
    .join(', ');
}

