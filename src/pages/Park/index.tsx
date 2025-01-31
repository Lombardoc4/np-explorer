import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router";

import { ImgGrid } from "../../components/ImgGrid";

import ParkContext, { IPark } from "../../utils/hooks/ParkContext";
import { stateMap } from "../../utils/lib/stateMap";
import { ParkHeader } from "./Header";
import { ParkCards } from "./components";
import SearchContext from "../../utils/hooks/SearchContext";

export const ParkPage = () => {
    const park = useContext(ParkContext);
    const location = useLocation();

    const allParks = useContext(SearchContext);
    const states = stateMap.filter((s) => park.states.includes(s.id.toUpperCase()));
    const otherParks = allParks.filter((p: IPark) =>
        states.some((s) => p.states.includes(s.id.toUpperCase()))
    );


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
                <div className='container'>
                    {location.pathname.split("/").length >= 4 && (
                        <div style={{ marginBlock: "1em" }}>
                            <Link className='btn' to={`/park/${park.parkCode}`}>
                                Back to {park.name}
                            </Link>
                        </div>
                    )}
                </div>
                <Outlet />

                {/* <div className='container'> */}
                    <ParkCards title={"Explore Other Parks"} parks={otherParks}  states={states}/>
                {/* </div> */}
            </main>
        </>
    );
};
