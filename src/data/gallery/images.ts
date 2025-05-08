import { galleryCategories } from './categories';

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  subcategoryId?: string;
  type: 'image' | 'video';
  featured?: boolean;
  date: string;
};

export const galleryItems: GalleryItem[] = [
  // Youth Engagement - School Visits
  {
    id: 'youth-school-1',
    title: 'Cape Town High School Workshop',
    description: 'Students participating in our leadership workshop at Cape Town High School.',
    imageUrl: '',
    categoryId: 'youth',
    subcategoryId: 'youth-school',
    type: 'image',
    featured: true,
    date: '2024-03-15',
  },
  {
    id: 'youth-school-2',
    title: 'Johannesburg Reading Program',
    description: 'Volunteers teaching reading skills to primary school students in Johannesburg.',
    imageUrl: '',
    categoryId: 'youth',
    subcategoryId: 'youth-school',
    type: 'image',
    date: '2024-02-22',
  },
  {
    id: 'youth-school-3',
    title: 'Durban Science Fair',
    description: 'Students showcasing their science projects at our annual fair in Durban.',
    imageUrl: '',
    categoryId: 'youth',
    subcategoryId: 'youth-school',
    type: 'image',
    date: '2024-01-30',
  },
  
  // Youth Engagement - Youth Workshops
  {
    id: 'youth-workshops-1',
    title: 'Digital Skills Training',
    description: 'Young adults learning coding and web development at our digital skills workshop.',
    imageUrl: '',
    categoryId: 'youth',
    subcategoryId: 'youth-workshops',
    type: 'image',
    featured: true,
    date: '2024-03-05',
  },
  {
    id: 'youth-workshops-2',
    title: 'Entrepreneurship Bootcamp',
    description: 'Youth entrepreneurs pitching their business ideas at our weekend bootcamp.',
    imageUrl: '',
    categoryId: 'youth',
    subcategoryId: 'youth-workshops',
    type: 'image',
    date: '2024-02-18',
  },
  
  // Youth Engagement - Leadership Development
  {
    id: 'youth-leadership-1',
    title: 'Youth Leadership Summit',
    description: 'Future leaders engaging in group activities at our annual leadership summit.',
    imageUrl: '',
    categoryId: 'youth',
    subcategoryId: 'youth-leadership',
    type: 'image',
    date: '2024-03-22',
  },
  
  // Community Outreach - Community Events
  {
    id: 'community-events-1',
    title: 'Soweto Community Day',
    description: 'Families gathering for our community celebration event in Soweto.',
    imageUrl: '',
    categoryId: 'community',
    subcategoryId: 'community-events',
    type: 'image',
    featured: true,
    date: '2024-02-28',
  },
  {
    id: 'community-events-2',
    title: 'Health Awareness Campaign',
    description: 'Community members participating in our health screening and awareness drive.',
    imageUrl: '',
    categoryId: 'community',
    subcategoryId: 'community-events',
    type: 'image',
    date: '2024-01-15',
  },
  
  // Community Outreach - Educational Workshops
  {
    id: 'community-workshops-1',
    title: 'Adult Literacy Class',
    description: 'Adult learners improving their reading and writing skills in our literacy program.',
    imageUrl: '',
    categoryId: 'community',
    subcategoryId: 'community-workshops',
    type: 'image',
    date: '2024-03-10',
  },
  
  // Cultural Heritage - Cultural Celebrations
  {
    id: 'culture-celebrations-1',
    title: 'Heritage Day Festival',
    description: 'Community members in traditional attire celebrating South Africa\'s cultural diversity.',
    imageUrl: '',
    categoryId: 'culture',
    subcategoryId: 'culture-celebrations',
    type: 'image',
    featured: true,
    date: '2023-09-24',
  },
  
  // Cultural Heritage - Heritage Preservation
  {
    id: 'culture-preservation-1',
    title: 'Oral History Project',
    description: 'Elders sharing traditional stories with youth as part of our heritage preservation initiative.',
    imageUrl: '',
    categoryId: 'culture',
    subcategoryId: 'culture-preservation',
    type: 'image',
    date: '2024-02-05',
  },
  
  // Special Events - Fundraisers
  {
    id: 'events-fundraisers-1',
    title: 'Annual Gala Dinner',
    description: 'Supporters and partners at our annual fundraising gala in Cape Town.',
    imageUrl: '',
    categoryId: 'events',
    subcategoryId: 'events-fundraisers',
    type: 'image',
    featured: true,
    date: '2024-03-18',
  },
  
  // Special Events - Conferences
  {
    id: 'events-conferences-1',
    title: 'South African NGO Conference',
    description: 'Panel discussion at our national conference on community development strategies.',
    imageUrl: '',
    categoryId: 'events',
    subcategoryId: 'events-conferences',
    type: 'image',
    date: '2024-01-25',
  },
];
