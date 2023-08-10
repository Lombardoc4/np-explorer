import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  ParamParseKey,
  Params,
  RouterProvider,
} from "react-router-dom";

import App from './Layout'
import ErrorPage from './pages/Error';
import { StatePage } from './pages/State';
import ParkPage from './pages/Park';
import { LandingPage } from './pages/Landing';

import { ParkProvider } from './utils/hooks/ParkContext'
import ThingsToDo from './pages/ThingsToDo';
import Camping from './pages/Camping';
import Events from './pages/Events';
import Tours from './pages/Tours';
import VisitorCenters from './pages/VisitorCenters';
import Parking from './pages/Parking';
import { fetcher } from './utils/fetch';
import ParkLayout from './pages/ParkLayout';

// import "./index.css";

const parkRoutes = [
  {
    path: "park/:parkId/",
    element: <ParkLayout/>,
    children: [
      {
        path: '',
        element: <ParkPage/>,
        loader: async ({ params }: { params : Params}) => {
          const thingtodo = await fetcher(`thingstodo?parkCode=${params.parkId}`);
          const campgrounds = await fetcher(`campgrounds?parkCode=${params.parkId}`);
          const events = await fetcher(`events?parkCode=${params.parkId}`);
          const tours= await fetcher(`tours?parkCode=${params.parkId}`);
          const visitorCenters = await fetcher(`visitorcenters?parkCode=${params.parkId}`);
          const parkingLots = await fetcher(`parkinglots?parkCode=${params.parkId}`);

          return {
            thingsToDo: thingtodo,
            campgrounds,
            events,
            tours,
            visitorCenters,
            parkingLots
          }
        }
      },
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
    element: <App/>,
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
