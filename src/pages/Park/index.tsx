import { useContext } from "react";
import { useParams, Outlet } from "react-router-dom";

import { StateParks } from "../State";
import { ImgGrid } from "../../components/ImgGrid";

import ParkContext from "../../utils/hooks/ParkContext";
import { stateMap } from "../../utils/lib/stateMap";
import { ParkHeader } from "./Header";
import { Sidebar } from "./Sidebar";

export const ParkPage = () => {
    const parks = useContext(ParkContext);
    const { parkId } = useParams();

    const park = parks.find((park: any) => park.parkCode === parkId);

    // Get stateMap info for each state
    const states = stateMap.filter((s) => park.states.split(",").includes(s.id.toUpperCase()));
    const otherParks = parks.filter((p: any) =>
        states.some((s) => p.states.toLowerCase().includes(s.id) && park.parkCode !== p.parkCode)
    );

    return (
        <>
            <header className='container'>
                <ParkHeader park={park} />
                {park.images.length > 0 && <ImgGrid images={park.images} />}
            </header>

            <main>
                <div
                    className='container'
                    style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4em", margin: "2em auto" }}
                >
                    {/* LEFT COLUMN */}
                    <Outlet />

                    {/* RIGHT COLUMN */}
                    <Sidebar park={park} />
                </div>

                <StateParks title={"Explore Other Parks"} states={states} parks={otherParks} activePark={park} />
            </main>
        </>
    );
};
