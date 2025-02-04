import { Link, Outlet, useLoaderData, useParams } from "react-router";
import { useContext } from "react";
// import SearchContext from "../../utils/hooks/SearchContext";
import { IPark } from "../../utils/hooks/ParkContext";
import { stateMap } from "../../utils/lib/stateMap";
import { ParkCards } from "../Park/components";

export interface LoaderProps {
    thingsToDo: any[];
    campgrounds: any[];
    events: any[];
    tours: any[];
    visitorCenters: any[];
    parkingLots: any[];
}

export const State = () => {
    const { events, thingsToDo, campgrounds, tours, visitorCenters, parkingLots } = useLoaderData() as LoaderProps;

    console.log("events", events);
    console.log("ttd", thingsToDo);
    console.log("camp", campgrounds);
    console.log("tour", tours);
    console.log("vc", visitorCenters);
    console.log("parking", parkingLots);
    return (
        <>
            <div
                className="container"
                style={{
                    display: "flex",
                    flexWrap: 'wrap',
                    gap: "0.5rem",
                    fontSize: '1.2rem'
                }}
            >
                {events && (
                    <>
                        <Link to={"./events"}>
                            <b>{events.length}</b> Upcoming Events
                        </Link>
                        <span>~</span>
                    </>
                )}
                {visitorCenters && (
                    <>
                        <Link to={"./visitor"}>
                            <b>{visitorCenters.length}</b> Visitor Centers
                        </Link>
                        <span>~</span>
                    </>
                )}
                {campgrounds && (
                    <>
                        <Link to={"./events"}>
                            <b>{campgrounds.length}</b> Campgrounds
                        </Link>
                        <span>~</span>
                    </>
                )}
                {thingsToDo && (
                    <>
                        <Link to={"./events"}>
                            <b>{thingsToDo.length}</b> Things to do
                        </Link>
                        <span>~</span>
                    </>
                )}
                {tours && (
                    <>
                        <Link to={"./events"}>
                            <b>{tours.length}</b> Tours
                        </Link>
                        <span>~</span>
                    </>
                )}
                {parkingLots && (
                    <Link to={"./parking"}>
                        <b>{parkingLots.length}</b> Parking Facilities
                    </Link>
                )}
            </div>
        </>
    );
};
