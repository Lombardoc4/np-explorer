import {
  CalendarCheck2,
  House,
  Car,
  FlameKindling,
  TriangleAlert,
  Bus,
} from 'lucide-react';

const iconProps = {
  strokeWidth: 1,
};

type featureInfoProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export const featureInfo: featureInfoProps[] = [
  {
    icon: <CalendarCheck2 {...iconProps} />,
    title: 'Events',
    description:
      'Sign up for upcoming events, like movies under the stars. There are plenty of suggested things to do recommended by and for specific national parks.',
  },
  {
    icon: <House {...iconProps} />,
    title: 'Visitor Centers',
    description:
      'Visit one of the over 550 visitor centers managed by the NPS to get even more information from an educated park range. There are plenty of chances to get your NPS Passport stamped',
  },
  {
    icon: <Car {...iconProps} />,
    title: 'Parking',
    description:
      'Never get lost in the vast road system of our great National Parks. Get direction to your favorite parks and accessible parking lots',
  },
  {
    icon: <FlameKindling {...iconProps} />,
    title: 'Camping',
    description:
      'Whether first-come first-serve or requiring reservation, find your next campground and hit the roads.',
  },
  {
    icon: <TriangleAlert {...iconProps} />,
    title: 'Alerts',
    description:
      "Get the heads up before you go, with update to date alerts, you're ahead of the game",
  },
  {
    icon: <Bus {...iconProps} />,
    title: 'Tours',
    description:
      'Interesting in learning about the rich history of our national parks, book a tour with the NPS.',
  },
];
