
import React from 'react';
import { Button } from '@/components/ui/button';
import { formatDisplayName } from '@/utils/galleryUtils';

interface GalleryFiltersProps {
  categories: string[];
  subcategories: Record<string, string[]>;
  activeCategory: string | null;
  activeSubcategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  onSubcategoryChange: (subcategoryId: string | null) => void;
}

const GalleryFilters = ({
  categories,
  subcategories,
  activeCategory,
  activeSubcategory,
  onCategoryChange,
  onSubcategoryChange,
}: GalleryFiltersProps) => {
  return (
    <div className="py-6 bg-ukhamba-cream bg-opacity-30">
      <div className="container-custom">
        <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
        
        {/* Main categories */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            className={activeCategory === null ? "bg-ukhamba-terracotta text-white" : "border-ukhamba-teal text-foreground hover:bg-ukhamba-teal hover:text-white"}
            onClick={() => {
              onCategoryChange(null);
              onSubcategoryChange(null);
            }}
          >
            All Categories
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={activeCategory === category ? "bg-ukhamba-terracotta text-white" : "border-ukhamba-teal text-foreground hover:bg-ukhamba-teal hover:text-white"}
              onClick={() => {
                onCategoryChange(category);
                onSubcategoryChange(null);
              }}
            >
              {formatDisplayName(category)}
            </Button>
          ))}
        </div>
        
        {/* Subcategories (only show if a category is selected) */}
        {activeCategory && subcategories[activeCategory] && subcategories[activeCategory].length > 0 && (
          <div>
            <h3 className="text-md font-medium mb-2">Subcategories</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={activeSubcategory === null ? "default" : "outline"}
                className={activeSubcategory === null ? "bg-ukhamba-teal text-white" : "border-ukhamba-terracotta text-foreground hover:bg-ukhamba-terracotta hover:text-white"}
                onClick={() => onSubcategoryChange(null)}
              >
                All
              </Button>
              
              {subcategories[activeCategory].map((subcategory) => (
                <Button
                  key={subcategory}
                  size="sm"
                  variant={activeSubcategory === subcategory ? "default" : "outline"}
                  className={activeSubcategory === subcategory ? "bg-ukhamba-teal text-white" : "border-ukhamba-terracotta text-foreground hover:bg-ukhamba-terracotta hover:text-white"}
                  onClick={() => onSubcategoryChange(subcategory)}
                >
                  {formatDisplayName(subcategory)}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryFilters;
