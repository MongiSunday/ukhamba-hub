
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
import { RefreshCcw, AlertTriangle } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

  // Only show error toast for critical errors, not for image loading issues
  React.useEffect(() => {
    if (error && error.includes("critical")) {
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

  // Handle retry loading of images
  const handleRetry = () => {
    toast({
      title: "Retrying",
      description: "Attempting to load images again...",
    });
    retryLoading();
  };
  
  const reportIssue = () => {
    toast({
      title: "Issue Reported",
      description: "Thank you for reporting this issue. Our team has been notified.",
    });
    // In a real application, this would send a report to the server
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
            {/* Show error message only if there are no images and there's an error */}
            {error && filteredItems.length === 0 && (
              <div className="container-custom py-8">
                <Alert variant="default" className="bg-amber-50 border border-amber-200">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <AlertDescription className="text-amber-800 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                    <span>Images couldn't be loaded. Please try again later.</span>
                    <div className="flex gap-3 mt-3 sm:mt-0">
                      <Button 
                        variant="outline" 
                        onClick={handleRetry}
                        size="sm"
                        className="gap-1 border-amber-300 text-amber-800 hover:bg-amber-100"
                      >
                        <RefreshCcw size={14} />
                        Try Again
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-amber-200 text-amber-800 hover:bg-amber-300"
                        onClick={reportIssue}
                      >
                        Report This Issue
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
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
