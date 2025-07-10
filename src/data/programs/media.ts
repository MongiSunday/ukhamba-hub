import { Program } from './types';

export const mediaPrograms: Program[] = [
  {
    id: 'theatre',
    title: 'Stage Plays & Theatre Productions',
    description: 'Bringing important issues to life through performance, reaching audiences with impactful narratives.',
    image: 'https://imagedelivery.net/NX5JuAHapC5vfV6t-dMeGg/e5b4ac45-da7b-41e8-390b-a55ea4a14100/public',
    longDescription: 'Our Theatre Program uses the power of live performance to address social issues and inspire change. Working with professional actors and community participants, we create engaging productions that tackle challenging topics including gender-based violence, mental health, and cultural identity. Each performance is followed by facilitated discussion, connecting artistic expression to community action.',
    impact: 'Our productions have reached over 25,000 audience members, with post-show surveys indicating significant shifts in attitudes and increased willingness to take action on social issues.',
    location: 'Theatres, schools, community centers, and public spaces across South Africa',
    date: 'Seasonal productions with touring performances throughout the year',
    participants: 'Professional and community actors; performances are accessible to audiences of all ages (with content warnings as appropriate)'
  },
  {
    id: 'film-tv',
    title: 'Film & Television Programs',
    description: 'Creating content that educates, informs, and shifts perspectives on social justice issues.',
    image: 'https://imagedelivery.net/NX5JuAHapC5vfV6t-dMeGg/bc1a5060-9893-49bb-9a8b-a436e031c400/public',
    longDescription: 'Our Film and Television initiatives produce compelling content that raises awareness about social issues while showcasing South African stories and talent. From documentary series to fictional dramas, our productions aim to educate, inspire, and challenge viewers while amplifying the voices of underrepresented communities.',
    impact: 'Our content has been broadcast to millions of viewers nationally, with significant social media engagement and measurable shifts in public discourse around featured issues.',
    location: 'Production throughout South Africa; broadcast nationally and via streaming platforms',
    date: 'Year-round production with seasonal program releases',
    participants: 'Professional and emerging filmmakers, with community involvement in story development'
  },
  {
    id: 'digital-campaigns',
    title: 'Radio & Social Media Campaigns',
    description: 'Using digital platforms to spread awareness and spark meaningful conversations.',
    image: 'https://imagedelivery.net/NX5JuAHapC5vfV6t-dMeGg/8f9a9a27-5dd1-421e-eaf2-097f10f07000/public',
    longDescription: 'Our Digital Media Campaigns leverage radio, social media, and online platforms to reach audiences with messages of hope, education, and social change. We create engaging, shareable content that addresses critical issues and directs people to resources and support services, meeting our audience where they are in the digital landscape.',
    impact: 'Our campaigns have reached millions across various platforms, with measurable increases in resource utilization and public engagement with featured social issues.',
    location: 'National radio networks and all major social media platforms',
    date: 'Continuous programming with targeted campaign periods throughout the year',
    participants: 'Digital content creators, community voices, and radio partners, with content reaching diverse audiences across South Africa'
  }
];
