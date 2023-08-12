import { useEffect, useMemo, useState } from "react";
import { FilterProps } from "../../pages/State";
import { Dropdown } from "../Dropdown";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { StateProps } from "../../utils/lib/stateMap";
import { StyledCard } from "../styled/StyledCard";


interface ParkCardFiltersProps {
	filters: FilterProps;
	activeParks: any;
	defaultParks: any;
	toggleFilter: (filters: FilterProps, parks: any) => void;
}


const costFilters = [
	{ value: "free", title: "Free" },
	{ value: "paid", title: "Paid" },
];

// Sort Activites by most common
const sortActivities = (activeParks: any) => {

	// Get Park Activity names and count
	// Reduce activity duplicates and keep count
	const activities = activeParks.reduce((acc: any, park: any) => {
		park.activities.forEach((activity: any) => {
			const existingItem = acc.find(((obj: {name: string, count: number}) => obj.name === activity.name));

			if (existingItem) {
				existingItem.count += 1;
			} else {
				acc.push({ name: activity.name, count: 1 });
			}
		});
		return acc;
	}, []);


	// Returne sorted array of activities by count
	return activities.sort((a: any, b: any) => {
		const nameA = a.name.toUpperCase(); // ignore upper and lowercase
		const nameB = b.name.toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
		  return -1;
		}
		if (nameA > nameB) {
		  return 1;
		}

		// names must be equal
		return 0;
	  });
};

export const ParkCardFilters = ({ filters, activeParks, defaultParks, toggleFilter}: ParkCardFiltersProps) => {
	const navigate = useNavigate();
	// const [loadMore, setLoadMore] = useState(0);
	const [showFilters, setShowFilters] = useState(false);

	const dropdownOptions = activeParks.length > 0 ? activeParks.map((park: any) => ({ value: park.parkCode, title: park.fullName })) : [{value: '', title: 'No Parks Found'}]

	// Sort Park Activities by with the most common first
	const activities = useMemo(() => sortActivities(defaultParks), [defaultParks]);

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
	// useEffect(() => {
	// 	setLoadMore(0);
	// }, [state]);

	return (
		<>
		<div className='filters'>
			<div className="container" style={{backgroundColor: '#fff'}}>

				<div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: 'var(--def-input-height)', margin: '1em 0'}}>

					<button  style={{marginRight: 'auto'}}  onClick={() =>  {setShowFilters(!showFilters)}}>
						<div className="img-container">

						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sliders" viewBox="0 0 16 16">
							<path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
						</svg>
						</div>
						{/* {" "}FILTERS */}
					</button>

					<h3>{activeParks.length} Parks</h3>

					<Dropdown
						placeholder={`Find a park`}
						options={dropdownOptions}
						onSelect={(option) => handleParkSelect(option)}
					/>

				</div>
			</div>

				{showFilters && <FilterCard className="container">

						<FilterCell>
							<h3>Cost</h3>
							<h4>Fees:</h4>
							<div className="checkbox">
								<input type="checkbox" id="free" name="fees" value="free"/>
								<label htmlFor="free">Free</label>
							</div>
							<div className="checkbox">
								<input type="checkbox" id="paid" name="fees" value="paid" />
								<label htmlFor="paid">Paid</label>
							</div>

							<h4>Annual Pass:</h4>
							<div className="checkbox">
								<input type="checkbox" id="annual-pass" name="pass" value="annual-pass" />
								<label htmlFor="annual-pass">Annual Pass</label>
							</div>
						</FilterCell>

						<FilterCell>
							<h3>Activities</h3>
							{ activities.map(({name, count} : {name: string, count: number}) => (
								<div className="checkbox">
									<input type="checkbox" id={name} name="activities" value={name} />
									<label htmlFor={name}>{name} ({count})</label>
								</div>
							)) }
						</FilterCell>

					</FilterCard>
				}
					{/* <FilterContainer className={showFilters ? 'show' : ''}>



						<TileGrid className='row' >
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
							Get most present activites and add load more button
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

				</FilterContainer> */}
		</div>
		</>

	);
};


const FilterCard = styled(StyledCard)`
	border-bottom: 2px solid ${({ theme }) => theme.colors.gray};
	align-items: normal;
	padding: 1em;
`;

const FilterCell = styled.div`

	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	align-items: flex-start;
	gap: 0.5em;


    &:not(:last-child) {
		margin-bottom: 0.5em;
		padding-bottom: 0.5em;
		border-bottom: 1px solid #000;
	}
	h3, h4 {
		grid-column: 1 / -1;
	}

	.checkbox {
		display: flex;
		gap: 0.5em;
		/* margin-bottom: 0.5em; */
/*
		input {
			margin: 0.25em 0 auto 0;
		} */
	}
`



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
	}
`;
