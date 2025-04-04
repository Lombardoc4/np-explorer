import { iconMap } from '../../lib/iconMap';

export type featureInfoProps = {
  id: keyof typeof iconMap;
  title: string;
  description: string;
};

export type FeatureInfo = Record<'activities' | 'places', featureInfoProps[]>;

export const featureInfo: FeatureInfo = {
  activities: [
    {
      id: 'events',
      title: 'Exciting Events',
      description:
        'Discover special events happening in your favorite national parks, from movies under the stars to guided night hikes. Explore, engage, and experience the parks like never before!',
    },
    {
      id: 'tours',
      title: 'Explore with a Tour',
      description:
        'Immerse yourself in the rich history and breathtaking landscapes of our national parks. Join an expert-led guided tour and uncover hidden gems along the way.',
    },
    {
      id: 'things-to-do',
      title: 'Go-to things to do',
      description:
        'Immerse yourself in the rich history and breathtaking landscapes of our national parks. Join an expert-led guided tour and uncover hidden gems along the way.',
    },
  ],
  places: [
    {
      id: 'visitor-centers',
      title: 'Visitor Centers',
      description:
        'Stop by one of over 550 visitor centers managed by the NPS to meet knowledgeable park rangers, get expert recommendations, and collect stamps for your NPS Passport.',
    },
    {
      id: 'campgrounds',
      title: 'Find Your Campsite',
      description:
        'From first-come, first-serve sites to reservable campgrounds, find the perfect place to set up camp and enjoy nature. Plan ahead and make the most of your trip.',
    },
    {
      id: 'parking',
      title: 'Seamless Parking',
      description:
        'Never struggle with parking again! Get real-time directions to accessible parking lots in your favorite parks so you can start your adventure stress-free.',
    },
  ],
};

// {
//   id: 'alerts',
//   title: 'Stay Informed',
//   type: 'places',
//   description:
//     "Don't get caught off guard! Stay up-to-date with real-time park alerts, closures, and safety updates before you go, so you're always prepared for your adventure.",
// },
