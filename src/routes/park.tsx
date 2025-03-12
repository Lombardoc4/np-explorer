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

      {/* Activities */}
      <Route path='activities' element={<ThingToDo />} />
      {/* Things to do */}
      <Route path='activities/things-to-do' element={<AllThingsToDo />} />
      <Route
        path='activities/things-to-do/:activityId'
        element={<ThingToDo />}
      />
      {/* Tours */}
      <Route path='activities/tours' element={<AllTours />} />
      <Route path='activities/tours/:activityId' element={<Tour />} />

      {/* <Route path='activities/events' element={<Events />} /> */}
      {/* <Route path='activites/events/:activityId' element={<Events />} /> */}

      {/* Places */}
      <Route path='places' element={<AllParkVCs />} />
      {/* Visitor Centers */}
      <Route path='places/visitor-centers' element={<AllParkVCs />} />
      <Route
        path='places/visitor-centers/:activityId'
        element={<VisitorCenterPage />}
      />
      {/* Camping */}
      <Route path='places/camping' element={<AllParkCamping />} />
      <Route path='places/camping/:activityId' element={<Campground />} />

      {/* Parking */}
      {/* <Route path='places/parking' element={<Parking />} /> */}
      {/* <Route path='places/parking/:activityId' element={<Parking />} /> */}
    </Route>
  </>
);
