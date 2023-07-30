import { useContext, useRef, useState } from "react";
import { useParams, Link, useLoaderData } from "react-router-dom";

import { ParkAlert } from "../components/ParkAlert";
import { LeafletMap } from "../components/LeafletMap";
import { ImgGrid } from "../components/ImgGrid";
import { ParkDescription } from "../components/ParkDescription";
import { StateParks } from "./State";


import { ReactComponent as EmailIcon } from "../assets/icons/envelope-fill.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/telephone-fill.svg";
import { ReactComponent as GlobeIcon} from "../assets/icons/globe.svg";

import { StyledFeeCard, StyledParkHeader, StyledParkHeading, StyledParkAccordian } from "../components/styled/StyledParkComponents";

import ParkContext from "../utils/hooks/ParkContext";
import { activityCategories } from "../utils/lib/activityCategories";
import { StateProps, stateMap } from "../utils/lib/stateMap";
import { parkVistors } from "../utils/lib/parkVisitors";
import { useOutsideAlerter } from "../utils/hooks/useOuterClick";
import React from "react";

interface ParkProps {
	park: any;
}


interface DirectionProps extends ParkProps {
	state: StateProps;
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

                    {park.designation && <h2>{park.designation}</h2>}
                </div>
                
                <div style={{display: 'flex', gap: '1em', alignItems: 'flex-end', textAlign: 'right'}}>
                    <div>
                        
                    {park.states.length > 0 && park.states.split(",").map((state: string) => (
                        <>
                            <Link
                                style={{fontSize: '1.5em'}}
                                to={"/state/" + state.toLowerCase()}
                                key={state}
                                >
                                {state}
                            </Link>{" "}
                        </>
                    ))}
                    
                    {visitCount && <p>{visitCount} visitors in 2022</p>}
                    
                    </div>
                    <ParkAlert parkId={park.parkCode}/>
                </div>
            </div>

            {/* <div> */}
                {/* <div> */}
                    {/* <ParkAlert parkId={park.parkCode} /> */}
                {/* </div> */}
            {/* </div> */}
		</>
	);
};

