
import React from 'react';
import { Image } from 'lucide-react';
import { GalleryItem } from '@/data/gallery/images';
import { getOptimizedImageUrl } from '@/lib/utils';

interface GalleryGridProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
}

const GalleryGrid = ({ items, onItemClick }: GalleryGridProps) => {
  return (
    <div className="container-custom py-8">
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-foreground/70">No gallery items found for the selected filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-lg overflow-hidden shadow-md hover-scale cursor-pointer"
              onClick={() => onItemClick(item)}
            >
              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={getOptimizedImageUrl(item.imageUrl, 400, 400)}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Image size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white transform translate-y-2 opacity-90 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>
              </div>
              {item.featured && (
                <span className="absolute top-2 right-2 bg-ukhamba-gold text-white text-xs px-2 py-1 rounded">Featured</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;
