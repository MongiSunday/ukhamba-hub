
import { Program } from './types';
import { youthPrograms } from './youth';
import { gbvPrograms } from './gbv';
import { ruralPrograms } from './rural';
import { mediaPrograms } from './media';
import { faithPrograms } from './faith';
import { leadershipPrograms } from './leadership';

export interface ProgramCategory {
  id: string;
  title: string;
  description: string;
  programs: Program[];
}

export const programCategories: ProgramCategory[] = [
  {
    id: 'youth',
    title: 'Schools & Youth Empowerment',
    description: 'We believe that the foundation for a brighter South Africa starts in our schools.',
    programs: youthPrograms
  },
  {
    id: 'gbv',
    title: 'Gender-Based Violence & Mental Health Advocacy',
    description: 'No society can thrive when its people live in fear. We tackle gender-based violence (GBV) and mental health crises head-on.',
    programs: gbvPrograms
  },
  {
    id: 'rural',
    title: 'Rural & Community Development',
    description: 'Empowerment starts with access. Our rural development programs focus on education, culture, and entrepreneurship.',
    programs: ruralPrograms
  },
  {
    id: 'media',
    title: 'Media, Arts & Theatre for Change',
    description: 'We use the power of storytelling to inspire transformation through performances, content creation, and digital campaigns.',
    programs: mediaPrograms
  },
  {
    id: 'faith',
    title: 'Faith-Based & Community Outreach',
    description: 'Our work extends into places of worship and community centers, where people gather in search of hope and guidance.',
    programs: faithPrograms
  },
  {
    id: 'leadership',
    title: 'Leadership & Policy Engagement',
    description: 'True change requires strong leadership. We work with policymakers, educators, and community leaders.',
    programs: leadershipPrograms
  }
];
