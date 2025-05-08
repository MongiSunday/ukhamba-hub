import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GalleryHero from '@/components/GalleryHero';
import GalleryFilters from '@/components/GalleryFilters';
import GalleryGrid from '@/components/GalleryGrid';
import GalleryLightbox from '@/components/GalleryLightbox';
import GalleryPagination from '@/components/GalleryPagination';
import GalleryErrorMessage from '@/components/GalleryErrorMessage';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { GalleryItem } from '@/data/gallery/images';
import { useGalleryImages } from '@/hooks/useGalleryImages';

const ITEMS_PER_PAGE = 12;

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(-1);
  const { toast } = useToast();

  // Use the custom hook for gallery data
  const {
    items: filteredItems,
    loading,
    error,
    categories,
    subcategories,
    totalPages,
    totalItems,
    retryLoading
  } = useGalleryImages({
    categoryId: activeCategory,
    subcategoryId: activeSubcategory,
    page: currentPage,
    itemsPerPage: ITEMS_PER_PAGE
  });

  // Update currentItemIndex when selectedItem or filteredItems change
  useEffect(() => {
    if (selectedItem) {
      const idx = filteredItems.findIndex(i => i.id === selectedItem.id);
      setCurrentItemIndex(idx);
    } else {
      setCurrentItemIndex(-1);
    }
  }, [selectedItem, filteredItems]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSubcategory]);

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

  const renderLoadingState = () => (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(4).fill(0).map((_, index) => (
          <div key={index} className="aspect-square">
            <Skeleton className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );

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
          renderLoadingState()
        ) : (
          <>
            {/* Show error message only if there are no images and there's an error */}
            {error && filteredItems.length === 0 && (
              <GalleryErrorMessage error={error as string} onRetry={retryLoading} />
            )}
            <GalleryGrid 
              items={filteredItems} 
              onItemClick={handleItemClick}
            />
            <GalleryPagination
              currentPage={currentPage}
              totalPages={totalPages || 1}
              totalItems={totalItems || 0}
              setCurrentPage={setCurrentPage}
            />
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
