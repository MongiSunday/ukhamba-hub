
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CloudflareImage } from '@/types/gallery';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  image: CloudflareImage;
  imageIndex: number;
  images: CloudflareImage[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

const ImageModal = ({ image, imageIndex, images, isOpen, onClose, onNavigate }: ImageModalProps) => {
  const canGoLeft = imageIndex > 0;
  const canGoRight = imageIndex < images.length - 1;

  const handlePrevious = () => {
    if (canGoLeft) {
      onNavigate(imageIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoRight) {
      onNavigate(imageIndex + 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (event.key === 'ArrowLeft' && canGoLeft) {
        handlePrevious();
      } else if (event.key === 'ArrowRight' && canGoRight) {
        handleNext();
      } else if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, canGoLeft, canGoRight, imageIndex]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-ubuntu font-bold text-ukhamba-brown mb-2">
                {image.title}
              </DialogTitle>
              <Badge variant="outline" className="mb-2">
                {image.category.replace('-', ' ')}
              </Badge>
              <p className="text-sm text-ukhamba-brown/60">
                {imageIndex + 1} of {images.length}
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <DialogDescription className="sr-only">
          {image.description || `View full size image of ${image.title}`}
        </DialogDescription>
        
        <div className="relative px-6 pb-6">
          {/* Navigation Buttons */}
          {canGoLeft && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          
          {canGoRight && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}

          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={image.fullUrl}
              alt={image.alt}
              className="w-full h-full object-contain bg-gray-50"
              onError={(e) => {
                console.error('Full size image failed to load:', image.fullUrl);
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
