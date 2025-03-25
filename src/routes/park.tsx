import { Route } from 'react-router';

import { ParkProvider } from '../utils/hooks/ParkContext';
import { ParkPage } from '../pages/Park/Page';
import { RandomPark } from '../pages/Park/Random';
import { Activities } from '@/pages/Activities';
import { Tour } from '@/pages/Tour';
import { ThingToDo } from '@/pages/ThingToDo';
import { VisitorCenterPage } from '@/pages/VisitorCenter';
import { Places } from '@/pages/Places';
import { Campground } from '@/pages/Campground';

export const parkRoutes = (
  <>
    {/* <Route path='park' element={<RandomPark />} /> */}
    <Route path=':parkId/'>
      <Route
        index
        element={
          <ParkProvider>
            <ParkPage />
          </ParkProvider>
        }
      />

      {/* Activities */}
      <Route path='activities' element={<Activities />} />
      {/* Tour */}
      <Route path='activities/:activityId/tour' element={<Tour />} />
      {/* Thing to do */}
      <Route path='activities/:activityId/thingtodo' element={<ThingToDo />} />
      {/* Event */}
      {/* <Route path='activities/:activityId/event' element={<ThingToDo />} /> */}

      {/* Places */}
      <Route path='places' element={<Places />} />
      {/* Visitor Center */}
      <Route
        path='places/:placeId/visitorcenter'
        element={<VisitorCenterPage />}
      />
      {/* Camping */}
      <Route path='places/:placeId/camping' element={<Campground />} />
      {/* Parking */}
      <Route path='places/:placeId/parking' element={<Places />} />
      {/* Other */}
      <Route path='places/:placeId/other' element={<Places />} />
    </Route>
  </>
);
