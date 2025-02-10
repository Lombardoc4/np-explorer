import { useContext } from "react";
import { Outlet, Link, useLocation, useParams } from "react-router";

import { ImgGrid } from "../../components/ImgGrid";

import { IPark } from "../../utils/hooks/ParkContext";
import { stateMap } from "../../utils/lib/stateMap";
// import SearchContext from "../../utils/hooks/SearchContext";
import { ParkCards } from "../Park/components/Card";
import ErrorPage from "../Error";

export const StatePage = () => {
    const { stateId } = useParams();
    const location = useLocation();
    const states = stateMap.filter((state) => state.id === stateId);

    const stateParks = [];

    if (stateParks.length <= 0) {
        return <ErrorPage error={'No Park'}/>
    }

    return (
        <>
            <header className='container' style={{ marginBlock: "2rem" }}>
                <h1>{states[0].name} - Home to {stateParks.length} National Parks</h1>
            </header>

            <main>
                    {location.pathname.split("/").length >= 3 && (
                <div className='container'>
                        <div style={{ marginBottom: "1em" }}>
                            <Link className='btn' to={`/${states[0].id}`}>
                                Back to {states[0].name} Main
                            </Link>
                        </div>
                </div>
                    )}

                <Outlet />

                {/* <div className="container"> */}
                    <ParkCards parks={stateParks} states={states} />
                {/* </div> */}
            </main>
        </>
    );
};
