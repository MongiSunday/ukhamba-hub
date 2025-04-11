
import { Program } from './types';
import { featuredPrograms } from './featured';
import { youthPrograms } from './youth';
import { gbvPrograms } from './gbv';
import { ruralPrograms } from './rural';
import { mediaPrograms } from './media';
import { faithPrograms } from './faith';
import { leadershipPrograms } from './leadership';
import { programCategories } from './categories';

// Combine all programs into a single array for easy lookup
export const programsData: Program[] = [
  ...featuredPrograms,
  ...youthPrograms,
  ...gbvPrograms,
  ...ruralPrograms,
  ...mediaPrograms,
  ...faithPrograms,
  ...leadershipPrograms
];

export type { Program };
export { 
  featuredPrograms,
  youthPrograms,
  gbvPrograms,
  ruralPrograms,
  mediaPrograms,
  faithPrograms,
  leadershipPrograms,
  programCategories
};
