import {
  Bus,
  CalendarCheck2,
  Car,
  FlameKindling,
  House,
  List,
} from 'lucide-react';

export interface ActivityDetails {
  name: string;
  icon?: React.ReactNode;
  path: string;
  count?: number;
}

export interface ActivityCategory {
  [key: string]: ActivityDetails;
}

export const activityCategories: ActivityCategory = {
  visitorcenters: {
    name: 'Visitor Centers',
    path: 'visitor-centers',
    icon: <House className='size-8 md:size-12' />,
  },
  tours: {
    name: 'Tours',
    path: 'tours',
    icon: <Bus size={48} />,
  },
  campgrounds: {
    name: 'Campgrounds',
    path: 'camping',
    icon: <FlameKindling size={48} />,
  },
  events: {
    name: 'Events',
    path: 'events',
    icon: <CalendarCheck2 size={48} />,
  },
  thingstodo: {
    name: 'Things to do',
    path: 'things-to-do',
    icon: <List size={48} />,
  },
  parkinglots: {
    name: 'Parking',
    path: 'parking',
    icon: <Car size={48} />,
  },
};
