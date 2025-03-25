import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import Layout from './pages/Layout';
import { LandingPage } from './pages/Landing';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import { QueryProvider } from './utils/queryProvider';
import React from 'react';
import { ThemeProvider } from './utils/themeProvider';
import { Activities } from './pages/Activities';
import { Campground } from './pages/Campground';
import { ParkPage } from './pages/Park/Page';
import { Places } from './pages/Places';
import { ThingToDo } from './pages/ThingToDo';
import { Tour } from './pages/Tour';
import { VisitorCenterPage } from './pages/VisitorCenter';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeProvider storageKey='np-explorer-theme'>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path=':parkId/'>
                <Route index element={<ParkPage />} />

                {/* Activities */}
                <Route path='activities' element={<Activities />} />
                {/* Tour */}
                <Route path='activities/:activityId/tour' element={<Tour />} />
                {/* Thing to do */}
                <Route
                  path='activities/:activityId/thingtodo'
                  element={<ThingToDo />}
                />
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
                <Route
                  path='places/:placeId/camping'
                  element={<Campground />}
                />
                {/* Parking */}
                <Route path='places/:placeId/parking' element={<Places />} />
                {/* Other */}
                <Route path='places/:placeId/other' element={<Places />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryProvider>
  </React.StrictMode>,
);
