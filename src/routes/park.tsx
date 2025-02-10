import { Route } from "react-router";

import Camping from "../pages/Camping";
import Events from "../pages/Events";
import { ParkLayout } from "../pages/Park/Layout";
import { ParkPage } from "../pages/Park/Page";
import Parking from "../pages/Parking";
import ThingsToDo from "../pages/ThingsToDo";
import Tours from "../pages/Tours";
import VisitorCenters from "../pages/VisitorCenters";

import { ParkProvider } from "../utils/hooks/ParkContext";


export const parkRoutes = (
     <Route path="park/:parkId/" element={<ParkProvider><ParkLayout/></ParkProvider>}  >
        <Route index element={<ParkPage/>}/>
        <Route path="things-to-do" element={<ThingsToDo/>}/>
        <Route path="camping" element={<Camping/>}/>
        <Route path="events" element={<Events/>}/>
        <Route path="tours" element={<Tours/>}/>
        <Route path="visitor-centers" element={<VisitorCenters/>}/>
        <Route path="parking" element={<Parking/>}/>
     </Route>
)