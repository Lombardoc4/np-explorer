import { useParams } from "react-router-dom";
import ParkContext from "../utils/hooks/ParkContext";
import {  useContext, useMemo } from "react";
import { StateProps, stateMap } from "../utils/lib/stateMap";

import { parkVistors } from "../utils/lib/parkVisitors";
import { LeafletMap } from "../components/LeafletMap";
import { Header } from "../components/Header";


export interface InputProps {
	name: 'entranceFees'|'entrancePasses'|'activities',
	value: string
}







interface StateHeaderProps {
	states: StateProps[];
	parks: any[];
}

const StateHeader = ({ states, parks }: StateHeaderProps) => {
	const parkCount = parks.length;
	const [state] = states;
	const visitCount = parkVistors
		.filter((park: { state: string; }) => park.state === state.name)
		.reduce((acc: number, park: any) => acc + park.visitors, 0);

	const Description = (
		<p style={{fontSize: '1.2em'}}>
			<strong>{parkCount}</strong> National Parks<br/><strong>{visitCount}+</strong>&nbsp;visitors in 2022
		</p>
	);

	return (
		<Header
			title={state.name}
			description={Description}
		>
				<LeafletMap
					states={states}
					parkCoords={parks.map((park: any) => ({
						longitude: park.longitude,
						latitude: park.latitude,
						name: park.fullName,
						id: park.parkCode,
					}))}
				/>
		</Header>
	);
};

export const StatePage = () => {
	const parks = useContext(ParkContext);
	const { stateId } = useParams();
	const states = stateMap.filter((state) => state.id === stateId);

	// const defaultParks = useMemo(
	// 	() => parks.filter((park: any) => park.states.toLowerCase().includes(stateId)),
	// 	[stateId]
	// );

	// const memoHeader = useMemo(
	// 	() => (
	// 		<StateHeader
	// 			states={states}
	// 			parks={ defaultParks }
	// 		/>
	// 	),
	// 	[states]
	// );

	return (
		<>
			{/* {memoHeader} */}
			{/* <OtherParks states={states} parks={defaultParks} /> */}
			<h1>In progress</h1>
		</>
	);
};
