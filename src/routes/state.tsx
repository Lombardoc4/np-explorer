import { Params, Route } from 'react-router';
import { AllParkCamping } from '../pages/Camping';
import Events from '../pages/Events';
import Parking from '../pages/Parking';
import { StatePage } from '../pages/State';
import { State } from '../pages/State/Main';
import ThingsToDo from '../pages/ThingsToDo';
import { fetcher } from '../utils/helper';
import ErrorPage from '../pages/Error';
import { AllParkVCs } from '../pages/VisitorCenters';
import { AllTours } from '../pages/Tours';

export const stateRoutes = (
  <Route path=':stateId' element={<StatePage />}>
    <Route path='' element={<State />} />
    <Route path='things-to-do' element={<ThingsToDo />} />
    <Route path='camping' element={<AllParkCamping />} />
    <Route path='events' element={<Events />} />
    <Route path='tours' element={<AllTours />} />
    <Route path='visitor-centers' element={<AllParkVCs />} />
    <Route path='parking' element={<Parking />} />
  </Route>
);

// export const stateRoutes = [
//     {
//         path: ":stateId/",
//         element: <StatePage />,
//         children: [
//             {
//                 path: '',
//                 loader: async ({ params }: { params: Params }) => {
//                     const thingtodo = await fetcher(`thingstodo?stateCode=${params.stateId}`);
//                     const campgrounds = await fetcher(`campgrounds?stateCode=${params.stateId}`);
//                     const events = await fetcher(`events?stateCode=${params.stateId}`);
//                     const tours = await fetcher(`tours?stateCode=${params.stateId}`);
//                     const visitorCenters = await fetcher(`visitorcenters?stateCode=${params.stateId}`);
//                     const parkingLots = await fetcher(`parkinglots?stateCode=${params.stateId}`);

//                     return {
//                         thingsToDo: thingtodo,
//                         campgrounds,
//                         events,
//                         tours,
//                         visitorCenters,
//                         parkingLots,
//                     };
//                 },
//                 element: <State />,
//             },
//             {
//                 path: "things-to-do",
//                 loader: async ({ params }: { params: Params }) => {
//                     const thingtodo = await fetcher(`thingstodo?stateCode=${params.stateId}`);
//                     return {
//                         thingsToDo: thingtodo,
//                     };
//                 },
//                 element: <ThingsToDo />,
//             },
//             {
//                 path: "camping",
//                 loader: async ({ params }: { params: Params }) => {
//                     const campgrounds = await fetcher(`campgrounds?stateCode=${params.stateId}`);

//                     return {
//                         campgrounds,
//                     };
//                 },
//                 element: <Camping />,
//             },
//             {
//                 path: "events",
//                 loader: async ({ params }: { params: Params }) => {
//                     const events = await fetcher(`events?stateCode=${params.stateId}`);

//                     return {
//                         events,
//                     };
//                 },
//                 element: <Events />,
//             },
//             {
//                 path: "tours",
//                 loader: async ({ params }: { params: Params }) => {
//                     const tours = await fetcher(`tours?stateCode=${params.stateId}`);

//                     return {
//                         tours,
//                     };
//                 },
//                 element: <Tours />,
//             },
//             {
//                 path: "visitor-centers",
//                 loader: async ({ params }: { params: Params }) => {
//                     const visitorCenters = await fetcher(`visitorcenters?stateCode=${params.stateId}`);

//                     return {
//                         visitorCenters,
//                     };
//                 },
//                 element: <VisitorCenters />,
//             },
//             {
//                 path: "parking",
//                 loader: async ({ params }: { params: Params }) => {
//                     const parkingLots = await fetcher(`parkinglots?stateCode=${params.stateId}`);

//                     return {
//                         parkingLots,
//                     };
//                 },
//                 element: <Parking />,
//             },
//         ],
//     },
// ];
