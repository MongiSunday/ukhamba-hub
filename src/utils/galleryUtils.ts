/**
 * Utility functions for the gallery feature
 */

/**
 * Formats a display name by replacing hyphens and underscores with spaces
 * and capitalizing the first letter of each word.
 */
export function formatDisplayName(name: string): string {
  // Special case for renamed categories
  if (name === 'youth-and-film') {
    return 'Youth & Film Industry';
  }
  if (name === 'community-relief') {
    return 'Community Relief Help';
  }
  
  return name.replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Creates a gallery item from file metadata and category information
 */
export function createGalleryItemFromMetadata({
  image,
  index,
  categoryId,
  subcategoryId = null,
  imageUrl,
  categoryDescriptions,
  subcategoryDescriptions
}: {
  image: any,
  index: number,
  categoryId: string,
  subcategoryId?: string | null,
  imageUrl: string,
  categoryDescriptions: Record<string, string>,
  subcategoryDescriptions: Record<string, Record<string, string>>
}) {
  // Create a clean title without exposing the raw filename
  const rawTitle = image.name.replace(/\.[^/.]+$/, ''); // Remove file extension
  const displayTitle = formatDisplayName(rawTitle);
  
  // Get category and subcategory information
  const categoryName = formatDisplayName(categoryId);
  const categoryDesc = categoryDescriptions[categoryId] || '';
  
  let description = `${categoryDesc} - ${categoryName}`;
  
  if (subcategoryId) {
    const subcategoryName = formatDisplayName(subcategoryId);
    const subcategoryDesc = subcategoryDescriptions[categoryId]?.[subcategoryId] || '';
    description = `${subcategoryDesc} - ${categoryName}: ${subcategoryName}`;
  }
  
  return {
    id: subcategoryId 
      ? `${categoryId}-${subcategoryId}-${index}` 
      : `${categoryId}-main-${index}`,
    title: displayTitle,
    description,
    imageUrl,
    categoryId,
    subcategoryId,
    type: 'image' as const,
    date: image.created_at || new Date().toISOString(),
    featured: subcategoryId ? index % 5 === 0 : index % 5 === 0,
  };
}
