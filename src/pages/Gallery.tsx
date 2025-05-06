
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GalleryHero from '@/components/GalleryHero';
import GalleryFilters from '@/components/GalleryFilters';
import GalleryGrid from '@/components/GalleryGrid';
import GalleryLightbox from '@/components/GalleryLightbox';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { GalleryItem } from '@/data/gallery/images';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';

const ITEMS_PER_PAGE = 12;

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(-1);
  const { toast } = useToast();
  
  // Use the custom hook to fetch gallery images with pagination
  const { 
    items: filteredItems, 
    loading, 
    error, 
    categories, 
    subcategories, 
    totalPages,
    totalItems,
    provider,
    retryLoading
  } = useGalleryImages({
    categoryId: activeCategory,
    subcategoryId: activeSubcategory,
    page: currentPage,
    itemsPerPage: ITEMS_PER_PAGE
  });

  // Show error toast if there is an error fetching images
  React.useEffect(() => {
    if (error) {
      toast({
        title: "Notice",
        description: error,
        variant: "default",
      });
    }
  }, [error, toast]);

  const handleItemClick = (item: GalleryItem) => {
    const index = filteredItems.findIndex(i => i.id === item.id);
    setSelectedItem(item);
    setCurrentItemIndex(index);
  };

  const handlePrevious = () => {
    if (currentItemIndex > 0) {
      const newIndex = currentItemIndex - 1;
      setCurrentItemIndex(newIndex);
      setSelectedItem(filteredItems[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentItemIndex < filteredItems.length - 1) {
      const newIndex = currentItemIndex + 1;
      setCurrentItemIndex(newIndex);
      setSelectedItem(filteredItems[newIndex]);
    }
  };

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSubcategory]);

  // Get badge color based on provider
  const getProviderBadge = () => {
    switch (provider) {
      case 'cloudflare':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Cloudflare R2</Badge>;
      case 'supabase':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Supabase</Badge>;
      case 'fallback':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Local Fallback</Badge>;
      default:
        return null;
    }
  };

  // Generate pagination links
  const renderPaginationLinks = () => {
    const links = [];
    
    // Determine which page numbers to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    // Ensure we always show 5 pages when possible
    if (endPage - startPage < 4 && totalPages > 5) {
      if (currentPage < totalPages / 2) {
        endPage = Math.min(startPage + 4, totalPages);
      } else {
        startPage = Math.max(endPage - 4, 1);
      }
    }
    
    // First page
    if (startPage > 1) {
      links.push(
        <PaginationItem key="first">
          <PaginationLink onClick={() => setCurrentPage(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      // Show ellipsis if there's a gap
      if (startPage > 2) {
        links.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => setCurrentPage(i)} isActive={currentPage === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Last page
    if (endPage < totalPages) {
      // Show ellipsis if there's a gap
      if (endPage < totalPages - 1) {
        links.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      links.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => setCurrentPage(totalPages)} isActive={currentPage === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return links;
  };

  const handleRetry = () => {
    toast({
      title: "Retrying",
      description: "Attempting to load images again...",
    });
    retryLoading();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <GalleryHero />
        
        <GalleryFilters 
          categories={categories}
          subcategories={subcategories}
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
          onCategoryChange={setActiveCategory}
          onSubcategoryChange={setActiveSubcategory}
        />
        
        {loading ? (
          <div className="container-custom py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array(4).fill(0).map((_, index) => (
                <div key={index} className="aspect-square">
                  <Skeleton className="w-full h-full" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="container-custom py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {provider !== 'unknown' && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground/70">Images from:</span>
                    {getProviderBadge()}
                  </div>
                )}
              </div>
              
              {error && (
                <Button 
                  variant="outline" 
                  onClick={handleRetry}
                  className="gap-2"
                >
                  <RefreshCcw size={16} />
                  Retry
                </Button>
              )}
            </div>
            
            {error && (
              <div className="container-custom py-4">
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                  <p className="text-amber-800">
                    {error}
                  </p>
                </div>
              </div>
            )}
            
            <GalleryGrid 
              items={filteredItems} 
              onItemClick={handleItemClick}
            />
            
            {totalItems > 0 && (
              <div className="container-custom flex justify-center py-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
                        aria-disabled={currentPage === 1}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {renderPaginationLinks()}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        aria-disabled={currentPage === totalPages}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}

        <GalleryLightbox 
          isOpen={!!selectedItem}
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={currentItemIndex > 0}
          hasNext={currentItemIndex < filteredItems.length - 1}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
