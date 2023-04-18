import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from './error-page';
import { StatePage } from './StatePage';
import { ParkProvider } from './ParkContext'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "state/:stateId",
        element: <StatePage/>
      },
      {
        path: "park/:parkId",
        element: <div>Park test</div>,
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
