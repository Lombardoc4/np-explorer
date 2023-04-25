import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from './pages/error-page';
import { StatePage } from './pages/StatePage';
import { ParkPage } from './pages/ParkPage';
import { ParkProvider } from './hooks/ParkContext'
import ScrollToTop from './components/ScrollToTop';


const router = createBrowserRouter([
  {
    path: "/",
    element: <><ScrollToTop/><App /></>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "state/:stateId",
        element: <StatePage/>
      },
      {
        path: "park/:parkId",
        element: <ParkPage/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ParkProvider>
      <RouterProvider router={router} />
    </ParkProvider>
  </React.StrictMode>,
)
