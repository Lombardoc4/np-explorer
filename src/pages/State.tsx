import { useParams } from "react-router-dom";
import ParkContext from "../utils/hooks/ParkContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { StateProps, stateMap } from "../utils/lib/stateMap";

import styled from "styled-components";
import { parkVistors } from "../utils/lib/parkVisitors";
import { LeafletMap } from "../components/LeafletMap";
import { Header } from "../components/Header";
import { ParkCards } from "../components/ParkCards";
import { ParkCardFilters } from "../components/ParkCardFilters";

export interface FilterProps {
	activities: string[];
	cost: string;
}

interface StateHeaderProps {
	state: StateProps;
	parks: any[];
}

const StateHeader = ({ state, parks }: StateHeaderProps) => {
	const parkCount = parks.length;
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
			{/* <MapBox> */}
				<LeafletMap
					state={state}
					parkCoords={parks.map((park: any) => ({
						longitude: park.longitude,
						latitude: park.latitude,
						name: park.fullName,
						id: park.parkCode,
					}))}
				/>
			{/* </MapBox> */}
		</Header>
	);
};

interface StateParksProps {
	state: StateProps;
	parks: any[];
	title?: string;
}

export const StateParks = ({ state, parks, title }: StateParksProps) => {
	const [filters, setFilters] = useState<FilterProps>({ activities: [], cost: "" });

	const [activeParks, setActiveParks] = useState(parks);

	const toggleFilter = (newFilters: FilterProps, filteredParks: any) => {
		setFilters(newFilters);
        // If there are no filters, set active parks to default parks
		setActiveParks((newFilters.activities.length > 0 || newFilters.cost !== '') ? filteredParks : parks);
	};


	useEffect(() => {
		setActiveParks(parks);
	}, [state]);


	return (
		<MainContainer className='container'>
			<h2 className="title">{title}</h2>

			{/* Map with parks */}
			{/* <div style={{ position: "relative" }}>
				<LeafletMap
					state={state}
					parkCoords={[
						{
							longitude: parks[0].longitude,
							latitude: parks[0].latitude,
							name: parks[0].fullName,
							id: parks[0].parkCode,
						},
					]}
				/>
			</div> */}

			<ParkCardFilters
				filters={filters}
				activeParks={activeParks}
				defaultParks={parks}
				toggleFilter={toggleFilter}
				state={state}
			/>

			<ParkCards grid={true} parks={activeParks} showDescription={false} />
		</MainContainer>
	)
}

export const StatePage = () => {
	const parks = useContext(ParkContext);
	const { stateId } = useParams();
	const state = stateMap.filter((state) => state.id === stateId)[0];

	const defaultParks = useMemo(
		() => parks.filter((park: any) => park.states.toLowerCase().includes(stateId)),
		[stateId]
	);




	const memoHeader = useMemo(
		() => (
			<StateHeader
				state={state}
				parks={ defaultParks }
			/>
		),
		[state]
	);

	return (
		<>
			{memoHeader}
			<StateParks state={state} parks={defaultParks} />
		</>
	);
};

const MainContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 1em;
	/* grid-template-columns: 250px auto; */
	align-items: flex-start;
	margin: auto;
	padding: 1em;

	.title {
		font-size: 2.2em;
		text-align: center;
	}

	.filters {
		display: flex;
		flex-direction: column;
		/* gap: 0.5em; */
		border-bottom: 2px solid ${({ theme }) => theme.colors.gray};
		padding-bottom: 1em;
		margin-bottom: 1em;
	}

	@media (min-width: 768px) {
		padding: 2em;
		/* gap: 1em; */
	}
`;

const MapBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;