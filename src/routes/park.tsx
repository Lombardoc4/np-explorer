import { Route } from 'react-router';

import Camping from '../pages/Camping';
import Events from '../pages/Events';
import { ParkLayout } from '../pages/Park/Layout';
import { ParkPage } from '../pages/Park/Page';
import Parking from '../pages/Parking';
import ThingsToDo from '../pages/ThingsToDo';
import Tours from '../pages/Tours';
import ParkVisitorCenters from '../pages/VisitorCenters';

import { ParkProvider } from '../utils/hooks/ParkContext';
import { RandomPark } from '../pages/Park/Random';
import VisitorCenterPage from '../pages/VisitorCenters/page';

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
      {/* <Route path='things-to-do' element={<ThingsToDo />}>
      <Route path='things-to-do/:id' element={<ThingsToDo />} />
      </Route> */}
      <Route path='camping' element={<Camping />} />
      {/* <Route path='events' element={<Events />} /> */}
      {/* <Route path='tours' element={<Tours />} /> */}
      <Route path='visitor-centers' element={<ParkVisitorCenters />} />
      <Route
        path='visitor-centers/:activityId'
        element={<VisitorCenterPage />}
      />
      {/* <Route path='parking' element={<Parking />} /> */}
    </Route>
  </>
);
