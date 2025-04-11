
import { Program } from './types';

export const featuredPrograms: Program[] = [
  {
    id: 'youth',
    title: 'Youth Development',
    description: 'Empowering young South Africans with skills, knowledge, and resources to become agents of change in their communities.',
    image: 'https://nrpheailknubabyvsggy.supabase.co/storage/v1/object/public/gallery/youth/workshops/Youth%20Workshops_2.webp',
    longDescription: 'Our Youth Development program focuses on building leadership skills, providing educational resources, and creating safe spaces for young people to learn and grow. Through workshops, mentorship programs, and hands-on activities, we empower youth to become confident, socially responsible leaders in their communities.',
    impact: 'Since launching this program, we have worked with over 5,000 young people across South Africa, with 85% reporting increased confidence and leadership abilities.',
    location: 'Various schools and community centers across South Africa',
    date: 'Year-round programming',
    participants: 'Youth ages 13-25'
  },
  {
    id: 'gender',
    title: 'Gender Equality',
    description: 'Addressing gender-based violence and promoting equality through education, counseling, and community outreach programs.',
    image: 'https://nrpheailknubabyvsggy.supabase.co/storage/v1/object/public/gallery/women/conventions-seminars/Women%20Conventions%20and%20Seminars%202.webp',
    longDescription: 'Our Gender Equality initiative works to combat gender-based violence and discrimination through awareness campaigns, support services for survivors, and educational workshops that challenge harmful gender norms. We work with communities to create environments where all genders are treated with dignity and respect.',
    impact: 'Our programming has reached over 20 communities, trained more than 500 community leaders, and provided direct support to hundreds of survivors of gender-based violence.',
    location: 'Communities throughout South Africa, with focus on rural and high-need areas',
    date: 'Ongoing, with intensive community dialogues held quarterly',
    participants: 'All community members, with specialized programs for men, women, and youth'
  },
  {
    id: 'mental-health',
    title: 'Mental Health Support',
    description: 'Providing accessible mental health resources, support groups, and breaking the stigma around mental health in communities.',
    image: 'https://nrpheailknubabyvsggy.supabase.co/storage/v1/object/public/gallery/family-counseling/professional-help/Professional%20Counseling%20Help%201.webp',
    longDescription: 'Our Mental Health Support initiative addresses the critical need for accessible mental health resources in South African communities. Through counseling services, peer support groups, and public education campaigns, we work to reduce stigma and increase access to vital mental health support.',
    impact: 'We have facilitated over 1,000 support group sessions and seen a 40% increase in community members seeking mental health support services.',
    location: 'Community centers, schools, and health facilities across South Africa',
    date: 'Year-round programming with special events during Mental Health Awareness Month',
    participants: 'Open to all community members; specialized support available for youth and vulnerable populations'
  }
];
