import { Link } from "react-router-dom";

import { ShareModal } from "../../components/Modal/ShareModal";

import { ReactComponent as Contact } from "../../assets/icons/person.svg";
import { ReactComponent as Alert } from "../../assets/icons/alert.svg";

import { parkVistors } from "../../utils/lib/parkVisitors";
import { IPark } from "../../utils/hooks/ParkContext";
import { styled } from "styled-components";

const getVisitorCount = (parkId: string) => {
    const visitors = parkVistors.filter((park) => park.parkCode === parkId?.toUpperCase());
    return visitors.length >= 1 ? visitors[0].visitors : 0;
};

const StateLinks = (states: IPark["states"]) =>
    states.map((state) => (
        <Link key={state} to={"/" + state.toLowerCase()}>
            {state}
        </Link>
    ));

const ATM = (
    <img
        width={10}
        height={10}
        src={`https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/atm-black-22.svg`}
    />
);

export const ParkHeader = ({ park }: { park: IPark }) => {
    const visitCount = getVisitorCount(park.parkCode);
    const [modal, btn] = ShareModal(park);

    return (
        <>
            {modal}
            <Header>
                <div>
                    <p style={{ fontSize: "1.5em", display: "flex", gap: "0.25em" }}>
                        {StateLinks(park.states)}

                        {visitCount > 0 && <>- {visitCount} visitors in 2022</>}
                    </p>
                </div>

                <HeaderBtnGroup style={{ textAlign: "right" }}>
                    <a className='btn' href='#alerts'>
                        <Alert width={10} height={10} />
                        Alerts
                    </a>
                    <a className='btn' href='#contact'>
                        <Contact width={10} height={10} />
                        Contact
                    </a>
                    <a className='btn' href='#fees'>
                        {ATM}
                        Fees
                    </a>
                    {btn}
                </HeaderBtnGroup>
            </Header>
        </>
    );
};

const Header = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 1em 0;
`;

const HeaderBtnGroup = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 1em;
`;
