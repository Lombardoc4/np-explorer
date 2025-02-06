import { Link } from "react-router";

// import { TriangleAlert, UserRound, Wallet } from "lucide-react";
  import { ShareModal } from "../../components/Modal/ShareModal";

// import { parkVistors } from "../../utils/lib/parkVisitors";
// import { IPark } from "../../utils/hooks/ParkContext";
// import { Button } from "../../components/Button";

const StateLinks = (states: IPark["states"]) =>
    states.split(",").map((state) => (
        <Link key={state} to={"/" + state.toLowerCase()}>
            {state}
        </Link>
    ));

export const ParkHeader = ({ park }: { park: IPark }) => {
    const [modal, btn] = ShareModal(park);
    return (
        <>
            {modal}
            <div className='container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center my-4'>
                <div>
                    <h1 className='text-5xl font-thin'>{park.fullName}</h1>
                    <div className='text-xl flex flex-col md:flex-row gap-1'>
                        <span style={{ display: "flex", gap: "0.25em" }}>{StateLinks(park.states)}</span>
                    </div>
                </div>

                <div className='flex gap-4 md:items-end text-center'>
                    {/* <a href='#alerts'>
                        <Button>
                            <TriangleAlert /> Alerts
                        </Button>
                    </a>
                    <a href='#contact'>
                        <Button>
                            <UserRound /> Contact
                        </Button>
                    </a>
                    <a href='#fees'>
                        <Button>
                            <Wallet />
                            Fees
                        </Button>
                    </a> */}
                    {btn}
                </div>
            </div>
        </>
    );
};
