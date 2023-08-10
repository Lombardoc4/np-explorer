import { Fragment, useContext, useRef, useState } from "react";
import { useParams, Link, useLoaderData, Outlet } from "react-router-dom";

import React from "react";
import { ImgGrid } from "../components/ImgGrid";
import { ParkAlert } from "../components/ParkAlert";
import { StateParks } from "./State";


import { StyledParkHeader } from "../components/styled/StyledParkComponents";

import ParkContext from "../utils/hooks/ParkContext";
import { activityCategories } from "../utils/lib/activityCategories";
import { stateMap } from "../utils/lib/stateMap";
import { parkVistors } from "../utils/lib/parkVisitors";

interface ParkProps {
	park: any;
}

const getVisitorCount = (parkId: string) => {
	const visitors = parkVistors.filter((park) => park.parkCode === parkId?.toUpperCase());
	return visitors.length >= 1 ? visitors[0].visitors : 0;
};



const ParkHeader = ({ park }: ParkProps) => {
	const visitCount = park.parkCode && getVisitorCount(park.parkCode);
	return (
        <>
            <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                <div>
                    <h1>{park.name}</h1>
					<p style={{fontSize: '1.35em'}}>
						{park.states.length > 0 && park.states.split(",").map((state: string) => (
							<Fragment key={state}>
								<Link
									to={"/state/" + state.toLowerCase()}
									>
									{state}
								</Link>{" "}
							</Fragment>
						))}
						{visitCount && <>- {visitCount} visitors in 2022</>}
                    </p>
                </div>

                <div style={{display: 'flex', gap: '1em', alignItems: 'flex-end', textAlign: 'right'}}>
					<div>
						<a href="#alerts">
							Alerts
						</a>
					</div>
					<div>
						<a href="#contact">
							Contact
						</a>
					</div>
					<div>
						Share
					</div>
                </div>
            </div>
		</>
	);
};


interface LoaderProps {
    thingsToDo: any[],
    camping: any[],
    events: any[],
    tours: any[],
    visitorCenters: any[],
    parking:any[]
}

const ParkLayout = () => {
	const parks = useContext(ParkContext);
	const { parkId } = useParams();

	const park = parks.find((park: any) => park.parkCode === parkId);
	const state = stateMap.filter((state) => park.addresses[0].stateCode.toLowerCase().includes(state.id))[0];

	const otherParks = parks.filter((p: any) => p.states.toLowerCase().includes(state.id) && p.fullName !== p.fullName);

	return (
		<>
            <StyledParkHeader className='container'>
                <ParkHeader park={park}/>
                {park.images.length > 0 && <ImgGrid images={park.images} />}
            </StyledParkHeader>

			<main>

                <Outlet/>

				<div
					className='container'
					style={{ marginTop: "4em" }}
				>

					<StateParks
						title={"Other parks in " + state.name}
						state={state}
						parks={otherParks}
					/>
				</div>
			</main>
		</>
	);
};

export default ParkLayout;