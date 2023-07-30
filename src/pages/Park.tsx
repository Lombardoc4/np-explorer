import { useContext, useEffect, useMemo } from "react";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import styled from "styled-components";

import { LeafletMap } from "../components/LeafletMap";
import { ParkAlert } from "../components/ParkAlert";
import { Header } from "../components/Header";
import { CardButtonGrid } from "../components/CardButtonGrid";
import { ImageGrid } from "../components/ImageViewer";
import { ParkDescription } from "../components/ParkDescription";

import ParkContext from "../utils/hooks/ParkContext";
import { StateProps, stateMap } from "../utils/lib/stateMap";
import { parkVistors } from "../utils/lib/parkVisitors";
import { ParkCards } from "../components/ParkCards";
import { ReactComponent as ListStar } from "../assets/icons/list-stars.svg";
import { ReactComponent as Fire } from "../assets/icons/fire.svg";
import { ReactComponent as CalendarCheck } from "../assets/icons/calendar-check-fill.svg";
import { ReactComponent as People } from "../assets/icons/people-fill.svg";
import { ReactComponent as House } from "../assets/icons/house-fill.svg";
import { ReactComponent as Car } from "../assets/icons/car-front-fill.svg";
import { Dropdown } from "../components/Dropdown";
import { StateParks } from "./State";
import { ImgGrid } from "../components/ImgGrid";

const activityCategories = [
	{
		name: "Things to do",
		id: "things-to-do",
		icon: <ListStar />,
	},
	// {
	//     name: 'Amenities',
	//     id: 'amenities-parks-places',
	//     icon: 'balloon'
	// },
	{
		name: "Camping",
		id: "campgrounds",
		icon: <Fire />,
	},
	{
		name: "Events",
		id: "events",
		icon: <CalendarCheck />,
	},
	{
		name: "Tours",
		id: "tours",
		icon: <People />,
	},
	{
		name: "Visitor Centers",
		id: "visitor-centers",
		icon: <House />,
	},
	{
		name: "Parking",
		id: "parking-lots",
		icon: <Car />,
	},
	// {
	//     name: 'News Releases',
	//     id: 'news-releases' ,
	//     icon: 'balloon'
	// },
];



interface ParkHeaderProps {
	park: any;
	state: StateProps;
	parkId?: string;
}

export const ParkHeader = ({ park, state, parkId }: ParkHeaderProps) => {
	

	

	
	return (
		<>
		<header className="container" style={{margin: '2rem auto 1rem'}}>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				
				<div>
					<div style={{display: 'flex', columnGap: '0.25em', flexWrap: 'wrap', alignItems: 'flex-end', gap: '1em'}}>
					</div>
						<h1>{park.name}</h1>
							
						{park.designation && <h2>{park.designation}</h2>}
						{park.states.length > 0 && (<div>
							{park.states.split(",").map((state: string) => (
							<><Link style={{fontWeight: 400}} to={"/state/" + state.toLowerCase()} key={state}>{state}</Link>{' '}</>
							))}
						</div>)}
					{/* {Description} */}
				</div>
				
				<div>
					<div>
						<ParkAlert parkId={park.parkCode}/>
					</div>
				</div>
			</div>
		</header>
		
		</>
	);
};

