import { Link } from "react-router-dom";

import { ParkProps } from "./Park";
import { ShareModal } from "../../components/Modal/ShareModal";

import { ReactComponent as Contact } from "../../assets/icons/person.svg";
import { ReactComponent as Alert } from "../../assets/icons/alert.svg";

import { parkVistors } from "../../utils/lib/parkVisitors";

const getVisitorCount = (parkId: string) => {
	const visitors = parkVistors.filter((park) => park.parkCode === parkId?.toUpperCase());
	return visitors.length >= 1 ? visitors[0].visitors : 0;
};

const ATM = <img width={10} height={10} src={`https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/atm-black-22.svg`}/>

export const ParkHeader = ({ park }: ParkProps) => {
	const visitCount = park.parkCode && getVisitorCount(park.parkCode);
	const [modal, btn] = ShareModal(park)
	// const shareLink = window.location.href;
	const stateLinks = park.states.length > 0 && park.states.split(",").map((state: string) => (
        <Link
            key={state}
            to={"/state/" + state.toLowerCase()}
            >
            {state}
        </Link>
	))
	return (
        <>
			{modal}
            <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1em'}}>
                <div>
					<p style={{fontSize: '1.5em', display: 'flex', gap: '0.25em'}}>
						{stateLinks}
						{visitCount > 0 && <>- {visitCount} visitors in 2022</>}
                    </p>
                </div>

                <div style={{display: 'flex', gap: '1em', alignItems: 'flex-end', textAlign: 'right'}}>
						<a className="btn" href="#alerts">
							<Alert width={10} height={10}/>
							Alerts
						</a>
						<a className="btn" href="#contact">
							<Contact width={10} height={10}/>
							Contact
						</a>
						<a className="btn" href="#fees">
							{ATM}
							Fees
						</a>
						{btn}
                </div>
            </div>
		</>
	);
};
