
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '@/data/gallery/images';
import { getOptimizedImageUrl } from '@/lib/utils';

interface GalleryLightboxProps {
  isOpen: boolean;
  item: GalleryItem | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const GalleryLightbox = ({
  isOpen,
  item,
  onClose,
  onPrevious,
  onNext,
  hasNext,
  hasPrevious,
}: GalleryLightboxProps) => {
  if (!item) return null;

  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[80vw] max-h-[90vh] p-0 bg-black/95 text-white border-gray-800">
        <div className="relative w-full h-full flex flex-col">
          <DialogHeader className="p-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-white">{item.title}</DialogTitle>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-hidden relative">
            <div className="flex items-center justify-center h-full p-2">
              <img 
                src={getOptimizedImageUrl(item.imageUrl, 1200)} 
                alt={item.title} 
                className="max-h-[60vh] max-w-full object-contain"
                loading="eager"
              />
            </div>

            <div className="absolute top-1/2 left-4 -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                disabled={!hasPrevious}
                className="bg-black/50 text-white rounded-full hover:bg-black/70 disabled:opacity-30"
              >
                <ChevronLeft size={24} />
              </Button>
            </div>

            <div className="absolute top-1/2 right-4 -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                disabled={!hasNext}
                className="bg-black/50 text-white rounded-full hover:bg-black/70 disabled:opacity-30"
              >
                <ChevronRight size={24} />
              </Button>
            </div>
          </div>

          <DialogDescription className="p-4 bg-black/80">
            <p className="text-white/90 text-sm mb-2">{item.description}</p>
            <p className="text-white/60 text-xs">{formattedDate}</p>
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryLightbox;
