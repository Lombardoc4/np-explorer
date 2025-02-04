import { Route } from "react-router";

import Camping from "../pages/Camping";
import Events from "../pages/Events";
import { ParkPage } from "../pages/Park";
import { Park } from "../pages/Park/Main";
import Parking from "../pages/Parking";
import ThingsToDo from "../pages/ThingsToDo";
import Tours from "../pages/Tours";
import VisitorCenters from "../pages/VisitorCenters";

import { ParkProvider } from "../utils/hooks/ParkContext";

export const parkRoutes = (
     <Route path="park/:parkId/" element={<ParkProvider><ParkPage/></ParkProvider>}  >
        <Route index element={<Park/>}/>
        <Route path="things-to-do" element={<ThingsToDo/>}/>
        <Route path="camping" element={<Camping/>}/>
        <Route path="events" element={<Events/>}/>
        <Route path="tours" element={<Tours/>}/>
        <Route path="visitor-centers" element={<VisitorCenters/>}/>
        <Route path="parking" element={<Parking/>}/>
     </Route>
)