import { useParams } from "react-router-dom";
import ParkContext from "../utils/hooks/ParkContext";
import { SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { StateProps, stateMap } from "../utils/lib/stateMap";

import styled from "styled-components";
import { parkVistors } from "../utils/lib/parkVisitors";
import { LeafletMap } from "../components/LeafletMap";
import { Header } from "../components/Header";
import { ParkCards } from "../components/ParkCards";
import { ParkCardFilters } from "../components/ParkCardFilters";
import { StyledCard } from "../components/styled/StyledCard";
import { ParkProps } from "./ParkContent/Park";

interface FilterProps {
	entranceFees: string,
	entrancePasses: string,
	activities: string[]
}

interface StateParksProps {
	states: StateProps[];
	parks: any[];
	currPark?: any;
	title?: string;
}

export interface InputProps {
	name: 'entranceFees'|'entrancePasses'|'activities',
	value: string
}

const initFilters: FilterProps = {
	entranceFees: '',
	entrancePasses: '',
	activities: []
}

const filterParks = (filters: FilterProps, parks: any[]) => {
	return parks.filter((p: any) => {
		const entranceFees = p.entranceFees.length > 0 ? 'paid' : 'free';
		const entrancePasses = p.entrancePasses.length > 0 ? 'annual-pass' : '';
		if (filters.entranceFees && entranceFees !== filters.entranceFees || filters.entrancePasses && entrancePasses !== filters.entrancePasses)
			return false;

		if (filters.activities && filters.activities.length > 0) {
			const match = filters.activities.every(a => p.activities.find((pa: any) => pa.name === a))
			if (!match)
				return false
		}
		return true;
	})
}


export const OtherParks = ({ states, parks, currPark, title }: StateParksProps) => {
	const [filters, setFilters] = useState<FilterProps>(initFilters);

	// const [filteredParks, setOtherParks] = useState(parks);
	const filteredParks = filterParks(filters, parks)

	// Coords for map
	const parkCoords = filteredParks.map(p => ({
		longitude: p.longitude,
		latitude: p.latitude,
		name: p.fullName,
		id: p.parkCode,
	}))


	const toggleFilter = (input: InputProps) => {
		const {name, value} = input;
		if (name === 'activities') {
			const newActivities = filters.activities.find(a => a === value) ? filters.activities.filter(a => a !== value) : [...filters.activities, value]
			setFilters({...filters, activities: newActivities})
		} else {
			const newFilters = {...filters, [name]: value};
			setFilters(newFilters);
		}
	}

	return (
		<MainContainer>

			<h2 className="title">{title}</h2>

			{/* Map with parks */}
			<StyledCard className="container" style={{ position: "relative"}}>
				<LeafletMap
					states={states}
					parkCoords={parkCoords}
					activeMarker={currPark}
				/>
			</StyledCard>

			<div id="other-parks">

				{/* TWO COMPONENTS BELOW MIGHT BE COMBINABLE  */}
				<ParkCardFilters
					otherParks={filteredParks}
					toggleFilter={toggleFilter}
					// state={state}
				/>

				<div className="container">
				{ filteredParks.length > 0 ?
					<ParkCards grid={true} parks={filteredParks} showDescription={false} />
					:
					<h2>No parks match these filters</h2>
				}
				</div>
			</div>


		</MainContainer>
	)
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
			{/* {memoHeader} */}
			<OtherParks states={states} parks={defaultParks} />
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
	/* padding: 1em; */

	.title {
		font-size: 2.2em;
		text-align: center;
	}

	.filters {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 1em;

		position: sticky;
		top: 0;
		z-index: ${({ theme }) => theme.zIndex.dropdown};

		background-color: ${({ theme }) => theme.colors.white};
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