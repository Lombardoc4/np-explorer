import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import Layout from './pages/Layout';
import { LandingPage } from './pages/Landing';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import { parkRoutes } from './routes/park';
import { stateRoutes } from './routes/state';
import { QueryProvider } from './lib/queryProvider';
import React from 'react';
import { ThemeProvider } from './lib/themeProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeProvider storageKey='np-explorer-theme'>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<LandingPage />} />
              {parkRoutes}
              {stateRoutes}
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryProvider>
  </React.StrictMode>,
);
