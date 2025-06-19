
import { CloudflareImage } from '@/types/gallery';

// TODO: Replace these with your actual Cloudflare image IDs
export const imageData = [
  {
    id: 'community-event-1',
    cloudflareId: 'example-image-id-1',
    title: 'Community Outreach Program',
    description: 'Our team engaging with local community members during a health awareness campaign.',
    alt: 'Community volunteers at health awareness event',
    category: 'community-events'
  },
  {
    id: 'youth-program-1',
    cloudflareId: 'example-image-id-2',
    title: 'Youth Leadership Workshop',
    description: 'Young leaders participating in our skills development program.',
    alt: 'Youth participating in leadership workshop',
    category: 'youth-programs'
  },
  {
    id: 'rural-development-1',
    cloudflareId: 'example-image-id-3',
    title: 'Rural Infrastructure Development',
    description: 'Progress on water access project in rural communities.',
    alt: 'Rural water infrastructure project',
    category: 'rural-development'
  },
  {
    id: 'faith-initiative-1',
    cloudflareId: 'example-image-id-4',
    title: 'Interfaith Dialogue Session',
    description: 'Community leaders from different faiths coming together for meaningful dialogue.',
    alt: 'Interfaith community dialogue meeting',
    category: 'faith-initiatives'
  },
  {
    id: 'gbv-awareness-1',
    cloudflareId: 'example-image-id-5',
    title: 'GBV Awareness Campaign',
    description: 'Educational workshop on gender-based violence prevention and support.',
    alt: 'GBV awareness workshop participants',
    category: 'gbv-prevention'
  },
  {
    id: 'media-training-1',
    cloudflareId: 'example-image-id-6',
    title: 'Media Literacy Training',
    description: 'Community members learning digital media skills and critical thinking.',
    alt: 'Media literacy training session',
    category: 'media-literacy'
  }
];

// Function to generate gallery images with URLs (async version)
export const getGalleryImages = async (): Promise<CloudflareImage[]> => {
  const { getCloudflareImageUrl } = await import('@/config/cloudflare');
  
  const images = await Promise.all(
    imageData.map(async (img) => ({
      ...img,
      thumbnailUrl: await getCloudflareImageUrl(img.cloudflareId, 'thumbnail'),
      fullUrl: await getCloudflareImageUrl(img.cloudflareId, 'full')
    }))
  );
  
  return images;
};
