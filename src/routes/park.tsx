import { Outlet, Route, useLocation } from 'react-router';

import Events from '../pages/Events';
import { ParkLayout } from '../pages/Park/Layout';
import { ParkPage } from '../pages/Park/Page';
import Parking from '../pages/Parking';
import ThingsToDo from '../pages/ThingsToDo';
import Tours from '../pages/Tours';

import { ParkProvider } from '../utils/hooks/ParkContext';
import { RandomPark } from '../pages/Park/Random';
import { AllParkVCs, VisitorCenterPage } from '../pages/VisitorCenters';
import { AllParkCamping, Campground } from '../pages/Camping';

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
      {/* <Route path='things-to-do' element={<ThingsToDo />}>
      <Route path='things-to-do/:id' element={<ThingsToDo />} />
      </Route> */}
      {/* <Route path='camping' element={<Camping />} /> */}
      {/* <Route path='events' element={<Events />} /> */}
      {/* <Route path='tours' element={<Tours />} /> */}

      {/* <Route path='parking' element={<Parking />} /> */}
    </Route>
  </>
);
