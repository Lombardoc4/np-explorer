import { useParams } from "react-router-dom";
import ParkContext from "../utils/hooks/ParkContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { StateProps, stateMap } from "../utils/data/stateMap";

import styled from "styled-components";
import { parkVistors } from "../utils/data/parkVisitors";
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
		.filter((park) => park.state === state.name)
		.reduce((acc: number, park: any) => acc + park.visitors, 0);

	const Description = (
		<p>
			<strong>{parkCount}</strong> National Parks with <strong>{visitCount}+</strong>&nbsp;visitors in 2022
		</p>
	);

	return (
		<Header
			title={state.name}
			description={Description}
		>
			<MapBox>
				<LeafletMap
					state={state}
					parkCoords={parks.map((park: any) => ({
						longitude: park.longitude,
						latitude: park.latitude,
						name: park.fullName,
						id: park.parkCode,
					}))}
				/>
			</MapBox>
		</Header>
	);
};

export const StatePage = () => {
	const parks = useContext(ParkContext);
	const { stateId } = useParams();
	const state = stateMap.filter((state) => state.id === stateId)[0];

	const [filters, setFilters] = useState<FilterProps>({ activities: [], cost: "" });
	const defaultParks = useMemo(
		() => parks.filter((park: any) => park.states.toLowerCase().includes(stateId)),
		[stateId]
	);

	const [activeParks, setActiveParks] = useState(defaultParks);

	useEffect(() => {
		setActiveParks(defaultParks);
	}, [stateId]);

	const toggleFilter = (newFilters: FilterProps, filteredParks: any) => {
		setFilters(newFilters);
        // If there are no filters, set active parks to default parks
		setActiveParks((newFilters.activities.length > 0 || newFilters.cost !== '') ? filteredParks : defaultParks);
	};

	const memoHeader = useMemo(
		() => (
			<StateHeader
				state={state}
				parks={ defaultParks }
			/>
		),
		[state, activeParks]
	);

	return (
		<>
			{memoHeader}

			<MainContainer className='container'>
				<ParkCardFilters
					filters={filters}
					activeParks={activeParks}
					defaultParks={defaultParks}
					toggleFilter={toggleFilter}
					state={state}
				/>

				<h3>{activeParks.length} Parks</h3>

				<ParkCards parks={activeParks} />
			</MainContainer>
		</>
	);
};

const MainContainer = styled.div`
	display: grid;
	gap: 2em;
	/* grid-template-columns: 250px auto; */
	align-items: flex-start;
	margin: auto;
	padding: 2em;

	.filters {
		display: flex;
		flex-direction: column;
		gap: 2em;
	}

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		padding: 1em;
	}
`;

const MapBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;