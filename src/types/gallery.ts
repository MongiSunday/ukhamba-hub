
export interface CloudflareImage {
  id: string;
  title: string;
  description?: string;
  alt: string;
  category: string;
  cloudflareId: string;
  thumbnailUrl: string;
  fullUrl: string;
  uploaded?: string;
  originalFilename?: string;
}

export interface CloudflareConfig {
  accountHash: string;
  deliveryUrl: string;
  variants: {
    thumbnail: string;
    full: string;
    [key: string]: string;
  };
}
