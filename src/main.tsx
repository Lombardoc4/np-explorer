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
import ThingsToDo from './pages/ThingsToDo';
import Camping from './pages/Camping';
import Events from './pages/Events';
import Tours from './pages/Tours';
import VisitorCenters from './pages/VisitorCenters';
import Parking from './pages/Parking';

// import "./index.css";

const parkRoutes = [
  {
    path: "park/:parkId",
    element: <ParkPage/>,
    children : [
      {
        path: "things-to-do",
        element: <ThingsToDo/>
      },
      {
        path: "campgrounds",
        element: <Camping/>
      },
      {
        path: "events",
        element: <Events/>
      },
      {
        path: "tours",
        element: <Tours/>
      },
      {
        path: "visitor-centers",
        element: <VisitorCenters/>
      },
      {
        path: "parking-lots",
        element: <Parking/>
      },
    ]
  }
  
];
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
            path: "state/:stateId",
            element: <StatePage/>
          },
          ...parkRoutes
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
