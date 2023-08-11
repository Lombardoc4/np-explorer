import { useParams } from "react-router-dom";
import ParkContext from "../utils/hooks/ParkContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { StateProps, stateMap } from "../utils/lib/stateMap";

import styled from "styled-components";
import { parkVistors } from "../utils/lib/parkVisitors";
import { LeafletMap } from "../components/LeafletMap/index2";
import { Header } from "../components/Header";
import { ParkCards } from "../components/ParkCards";
import { ParkCardFilters } from "../components/ParkCardFilters";
import { StyledCard } from "../components/styled/StyledCard";

export interface FilterProps {
	activities: string[];
	cost: string;
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
			{/* <MapBox> */}
				<LeafletMap
					states={states}
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
	states: StateProps[];
	parks: any[];
	title?: string;
}

export const StateParks = ({ states, parks, title }: StateParksProps) => {
	const [filters, setFilters] = useState<FilterProps>({ activities: [], cost: "" });

	const [activeParks, setActiveParks] = useState(parks);
	const parkCoords = useMemo(() => activeParks.map(p => ({
		longitude: p.longitude,
		latitude: p.latitude,
		name: p.fullName,
		id: p.parkCode,
	})), [activeParks])

	const toggleFilter = (newFilters: FilterProps, filteredParks: any) => {
		setFilters(newFilters);
        // If there are no filters, set active parks to default parks
		setActiveParks((newFilters.activities.length > 0 || newFilters.cost !== '') ? filteredParks : parks);
	};


	useEffect(() => {
		setActiveParks(parks);
	}, [parks]);



	return (
		<MainContainer>
			<h2 className="title">{title}</h2>

			{/* Map with parks */}
			<StyledCard

				style={{ position: "relative"}}>
				<LeafletMap
					states={states}
					parkCoords={parkCoords}
				/>
			</StyledCard>

			<ParkCardFilters
				filters={filters}
				activeParks={activeParks}
				defaultParks={parks}
				toggleFilter={toggleFilter}
				// state={state}
			/>

			{ activeParks.length > 0 ?
				<ParkCards grid={true} parks={activeParks} showDescription={false} />
				:
				<h2>No parks match these filters</h2>
			}


		</MainContainer>
	)
}

export const StatePage = () => {
	const parks = useContext(ParkContext);
	const { stateId } = useParams();
	const states = stateMap.filter((state) => state.id === stateId);

	const defaultParks = useMemo(
		() => parks.filter((park: any) => park.states.toLowerCase().includes(stateId)),
		[stateId]
	);




	const memoHeader = useMemo(
		() => (
			<StateHeader
				states={states}
				parks={ defaultParks }
			/>
		),
		[states]
	);

	return (
		<>
			{memoHeader}
			<StateParks states={states} parks={defaultParks} />
		</>
	);
};

const MainContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 1em;
	/* grid-template-columns: 250px auto; */
	align-items: flex-start;
	margin: 2em auto;
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

	/* @media (min-width: 768px) {
		padding: 2em;
		gap: 1em;
	} */
`;

const MapBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;