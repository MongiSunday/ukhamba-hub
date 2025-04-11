
export type GalleryCategory = {
  id: string;
  name: string;
  description: string;
  subcategories?: GallerySubcategory[];
};

export type GallerySubcategory = {
  id: string;
  name: string;
  parentId: string;
};

export const galleryCategories: GalleryCategory[] = [
  {
    id: 'youth',
    name: 'Youth Engagement',
    description: 'Programs and initiatives focused on empowering young South Africans',
    subcategories: [
      {
        id: 'youth-school',
        name: 'School Visits',
        parentId: 'youth'
      },
      {
        id: 'youth-workshops',
        name: 'Youth Workshops',
        parentId: 'youth'
      },
      {
        id: 'youth-leadership',
        name: 'Leadership Development',
        parentId: 'youth'
      }
    ]
  },
  {
    id: 'community',
    name: 'Community Outreach',
    description: 'Building stronger communities through engagement and support',
    subcategories: [
      {
        id: 'community-events',
        name: 'Community Events',
        parentId: 'community'
      },
      {
        id: 'community-workshops',
        name: 'Educational Workshops',
        parentId: 'community'
      }
    ]
  },
  {
    id: 'culture',
    name: 'Cultural Heritage',
    description: 'Celebrating and preserving South Africa\'s rich cultural heritage',
    subcategories: [
      {
        id: 'culture-celebrations',
        name: 'Cultural Celebrations',
        parentId: 'culture'
      },
      {
        id: 'culture-preservation',
        name: 'Heritage Preservation',
        parentId: 'culture'
      }
    ]
  },
  {
    id: 'events',
    name: 'Special Events',
    description: 'Key moments, celebrations, and significant gatherings',
    subcategories: [
      {
        id: 'events-fundraisers',
        name: 'Fundraisers',
        parentId: 'events'
      },
      {
        id: 'events-conferences',
        name: 'Conferences',
        parentId: 'events'
      }
    ]
  }
];
