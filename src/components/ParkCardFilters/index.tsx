import { useEffect, useMemo, useState } from "react";
import { FilterProps } from "../../pages/State";
import { Dropdown } from "../Dropdown";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { StateProps } from "../../utils/data/stateMap";

const costFilters = [
	{ value: "free", title: "Free" },
	{ value: "paid", title: "Paid" },
];

const sortActivities = (activeParks: any) => {
	// Get Park Activity names and count
	const activities = activeParks.reduce((acc: any, park: any) => {
		park.activities.forEach((activity: any) => {
			if (acc[activity.name]) {
				acc[activity.name] += 1;
			} else {
				acc[activity.name] = 1;
			}
		});
		return acc;
	}, {});

	// Returne sorted array of activities by count
	return Object.keys(activities).sort((a: any, b: any) => activities[b] - activities[a]);
};

interface ParkCardFiltersProps {
	filters: FilterProps;
	activeParks: any;
	defaultParks: any;
	toggleFilter: (filters: FilterProps, parks: any) => void;
	state: StateProps;
}

export const ParkCardFilters = ({ filters, activeParks, defaultParks, toggleFilter, state }: ParkCardFiltersProps) => {
	const navigate = useNavigate();
	const [loadMore, setLoadMore] = useState(0);
	const [showFilters, setShowFilters] = useState(false);

	// Sort Park Activities by with the most common first
	const activities = useMemo(() => sortActivities(defaultParks), [state]);

	const handleParkSelect = (park: any) => {
		navigate(`/park/${park}`);
	};

	const handleFilter = (type: "cost" | "activity", filter: string) => {
		let parks = [];

		if (type === "cost") {
			let cost = "";
			if (filter !== filters.cost) {
				cost = filter;
				parks = activeParks.filter((park: any) => {
					if (park.entranceFees.length <= 0 && cost === "free") return true;
					if (park.entranceFees.length <= 0) return false;
					// Filter though entrance fees
					return park.entranceFees.find((fee: any) => fee.cost > 0);
				});
			}

			toggleFilter({ ...filters, cost: cost }, parks);
			return;
		}

		if (type === "activity") {
			let activityFilters = [...filters.activities];
			if (filters.activities.includes(filter)) {
				activityFilters = filters.activities.filter((activity: string) => activity !== filter);
			} else {
				activityFilters.push(filter);
			}

			if (activityFilters.length > 0) {
				// Filter through parks to see if containers selected activities
				parks = defaultParks.filter((park: any) => { // Loop 1
					return activityFilters.every((filter: string) => { // Loop 2
						return park.activities.find((activity: any) => { // Loop 3
							return activity.name === filter;
						});
					});
				});
			}
			toggleFilter({ ...filters, activities: activityFilters }, parks);
			return;
		}
	};

	// Reset activity filters length when state value change
	useEffect(() => {
		setLoadMore(0);
	}, [state]);

	return (
		<div className='filters'>
			<TileGrid className="filter-summary">
				<Dropdown
					placeholder={`Find a park in ${state.name}`}
					options={activeParks.length > 0 ? activeParks.map((park: any) => ({ value: park.parkCode, title: park.fullName })) : [{value: '', title: 'No Parks Found'}]}
					onSelect={(option) => handleParkSelect(option)}
				/>
				
				<h3>{activeParks.length} Parks</h3>
				
			
				<Tile className="active" onClick={() =>  {setShowFilters(!showFilters)}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sliders" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
					</svg>
					Filters
				</Tile>
			</TileGrid>
			
				{ showFilters &&
					<>
				

				<TileGrid className='row'>
					<h3>Entrance Cost:</h3>
					{costFilters.map((filter: any) => {
						return (
							<Tile
							className={filters.cost === filter.value ? "active" : ""}
							onClick={() => handleFilter("cost", filter.value)}
							key={filter.value}
							>
								{filter.title}
								{filters.cost === filter.value && (
									<svg
									onClick={() => handleFilter("cost", filter.value)}
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									fill='currentColor'
									className='bi bi-x'
									viewBox='0 0 16 16'
									>
										<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
									</svg>
								)}
							</Tile>
						);
					})}
				</TileGrid>

				<TileGrid className='row'>
					<div className="heading">
						<h3>Activities:</h3>
						{ filters.activities.length > 0 &&
							<Tile className="active" onClick={() =>  {toggleFilter({...filters,  activities: []}, defaultParks)}}>
								Clear Filters
							</Tile>
						}
					</div>
					{/* Get most present activites and add load more button */}
					{activities.map((activity: string, i) => {
						if (i < 10 + 10 * loadMore) {
							return (
								<Tile
								key={activity}
								className={filters.activities.includes(activity) ? "active" : ""}
								onClick={() => handleFilter("activity", activity)}
								>
									{activity}
									{filters.activities.includes(activity) && (
										<svg
										onClick={() => handleFilter("activity", activity)}
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='currentColor'
										className='bi bi-x'
										viewBox='0 0 16 16'
										>
											<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
										</svg>
									)}
								</Tile>
							);
						}
					})}

					{activities.length > 10 + 10 * loadMore && (
						<Tile
						onClick={() => setLoadMore(loadMore + 1)}
						key='load-more'
						>
							Load More
						</Tile>
					)}
				</TileGrid>
			</>
			}
		</div>
	);
};

const TileGrid = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1em;

	&.row {
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		padding: 0 0 1em;
	}
	
	&.filter-summary {
		background: ${({ theme }) => theme.colors.white};
		padding: 1em;
		margin: 0 -1em;
		position: sticky;
		top: 70px;
	}
	
	.heading {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		.active {
			width: fit-content;
		}
	}
	
	@media (min-width: 768px) {
		&.filter-summary {
			position: static;
		}
		
		.heading {
			gap: 1em;
			justify-content: flex-start;
		}
	}
		
`;

const Tile = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.5em;
	width: fit-content;

	border-radius: 5px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	background: ${({ theme }) => theme.colors.gray};
	color: ${({ theme }) => theme.colors.primary};
	font-weight: 700;
	/* font-size: 0.75em; */
	padding: 0.5em 1em;
	cursor: pointer;
	&.active {
		background: ${({ theme }) => theme.colors.primary};

		color: #fff;
		& svg:hover {
			fill: ${({ theme }) => theme.colors.primary};
			background: #fff;
			border-radius: 50%;
		}
	}
	
	@media (max-width: 768px) {
		width: 100%;
`;
