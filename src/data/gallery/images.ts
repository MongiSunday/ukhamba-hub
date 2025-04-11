
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
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9a6b6f6e4e01',
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
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
    categoryId: 'youth',
    subcategoryId: 'youth-school',
    type: 'image',
    date: '2024-02-22',
  },
  {
    id: 'youth-school-3',
    title: 'Durban Science Fair',
    description: 'Students showcasing their science projects at our annual fair in Durban.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
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
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
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
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
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
    imageUrl: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31',
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
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18',
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
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528',
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
    imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353',
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
    imageUrl: 'https://images.unsplash.com/photo-1572211696707-e6e856eb9421',
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
    imageUrl: 'https://images.unsplash.com/photo-1553197764-0d3ef2aafdda',
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
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865',
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
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
    categoryId: 'events',
    subcategoryId: 'events-conferences',
    type: 'image',
    date: '2024-01-25',
  },
];
