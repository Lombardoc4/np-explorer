import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import { ImgGrid } from "../../components/ImgGrid";

import ParkContext, { IPark } from "../../utils/hooks/ParkContext";
import { stateMap } from "../../utils/lib/stateMap";
import { ParkHeader } from "./Header";
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
                <div className='container'>
                    {location.pathname.split("/").length >= 4 && (
                        <div style={{ marginBottom: "1em" }}>
                            <Link className='btn' to={`/park/${park.parkCode}`}>
                                Back to {park.name}
                            </Link>
                        </div>
                    )}
                </div>
                <Outlet />

                <div className='container'>
                    <OtherParks title={"Explore Other Parks"} parks={[park]} />
                </div>
            </main>
        </>
    );
};
