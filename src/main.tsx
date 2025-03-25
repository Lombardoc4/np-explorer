import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import Layout from './pages/Layout';
import { LandingPage } from './pages/Landing';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import { parkRoutes } from './routes/park';
import { stateRoutes } from './routes/state';
import { Providers } from './providers';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<LandingPage />} />
            {parkRoutes}
            {stateRoutes}
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  </React.StrictMode>,
);
