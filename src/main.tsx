import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Params,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from './Layout'
import ErrorPage from './pages/Error';
import { StatePage } from './pages/State';
import { LandingPage } from './pages/Landing';
import { ParkPage } from './pages/Park';

import ThingsToDo from './pages/Park/ThingsToDo';
import Camping from './pages/Park/Camping';
import Events from './pages/Park/Events';
import Tours from './pages/Park/Tours';
import VisitorCenters from './pages/Park/VisitorCenters';
import Parking from './pages/Park/Parking';
import { Park } from './pages/Park/Main';
import { fetcher } from './utils/helper';
import { ParkProvider } from './utils/hooks/ParkContext';


const parkRoutes = [
  {
    path: "park/:parkId/",
    element: <ParkProvider><ParkPage/></ParkProvider>,
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

// const router2 = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<SearchContext.Provider value={}/>}>
//         <Route path='/' element={<App/>} errorElement={<ErrorPage/>} >
//             <Route index element={<LandingPage/>}/>
//             <Route path="park/:id" element={<ParkPage/>}/>
//             <Route path=":stateId" element={<StatePage/>}/>
//         </Route>
//     </Route>
//   )
// )

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
          ...parkRoutes,
          {
            path: ":stateId",
            element: <StatePage/>
          },
        ],
      },
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
      fallbackElement={<div>Loading.......</div>} />
  </React.StrictMode>,
)