const ParkDirections = ({ park, state }: DirectionProps) => {
	return (
		<>
			<h2>Directions</h2>
			<div>
				{/* API Call */}
				
				<div className='directions'>
					<div>
						<p>{park.directionsInfo}</p>
						<a href={park.directionsUrl}>Official National Park Directions</a>
					</div>

					<div>
						<h3>Address</h3>
						<p>
							{park.addresses
								.filter((add: any) => add.type === "Physical")
								.map((add: any) => {
									return (
										<a
											key={add.line1}
											target='_blank'
											href={`https://www.google.com/maps/search/?api=1&query=${add.line1
												.replaceAll(" ", "+")
												.replace(".", "")} ${add.city.replaceAll(" ", "+")} ${add.stateCode} ${
												add.postalCode
											}`}
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
								href={`https://www.google.com/maps/search/?api=1&query=${park.latitude},${park.longitude}`}
							>
								{park.latitude}, {park.longitude}
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

const FeeCard = ({ cost, title, description }: { cost: string; title: string; description: string }) => {
	const [active, setActive] = useState(false);
	const ref = useRef(null);
	useOutsideAlerter(ref, () => setActive(false));

	return (
        <>
            <div style={{padding: '0.5em 0.75em', borderBottom: '1px solid #000'}}>
                <p>
                    <b>{title.replace('-', '\u2011').replace('/', ' ').slice(title.indexOf('-') + 1, title.length)}</b>
                    <br/>
                    {description}
                </p>
            </div>
            <div style={{ fontSize: '1.25em', padding: '0 0.5em', borderBottom: '1px solid #000', borderRight: '1px solid #000', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <p><b>${cost}</b></p>
            </div>
        </>
		// <StyledFeeCard
		// 	className='primary'
		// 	$active={active}
        //     $align='center'
		// 	$row={true}
		// 	$justify="space-evenly"
        //     style={{padding: '0'}}
		// >
            
		// 	<div className='price' style={{padding: '0.75em', textTransform: 'capitalize'}}>
		// 		<p>{title.replace('-', '\u2011').replace('/', ' ').slice(title.indexOf('-') + 1, title.length)}</p>
				
		// 		<p>${cost}</p>
		// 	</div>
            
        //     <div style={{padding: '0.75em', backgroundColor: '#fff', color: '#000', flex: 1}}>
        //         {description && (
        //             <p>{description}</p>
        //         )}
        //     </div>
		// </StyledFeeCard>
	);
};

const FeeSection = ({ entranceFees }: any) => {
	if (entranceFees.length === 0)
		return (
			<div className='no-fees'>
				<h2>No Entrance Fees</h2>
				<img src='/hiking.svg' />
			</div>
		);

	return (
        <div>
            <div style={{display: 'flex', gap: '0.5em', alignItems: 'center'}}>
            <h2>Entrance Fees</h2>
				{" "}	
				<svg
					onMouseEnter={(e) => (e.target as Element).setAttribute("fill", "hsl(95, 48%, 26%)")}
					onMouseLeave={(e) =>  (e.target as Element).setAttribute("fill", "#000")}
					xmlns='http://www.w3.org/2000/svg'
					width='20'
					height='20'
					fill='#000'
					className='bi bi-info-circle-fill'
					viewBox='0 0 16 16'
                    style={{cursor: 'pointer'}}
					>
					<path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z' />
				</svg>
            </div>
            <div className='fees' style={{display: 'grid', gridTemplateColumns: '3fr 1fr', alignItems: 'center',}}>
                {entranceFees.map((fee: any) => (
                    <FeeCard
                    key={fee.title}
                    cost={fee.cost}
                    title={fee.title}
                    description={fee.description}
                    />
                    ))}
            </div>
        </div>
	);
};

const ContactInfo = ({park} : ParkProps) => {
    return <div>
        
    <h4>Contact Information</h4>
							{park.contacts.phoneNumbers.length > 0 &&
								park.contacts.phoneNumbers.map(({ phoneNumber }: { phoneNumber: string }) => (
                                    <p key={phoneNumber}>
										<PhoneIcon width={24} height={24}/>{" "}
										<a href={`tel:${phoneNumber}`}>
											{phoneNumber.replace('/', '-')}
										</a>
									</p>
								))}
							{park.contacts.emailAddresses.length > 0 &&
								park.contacts.emailAddresses.map(({ emailAddress }: { emailAddress: string }) => (
                                    <React.Fragment key={emailAddress}>
									{emailAddress.length > 0 && (
                                        <p key={emailAddress}>
											<EmailIcon width={24} height={24}/>{" "}
											<a href={`mailto:${emailAddress}`}>{emailAddress}</a>
										</p>
									)}
									</React.Fragment>
									
                                    ))
                                }
							<GlobeIcon width={24} height={24}/>{" "}
							<Link to={park.url}>Official National Parks Page</Link>
        </div>
}

interface LoaderProps {
    thingsToDo: any[],
    camping: any[],
    events: any[],
    tours: any[],
    visitorCenters: any[],
    parking:any[]
}

const Park2 = () => {
	const parks = useContext(ParkContext);
	const { parkId } = useParams();

	const park = parks.find((park: any) => park.parkCode === parkId);
	const state = stateMap.filter((state) => park.addresses[0].stateCode.toLowerCase().includes(state.id))[0];

	const otherParks = parks.filter((p: any) => p.states.toLowerCase().includes(state.id) && p.fullName !== p.fullName);

	const loaderData = useLoaderData() as LoaderProps;
    
    
    const activeCategories = Object.keys(activityCategories).map((category) => (
        {
            ...activityCategories[category],
            count: loaderData[category as keyof LoaderProps].length,
            data: loaderData[category as keyof LoaderProps]
        }
    ));
    
    
	return (
		<>
            <StyledParkHeader className='container'>
                <ParkHeader park={park}/>
                {park.images.length > 0 && <ImgGrid images={park.images} />}
            </StyledParkHeader>

			<main>
				

                <div className="container" style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1em'}}>
					<div>
                        <p className='mb-1'>{park.description}</p>
                        <StyledParkAccordian>
                            {activeCategories.map((category) =>  (
                                <div
                                    className='card'
                                    key={category.name}>
                                    {category.icon}
                                    <p>{category.name}({category.count})</p>
                                </div>
                                    
                            ))}
                        </StyledParkAccordian> 
                    </div>
                    
                    <div className='card'>
                        
					<h3>Weather</h3>
					<p className='mb-1'>{park.weatherInfo}</p>
                    <p>Weather API info</p>
                    </div>
				</div>
                
                <div className="container">
                    
                </div>
                
                

				<div className='container'>
                <div style={{position: 'relative'}}>
					<LeafletMap
						state={state}
						parkCoords={[
							{
								longitude: park.longitude,
								latitude: park.latitude,
								name: park.fullName,
								id: park.parkCode,
							},
						]}
					/>
				</div>
				</div>
                
                
                
                    
                    
                <div className="container" style={{display: 'grid', gridTemplateColumns: '2fr 1fr'}}>
                    <div>
                        
					<ParkDirections
						park={park}
						state={state}
                        />
                    <ContactInfo park={park}/>
                    </div>
                    <FeeSection entranceFees={park.entranceFees} />
                </div>
                    
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

export default Park2;