import { useContext } from "react";
import { Outlet } from "react-router";

import { ImgGrid } from "../../components/ImgGrid";

import ParkContext from "../../utils/hooks/ParkContext";
import { LoaderCircle } from "lucide-react";
import ErrorPage from "../Error";
import { Link } from "react-router";

// import { TriangleAlert, UserRound, Wallet } from "lucide-react";
import { ShareModal } from "../../components/Modal/ShareModal";
import { TriangleAlert, Wallet } from "lucide-react";
import { Button } from "../../components/Button";

export const ParkLayout = () => {
    // const location = useLocation();
    const { status, error, data: park } = useContext(ParkContext);

    if (status === "pending") {
        return (
            <div className='min-h-svh flex items-center justify-center'>
                <LoaderCircle className='animate-spin' size={64} />
            </div>
        );
    }

    // const states = stateMap.filter((s) => park.states.includes(s.id.toUpperCase()));
    // const otherParks = allParks.filter((p: IPark) =>
    //     states.some((s) => p.states.includes(s.id.toUpperCase()))
    // );

    if (error) return <ErrorPage error={error} />;

    // TODO: Return explore a random park!
    if (!park) return <ErrorPage error={"No Park"} />;

    return (
        <>
            <header className='mt-20 mx-auto container px-4 xl:px-0'>
                {park.images.length > 0 && <ImgGrid images={park.images} />}
                <ParkHeader park={park} />
            </header>

            <main>
                {/* Back Button */}
                {/* {location.pathname.split("/").length >= 4 && (
                    <div className='container'>
                        <div style={{ marginBlock: "1em" }}>
                            <Link className='btn' to={`/park/${park.parkCode}`}>
                                Back to {park.name}
                            </Link>
                        </div>
                    </div>
                )} */}
                <Outlet />

                {/* <div className='container'> */}
                {/* <ParkCards title={"Explore Other Parks"} parks={otherParks}  states={states}/> */}
                {/* </div> */}
            </main>
        </>
    );
};

const ParkHeader = ({ park }: { park: IPark }) => {
    const [modal, btn] = ShareModal(park);
    return (
        <>
            {modal}
            <div className='container mx-auto max-w-5xl flex flex-col md:flex-row justify-between md:items-center my-4'>
                <div className='md:order-2 flex gap-4 md:items-end text-center'>
                    <a href='#alerts'>
                        <Button>
                            <TriangleAlert /> Alerts
                        </Button>
                    </a>
                    <a href='#entrance-fees'>
                        <Button>
                            <Wallet />
                            Fees
                        </Button>
                    </a>
                    {btn}
                </div>
                <div>
                    <h1 className='text-6xl md:text-6xl font-thin'>{park.fullName}</h1>
                    <div className='text-xl flex flex-col md:flex-row gap-1'>
                        <span style={{ display: "flex", gap: "0.25em" }}>{StateLinks(park.states)}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

const StateLinks = (states: IPark["states"]) =>
    states.split(",").map((state) => (
        <Link key={state} to={"/" + state.toLowerCase()}>
            {state}
        </Link>
    ));
