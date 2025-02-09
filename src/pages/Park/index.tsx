import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router";

import { ImgGrid } from "../../components/ImgGrid";

import ParkContext from "../../utils/hooks/ParkContext";
import { ParkHeader } from "./Header";
import { LoaderCircle } from "lucide-react";
import ErrorPage from "../Error";

export const ParkPage = () => {
    const { status, error, data: park} = useContext(ParkContext);

    const location = useLocation();

    if (status === 'pending') {
        return <div className="min-h-svh flex items-center justify-center">
            <LoaderCircle className="animate-spin" size={64} />
        </div>
    }

    // const states = stateMap.filter((s) => park.states.includes(s.id.toUpperCase()));
    // const otherParks = allParks.filter((p: IPark) =>
    //     states.some((s) => p.states.includes(s.id.toUpperCase()))
    // );
    if (error) return <ErrorPage error={error} />;

    if (!park) return <ErrorPage error={'No Park'} />;

    return (
        <>
            <header className='mt-20 mx-auto container'>
                {park.images.length > 0 && <ImgGrid images={park.images} />}
                <ParkHeader park={park} />
            </header>

            <main>
                {location.pathname.split("/").length >= 4 && (
                    <div className='container'>
                        <div style={{ marginBlock: "1em" }}>
                            <Link className='btn' to={`/park/${park.parkCode}`}>
                                Back to {park.name}
                            </Link>
                        </div>
                    </div>
                )}
                <Outlet />

                {/* <div className='container'> */}
                {/* <ParkCards title={"Explore Other Parks"} parks={otherParks}  states={states}/> */}
                {/* </div> */}
            </main>
        </>
    );
};
