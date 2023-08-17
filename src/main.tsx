import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Params,
  RouterProvider,
} from "react-router-dom";

import App from './Layout'
import ErrorPage from './pages/Error';
import { StatePage } from './pages/State';
import { LandingPage } from './pages/Landing';
import { ParkPage } from './pages/Park';

import ThingsToDo from './pages/ParkContent/ThingsToDo';
import Camping from './pages/ParkContent/Camping';
import Events from './pages/ParkContent/Events';
import Tours from './pages/ParkContent/Tours';
import VisitorCenters from './pages/ParkContent/VisitorCenters';
import Parking from './pages/ParkContent/Parking';
import Park from './pages/ParkContent/Park';
import { fetcher } from './utils/fetch';
import { ParkProvider } from './utils/hooks/ParkContext'

// import "./index.css";

const parkRoutes = [
  {
    path: "park/:parkId/",
    element: <ParkPage/>,
    children: [
      {
        path: '',
        element: <Park/>,
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
