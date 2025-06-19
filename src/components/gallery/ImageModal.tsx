
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CloudflareImage } from '@/types/gallery';
import { X } from 'lucide-react';

interface ImageModalProps {
  image: CloudflareImage;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal = ({ image, isOpen, onClose }: ImageModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-ubuntu font-bold text-ukhamba-brown mb-2">
                {image.title}
              </DialogTitle>
              <Badge variant="outline" className="mb-4">
                {image.category.replace('-', ' ')}
              </Badge>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>
        
        <div className="px-6">
          <div className="aspect-video overflow-hidden rounded-lg mb-4">
            <img
              src={image.fullUrl}
              alt={image.alt}
              className="w-full h-full object-contain bg-gray-50"
            />
          </div>
          
          {image.description && (
            <p className="text-ukhamba-brown/80 leading-relaxed pb-6">
              {image.description}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
