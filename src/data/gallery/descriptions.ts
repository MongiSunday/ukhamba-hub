
/**
 * Descriptive text for gallery categories and subcategories
 */

/**
 * Maps category IDs to descriptive text
 */
export const categoryDescriptions: Record<string, string> = {
  'homeless-people': 'Supporting and uplifting those living on the streets',
  'ubukhosi-namakhosi': 'Honoring and preserving traditional culture and leadership',
  'community-relief': 'Providing assistance during times of hardship and crisis',
  'youth': 'Empowering the next generation through various programs',
  'motivation': 'Inspiring positive change and personal growth',
  'youth-and-film': 'Supporting youth involvement in the film and entertainment industry',
  'home-care': 'Providing care and comfort to those in need',
  'family-counseling': 'Supporting families through professional guidance',
  'women': 'Empowering women through various initiatives and programs',
  'schools': 'Supporting educational development and growth'
};

/**
 * Maps subcategory IDs to descriptive text, organized by parent category
 */
export const subcategoryDescriptions: Record<string, Record<string, string>> = {
  'homeless-people': {
    'counselling-data': 'Counselling and data collection to improve lives',
    'warm-clothes': 'Providing warm clothing during winter months',
    'better-life': 'Introducing pathways to a better quality of life',
    'loved-needed': 'Making the homeless feel valued and needed',
    'decent-meals': 'Providing nutritious meals on a regular basis',
    'lost-destitute': 'Caring for the lost and destitute in our communities'
  },
  'ubukhosi-namakhosi': {
    'modern-society': 'Integrating traditional culture into modern society',
    'traditional-rituals': 'Preserving important traditional practices',
    'virginity': 'Celebrating and promoting traditional values',
    'ceremonies': 'Observing and honoring traditional ceremonies',
    'common-values': 'Sharing values that unite communities',
    'traditional-leaders': 'Collaboration with traditional leadership',
    'multicultural': 'Celebrating diversity and various cultural expressions',
    'promoting-culture': 'Initiatives to promote cultural awareness'
  },
  'community-relief': {
    'hard-times': 'Assisting communities during difficult periods'
  },
  'youth': {
    'dance-competitions': 'Youth expression through dance in townships',
    'sports-gymnastics': 'Promoting athletic activities and gymnastics',
    'entertainment': 'Youth-focused entertainment programs',
    'training-development': 'Skills training and personal development',
    'city-businesses': 'Supporting young entrepreneurs in urban areas',
    'township-motivation': 'Inspiring youth in township communities',
    'township-sports': 'Promoting sports activities in townships',
    'workshops': 'Educational workshops for skills development',
    'township-businesses': 'Supporting young entrepreneurs in townships'
  },
  'motivation': {
    'life-saving-seminars': 'Seminars focused on mental health and wellbeing',
    'gbv-seminars': 'Workshops addressing gender-based violence issues',
    'gbv-programs': 'Programs combating gender-based violence'
  },
  'youth-and-film': {
    'film-professionals': 'Supporting young writers, producers, and actors',
    'networking': 'Creating opportunities for industry connections',
    'support-finance': 'Information on financial support and resources'
  },
  'home-care': {
    'disability': 'Supporting people living with disabilities',
    'life-stories': 'Sharing experiences and providing spiritual support',
    'hospices-elderly': 'Care for the elderly and those in hospices'
  },
  'family-counseling': {
    'professional-help': 'Professional counseling services',
    'home-sessions': 'In-home family counseling sessions',
    'video-tv': 'Counseling through media productions'
  },
  'women': {
    'professional-women': 'Supporting women in professional roles',
    'conventions-seminars': 'Gatherings focused on women\'s issues',
    'life-challenges': 'Addressing women\'s unique life challenges'
  },
  'schools': {
    'higher-education': 'Preparing students for higher education',
    'post-matriculation': 'Support for life after matriculation',
    'motivation-equipping': 'Motivational programs for school students'
  }
};
