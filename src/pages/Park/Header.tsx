import { Link } from "react-router";

import { ShareModal } from "../../components/Modal/ShareModal";

import Contact from "../../assets/icons/person.svg";
import Alert from "../../assets/icons/alert.svg";

// import { parkVistors } from "../../utils/lib/parkVisitors";
import { IPark } from "../../utils/hooks/ParkContext";
import { styled } from "styled-components";

const StateLinks = (states: IPark["states"]) =>
    states.split(',').map((state) => (
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
    const [modal, btn] = ShareModal(park);

    return (
        <>
            {modal}
            <Header>
                <div className="title">
                    <span style={{ display: "flex", gap: "0.25em" }}>
                        {StateLinks(park.states)}
                    </span>

                </div>

                <HeaderBtnGroup>
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
    flex-direction: column;
    justify-content: space-between;
    margin-block: 2rem 1rem;

    .title {
        font-size: 1.5em;
        display: flex;
        flex-direction: column;
        gap: 0.25em;
    }

    @media (min-width: 768px) {
        flex-direction: row;
        align-items: flex-end;
    }

    @media (min-width: 768px) {
        .title {
            flex-direction: row;
            /* align-items: flex-end; */
        }
    }
`;

const HeaderBtnGroup = styled.div`
    display: flex;
    gap: 1em;

    @media (min-width: 768px) {
        align-items: flex-end;
    }
`;
