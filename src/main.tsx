import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Params, Route, RouterProvider } from "react-router-dom";

import App from "./Layout";
import ErrorPage from "./pages/Error";
import { LandingPage } from "./pages/Landing";
import { ParkPage } from "./pages/Park";

import ThingsToDo from "./pages/ThingsToDo";
import Camping from "./pages/Camping";
import Events from "./pages/Events";
import Tours from "./pages/Tours";
import VisitorCenters from "./pages/VisitorCenters";
import Parking from "./pages/Parking";
import { Park } from "./pages/Park/Main";
import { fetcher } from "./utils/helper";
import { ParkProvider } from "./utils/hooks/ParkContext";

import "./styles/weather-icons-wind.min.css";
import "./styles/weather-icons.min.css";
import { StatePage } from "./pages/State";
import { State } from "./pages/State/Main";



const stateRoutes = [
    {
        path: ":stateId/",
        element: <StatePage />,
        children: [
            {
                path: '',
                loader: async ({ params }: { params: Params }) => {
                    const thingtodo = await fetcher(`thingstodo?stateCode=${params.stateId}`);
                    const campgrounds = await fetcher(`campgrounds?stateCode=${params.stateId}`);
                    const events = await fetcher(`events?stateCode=${params.stateId}`);
                    const tours = await fetcher(`tours?stateCode=${params.stateId}`);
                    const visitorCenters = await fetcher(`visitorcenters?stateCode=${params.stateId}`);
                    const parkingLots = await fetcher(`parkinglots?stateCode=${params.stateId}`);

                    return {
                        thingsToDo: thingtodo,
                        campgrounds,
                        events,
                        tours,
                        visitorCenters,
                        parkingLots,
                    };
                },
                element: <State />,
            },
            {
                path: "things-to-do",
                loader: async ({ params }: { params: Params }) => {
                    const thingtodo = await fetcher(`thingstodo?stateCode=${params.stateId}`);
                    return {
                        thingsToDo: thingtodo,
                    };
                },
                element: <ThingsToDo />,
            },
            {
                path: "camping",
                loader: async ({ params }: { params: Params }) => {
                    const campgrounds = await fetcher(`campgrounds?stateCode=${params.stateId}`);

                    return {
                        campgrounds,
                    };
                },
                element: <Camping />,
            },
            {
                path: "events",
                loader: async ({ params }: { params: Params }) => {
                    const events = await fetcher(`events?stateCode=${params.stateId}`);

                    return {
                        events,
                    };
                },
                element: <Events />,
            },
            {
                path: "tours",
                loader: async ({ params }: { params: Params }) => {
                    const tours = await fetcher(`tours?stateCode=${params.stateId}`);

                    return {
                        tours,
                    };
                },
                element: <Tours />,
            },
            {
                path: "visitor-centers",
                loader: async ({ params }: { params: Params }) => {
                    const visitorCenters = await fetcher(`visitorcenters?stateCode=${params.stateId}`);

                    return {
                        visitorCenters,
                    };
                },
                element: <VisitorCenters />,
            },
            {
                path: "parking",
                loader: async ({ params }: { params: Params }) => {
                    const parkingLots = await fetcher(`parkinglots?stateCode=${params.stateId}`);

                    return {
                        parkingLots,
                    };
                },
                element: <Parking />,
            },
        ],
    },
];

const parkRoutes = [
    {
        path: "park/:parkId/",
        element: (
            <ParkProvider>
                <ParkPage />
            </ParkProvider>
        ),
        children: [
            {
                path: "",
                element: <Park />,
                loader: async ({ params }: { params: Params }) => {
                    const thingtodo = await fetcher(`thingstodo?parkCode=${params.parkId}`);
                    const campgrounds = await fetcher(`campgrounds?parkCode=${params.parkId}`);
                    const events = await fetcher(`events?parkCode=${params.parkId}`);
                    const tours = await fetcher(`tours?parkCode=${params.parkId}`);
                    const visitorCenters = await fetcher(`visitorcenters?parkCode=${params.parkId}`);
                    const parkingLots = await fetcher(`parkinglots?parkCode=${params.parkId}`);

                    return {
                        thingsToDo: thingtodo,
                        campgrounds,
                        events,
                        tours,
                        visitorCenters,
                        parkingLots,
                    };
                },
            },
            {
                path: "things-to-do",
                loader: async ({ params }: { params: Params }) => {
                    const thingtodo = await fetcher(`thingstodo?parkCode=${params.parkId}`);
                    return {
                        thingsToDo: thingtodo,
                    };
                },
                element: <ThingsToDo />,
            },
            {
                path: "camping",
                loader: async ({ params }: { params: Params }) => {
                    const campgrounds = await fetcher(`campgrounds?parkCode=${params.parkId}`);

                    return {
                        campgrounds,
                    };
                },
                element: <Camping />,
            },
            {
                path: "events",
                loader: async ({ params }: { params: Params }) => {
                    const events = await fetcher(`events?parkCode=${params.parkId}`);

                    return {
                        events,
                    };
                },
                element: <Events />,
            },
            {
                path: "tours",
                loader: async ({ params }: { params: Params }) => {
                    const tours = await fetcher(`tours?parkCode=${params.parkId}`);

                    return {
                        tours,
                    };
                },
                element: <Tours />,
            },
            {
                path: "visitor-centers",
                loader: async ({ params }: { params: Params }) => {
                    const visitorCenters = await fetcher(`visitorcenters?parkCode=${params.parkId}`);

                    return {
                        visitorCenters,
                    };
                },
                element: <VisitorCenters />,
            },
            {
                path: "parking",
                loader: async ({ params }: { params: Params }) => {
                    const parkingLots = await fetcher(`parkinglots?parkCode=${params.parkId}`);

                    return {
                        parkingLots,
                    };
                },
                element: <Parking />,
            },
        ],
    },
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
        element: <App />,
        errorElement: (
            <App>
                <ErrorPage />
            </App>
        ),
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <LandingPage />,
                    },
                    ...parkRoutes,
                    ...stateRoutes
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} fallbackElement={<div>Loading.......</div>} />
    </React.StrictMode>
);