export const ParkPage = () => {
	const parks = useContext(ParkContext);
	const { parkId } = useParams();

	// Migrate logic to loader action via router
	// Todo Can this be simplied
	


	const activePark = parks.find((park: any) => park.parkCode === parkId);
	
	// Todo: Fix to map for each state
	const state = stateMap.filter((state) => activePark.states.toLowerCase().includes(state.id))[0];

	const otherParks = parks.filter(
		(park: any) => park.states.toLowerCase().includes(state.id) && park.fullName !== state.name
	);
	
	console.log('park', activePark);
	// .map((park: any) =>
	//     ({ link: '/park/' + park.parkCode, text: park.fullName })
	// );
	const memoHeader = useMemo(
		() => (
			<ParkHeader
				park={activePark}
				parkId={parkId}
				state={state}
			/>
		),
		[parkId, state]
	);
	
	useEffect(() => {
		// extend park context
		// make a fetch to 
		// - Things to do
		// - Camping
		// - Events
		// - Tours
		// - Visitor Centers
		// - Parking
		
	}, []);

	return (
		<>
			{memoHeader}
			{ activePark.images.length > 0 && (
				<ImgGrid images={activePark.images} />
			)}
			<div style={{position: 'relative'}}>
				
				
			{/* {activePark.images.length > 0 && (
				
				<div className="container" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', height: '500px'}}>
						{activePark.images.map((img: any, i: number ) => {
							if (i === 0) {
								return (
									<div style={{gridColumn: '1 / 3', gridRow: '1 / 3' }}>
								<img
								src={img.url}
								alt={img.altText}
								style={{width: '100%',  objectFit: 'cover'}}
								/>
							</div>
								)
							} 
							
							return (
								
								<div>
								<img
								src={img.url}
								alt={img.altText}
								style={{width: '100%', objectFit: 'cover'}}
								/>
							</div>
								)
						}
						)}
				</div>
			)} */}
				
			{/* {parkId && <ParkAlert parkId={parkId} />} */}
				
			<Outlet />

			{/* {parkId && <ImageGrid previewImgs={activePark.images} parkId={parkId}/>} */}

			<div
			className="container" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1em' ,marginBottom: '2rem'}}>
				{
					activityCategories.map((category) => {
						return (
							<div className="card"
								style={{width: '100%', padding: '1em', borderRadius: '5px', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 8px -2px', display: 'flex', alignItems: 'center', gap: '0.5em'}}
							key={category.id}>
								{category.icon}
								<p>{category.name}(#)</p>
							</div>
						)
					}
					)
				}
				{/* <CardButtonGrid
					dir={"row"}
					buttons={activityCategories} // Map catorgies to one with api returns
					/> */}
			</div>

			<DescriptionBox className="container"  style={{marginBottom: '6rem'}}>
				<ParkDescription park={activePark} />
			</DescriptionBox>

			
			{/* {parkId &&
				<ImageGrid
				previewImgs={activePark.images}
				parkId={parkId}
				/>
			} */}
	<div className="container" style={{marginBottom: '6rem'}} >
		
				<h2>Directions</h2>
				<DirectionSection >
					
					{/* API Call */}
					<MapBox>
						<LeafletMap
							state={state}
							parkCoords={[
								{
									longitude: activePark.longitude,
									latitude: activePark.latitude,
									name: activePark.fullName,
									id: activePark.parkCode,
								},
							]}
							/>
					</MapBox>
					<div className='directions'>
						<div>
							
						<p>{activePark.directionsInfo}</p>
						<a href={activePark.directionsUrl}>Official National Park Directions</a>
						</div>

						<div>
							
						<h3>Address</h3>
						<p>
							{activePark.addresses
								.filter((add: any) => add.type === "Physical")
								.map((add: any) => {
									return (
										<a
										key={add.line1}
										target='_blank'
										href={`https://www.google.com/maps/search/?api=1&query=${add.line1.replaceAll(' ', '+').replace('.', '')} ${add.city.replaceAll(' ', '+')} ${add.stateCode} ${add.postalCode}`}
										>
											{add.line1}
											<br />
											{add.city}, {add.stateCode} {add.postalCode}
										</a>
									);
								})}
						</p>
						<h3>Coordinates</h3>
						<p>
							<a
								target='_blank'
								href={`https://www.google.com/maps/search/?api=1&query=${activePark.latitude},${activePark.longitude}`}
								>
								{activePark.latitude}, {activePark.longitude}
							</a>
						</p>
						</div>

					</div>

					
				</DirectionSection>
				</div>
			</div>
			<div className="container" style={{ marginTop: "4em" }}>
				<StateParks
					title={"Other parks in " + state.name}
					state={state}
					parks={otherParks}
					/>
			</div>
		</>
	);
};

const MapBox = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	
	.leaflet-container {
		height: 500px;
	}
`;

const DescriptionBox = styled.div`
	/* background: #f1f1f1; */
	color: #000;
	/* padding: 0 1em; */
	display: grid;
	gap: 1em;
	/* font-size: 1.2em; */

	@media (min-width: 768px) {
		/* padding: 2em 1em; */
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	}
`;

const DirectionSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5em;
	/* font-size: 1.2em; */

	border-radius: 1em;
	overflow: hidden;
	/* box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 8px -2px; */
	
	.directions {
		background-color: ${({ theme }) => theme.colors.secondary};
		color: ${({ theme }) => theme.colors.black};
		padding: 1em;
		display: flex;
		gap: 2em;
		
		& > div {
			flex-basis: 50%;
		}
		
		/* margin: 1em 0; */

		p {
			margin-bottom: 1em;
		}

		a {
			text-decoration: underline;
			font-size: 1.1em;
			/* color: ${({ theme }) => theme.colors.black}; */
		}
	}

	@media (min-width: 768px) {
		/* flex-direction: column-reverse; */
		
		/* gap: 2em; */
		/* box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 16px -8px; */
	}
`;
