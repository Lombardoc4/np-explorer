import { useContext, useMemo } from "react";
import { useParams, Outlet, Link, useLocation } from "react-router-dom";

import { ImgGrid } from "../../components/ImgGrid";

import ParkContext, { IPark } from "../../utils/hooks/ParkContext";
import { stateMap } from "../../utils/lib/stateMap";
import { ParkHeader } from "./Header";
import { Sidebar } from "./Sidebar";
import SearchContext, { ISearch } from "../../utils/hooks/SearchContext";
import { OtherParks } from "./components";

export const ParkPage = () => {
    const park = useContext(ParkContext);
    const location = useLocation();

    if (!park) {
        // Go to error page
        return <>No Park</>;
    }

    return (
        <>
            <header className='container'>
                <ParkHeader park={park} />
                {park.images.length > 0 && <ImgGrid images={park.images} />}
            </header>

            <main>
                <div className="container">
                    <Outlet />
                </div>

                <OtherParks title={"Explore Other Parks"} park={park} />
            </main>
        </>
    );
};
