import { Route } from 'react-router';

import Events from '../pages/Events';
import { ParkLayout } from '../pages/Park/Layout';
import Parking from '../pages/Parking';

import { ParkProvider } from '../utils/hooks/ParkContext';
import { ParkPage } from '../pages/Park/Page';
import { RandomPark } from '../pages/Park/Random';
import { AllParkVCs, VisitorCenterPage } from '../pages/VisitorCenters';
import { AllParkCamping, Campground } from '../pages/Camping';
import { Tour, AllTours } from '../pages/Tours';
import { AllThingsToDo, ThingToDo } from '../pages/ThingsToDo';

export const parkRoutes = (
  <>
    <Route path='park' element={<RandomPark />} />
    <Route path='park/:parkId/'>
      <Route
        index
        element={
          <ParkProvider>
            <ParkPage />
          </ParkProvider>
        }
      />
      <Route path='visitor-centers' element={<AllParkVCs />} />
      <Route
        path='visitor-centers/:activityId'
        element={<VisitorCenterPage />}
      />
      <Route path='camping' element={<AllParkCamping />} />
      <Route path='camping/:activityId' element={<Campground />} />
      <Route path='things-to-do' element={<AllThingsToDo />} />
      <Route path='things-to-do/:activityId' element={<ThingToDo />} />
      {/* <Route path='events' element={<Events />} /> */}
      {/* <Route path='tours' element={<AllTours />} />
      <Route path='tours/:activityId' element={<Tour />} /> */}

      {/* <Route path='parking' element={<Parking />} /> */}
    </Route>
  </>
);
