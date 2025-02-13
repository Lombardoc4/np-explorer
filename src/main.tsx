import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import Layout from './Layout';
import { LandingPage } from './pages/Landing';
import './index.css';
import { parkRoutes } from './routes/park';
import { stateRoutes } from './routes/state';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Don't mark queries as stale immediately
      retry: false, // Disable retries by default, handle them manually if necessary
    },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
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
  </Providers>,
  // </React.StrictMode>,
);
