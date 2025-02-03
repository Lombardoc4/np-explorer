import { Route } from "react-router";
// import { Params } from "react-router";

import Camping from "../pages/Camping";
import Events from "../pages/Events";
import { ParkPage } from "../pages/Park";
import { Park } from "../pages/Park/Main";
import Parking from "../pages/Parking";
import ThingsToDo from "../pages/ThingsToDo";
import Tours from "../pages/Tours";
import VisitorCenters from "../pages/VisitorCenters";

// import { fetcher } from "../utils/helper";
import { ParkProvider } from "../utils/hooks/ParkContext";

export const parkRoutes = (
    <>
     <Route path="park/:parkId/" element={<ParkProvider><ParkPage/></ParkProvider>}  >
        <Route index element={<Park/>}/>
        <Route path="things-to-do" element={<ThingsToDo/>}/>
        <Route path="camping" element={<Camping/>}/>
        <Route path="events" element={<Events/>}/>
        <Route path="tours" element={<Tours/>}/>
        <Route path="visitor-centers" element={<VisitorCenters/>}/>
        <Route path="parking" element={<Parking/>}/>
     </Route>
    </>
)
// export const parkRoutes = [
//     {
//         path: "park/:parkId/",
//         element: (
//             <ParkProvider>
//                 <ParkPage />
//             </ParkProvider>
//         ),
//         children: [
//             {
//                 path: "",
//                 element: <Park />,
//                 loader: async ({ params }: { params: Params }) => {
//                     const thingtodo = await fetcher(`thingstodo?parkCode=${params.parkId}`);
//                     const campgrounds = await fetcher(`campgrounds?parkCode=${params.parkId}`);
//                     const events = await fetcher(`events?parkCode=${params.parkId}`);
//                     const tours = await fetcher(`tours?parkCode=${params.parkId}`);
//                     const visitorCenters = await fetcher(`visitorcenters?parkCode=${params.parkId}`);
//                     const parkingLots = await fetcher(`parkinglots?parkCode=${params.parkId}`);

//                     return {
//                         thingsToDo: thingtodo,
//                         campgrounds,
//                         events,
//                         tours,
//                         visitorCenters,
//                         parkingLots,
//                     };
//                 },
//             },
//             {
//                 path: "things-to-do",
//                 loader: async ({ params }: { params: Params }) => {
//                     const thingtodo = await fetcher(`thingstodo?parkCode=${params.parkId}`);
//                     return {
//                         thingsToDo: thingtodo,
//                     };
//                 },
//                 element: <ThingsToDo />,
//             },
//             {
//                 path: "camping",
//                 loader: async ({ params }: { params: Params }) => {
//                     const campgrounds = await fetcher(`campgrounds?parkCode=${params.parkId}`);

//                     return {
//                         campgrounds,
//                     };
//                 },
//                 element: <Camping />,
//             },
//             {
//                 path: "events",
//                 loader: async ({ params }: { params: Params }) => {
//                     const events = await fetcher(`events?parkCode=${params.parkId}`);

//                     return {
//                         events,
//                     };
//                 },
//                 element: <Events />,
//             },
//             {
//                 path: "tours",
//                 loader: async ({ params }: { params: Params }) => {
//                     const tours = await fetcher(`tours?parkCode=${params.parkId}`);

//                     return {
//                         tours,
//                     };
//                 },
//                 element: <Tours />,
//             },
//             {
//                 path: "visitor-centers",
//                 loader: async ({ params }: { params: Params }) => {
//                     const visitorCenters = await fetcher(`visitorcenters?parkCode=${params.parkId}`);

//                     return {
//                         visitorCenters,
//                     };
//                 },
//                 element: <VisitorCenters />,
//             },
//             {
//                 path: "parking",
//                 loader: async ({ params }: { params: Params }) => {
//                     const parkingLots = await fetcher(`parkinglots?parkCode=${params.parkId}`);

//                     return {
//                         parkingLots,
//                     };
//                 },
//                 element: <Parking />,
//             },
//         ],
//     },
// ];
