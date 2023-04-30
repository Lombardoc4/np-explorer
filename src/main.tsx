import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Layout'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from './pages/Error';
import { StatePage } from './pages/State';
import { ParkPage } from './pages/Park';
import { ParkProvider } from './hooks/ParkContext'
import { LandingPage } from './pages/Landing';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App navSearchBar={false} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <LandingPage/>
      }
    ],
  },
  { 
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/state/:stateId",
        element: <StatePage/>
      },
      {
        path: "/park/:parkId",
        element: <ParkPage/>,
      },
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ParkProvider>
      <RouterProvider 
        router={router}
        fallbackElement={<div>Loading...</div>} />
    </ParkProvider>
  </React.StrictMode>,
)
