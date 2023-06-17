import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './Layout'
import ErrorPage from './pages/Error';
import { StatePage } from './pages/State';
import { ParkPage } from './pages/Park';
import { LandingPage } from './pages/Landing';

import { ParkProvider } from './utils/hooks/ParkContext'

// import "./index.css";

const router = createBrowserRouter([
  // todo: re-renders all of layout for each object below, only need navbar re-rendered
  // note : each child rerenders the layout ?
  {
    path: "/",
    element: <App  />,
    errorElement: <App><ErrorPage /></App>,
    children: [
      {
        errorElement: <ErrorPage />,

        children: [
          {
            index: true,
            element: <LandingPage/>
          },
          {
            path: "/state/:stateId",
            element: <StatePage/>
          },
          {
            path: "/park/:parkId",
            element: <ParkPage/>,
          },
          // {
          //   path: "*",
          //   element: <ErrorPage/>,
          // }
        ],
      },
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ParkProvider>
      <RouterProvider
        router={router}
        fallbackElement={<div>Loading.......</div>} />
    </ParkProvider>
  </React.StrictMode>,
)
