
import { CloudflareImage } from '@/types/gallery';

// TODO: Replace these with your actual Cloudflare image IDs
export const imageData = [
  {
    id: 'community-event-1',
    cloudflareId: '6e751fac-4408-4994-59a3-640d85236b00',
    title: 'Community Outreach Program',
    description: 'Our team engaging with local community members during a health awareness campaign.',
    alt: 'Community volunteers at health awareness event',
    category: 'community-events'
  },
  {
    id: 'youth-program-1',
    cloudflareId: '667b2617-1271-449f-8802-50ef4dceb300',
    title: 'Youth Leadership Workshop',
    description: 'Young leaders participating in our skills development program.',
    alt: 'Youth participating in leadership workshop',
    category: 'youth-programs'
  },
  {
    id: 'rural-development-1',
    cloudflareId: '0f541fd3-a7b9-4fb4-d314-65a770984900',
    title: 'Rural Infrastructure Development',
    description: 'Progress on water access project in rural communities.',
    alt: 'Rural water infrastructure project',
    category: 'rural-development'
  },
  {
    id: 'faith-initiative-1',
    cloudflareId: 'e5b4ac45-da7b-41e8-390b-a55ea4a14100',
    title: 'Interfaith Dialogue Session',
    description: 'Community leaders from different faiths coming together for meaningful dialogue.',
    alt: 'Interfaith community dialogue meeting',
    category: 'faith-initiatives'
  },
  {
    id: 'gbv-awareness-1',
    cloudflareId: '533ce98e-c5b6-402d-45d6-0d56f7caec00',
    title: 'GBV Awareness Campaign',
    description: 'Educational workshop on gender-based violence prevention and support.',
    alt: 'GBV awareness workshop participants',
    category: 'gbv-prevention'
  },
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
