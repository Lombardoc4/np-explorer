import { Fragment, useContext } from "react";
import { useParams, Link, useLoaderData } from "react-router-dom";

import { ParkAlert } from "../components/ParkAlert";
import { LeafletMap } from "../components/LeafletMap";

import { ReactComponent as EmailIcon } from "../assets/icons/envelope-fill.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/telephone-fill.svg";
import { ReactComponent as GlobeIcon } from "../assets/icons/globe.svg";


import ParkContext from "../utils/hooks/ParkContext";
import { ActivityDetails, activityCategories } from "../utils/lib/activityCategories";
import { stateMap } from "../utils/lib/stateMap";
import { CardItem, StyledCard, StyledCardContainer } from "../components/styled/StyledCard";
import styled from "styled-components";
import { SymbolMap } from "../utils/symbolMap";

export interface ParkProps {
    park: any;
}

interface ActiveCatergory extends ActivityDetails {
	data: any[],
	count: number
}

interface HeaderProps extends ParkProps {
	activeCategories: ActiveCatergory[]
}


const ParkHeader = ({ park, activeCategories }: HeaderProps) => {

    return (
        <div className="section" style={{ display: "flex",}}>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<h2>{park.fullName}</h2>
				<div style={{margin: 'auto 0'}}>
					{activeCategories.map((category: ActivityDetails, i: number, data: any) => (
						<Fragment key={category.name}>
							<a href={"#" + category.name.replaceAll(" ", "-").toLowerCase()}>
								{i + 1} {category.name}
							</a>
							{i < data.length - 1 && <> ~ </>}
						</Fragment>
					))}
				</div>
			</div>
			<div className='img-container' style={{ width: "60px", margin: "0 1em 0 auto" }}>
				<img
					src='https://www.nps.gov/theme/assets/dist/images/branding/logo.png'
					width='60'
				></img>
			</div>
		</div>
    );
};

const DirectionAddress = ({addresses}: {addresses : any[]}) => {
	addresses.filter((add: any) => add.type === "Physical").map((add: any) => {
		add.gMapsUrl = `https://www.google.com/maps/search/?api=1&query=${add.line1.replaceAll(" ", "+").replace(".", "")} ${add.city.replaceAll(" ", "+")} ${add.stateCode} ${add.postalCode}`
		add.full = <>{add.line1},<br/> {add.city}, {add.stateCode} {add.postalCode}</>;
	})

    return (
        <>
        {addresses.filter((add: any) => add.type === "Physical").map((add: any) => (
            <p
            key={add.full}
            >
                <a
                    target='_blank'
                    href={add.gMapsUrl}
                    >
                    {add.full}
                </a>
            </p>
            ))}
        </>
    )
}

const ParkDirections = ({ park }: ParkProps) => {
	const { addresses } = park;


    return (
        <div className="section">
            <h3>Directions</h3>

			<p>{park.directionsInfo}</p>
			<a target="_blank" href={park.directionsUrl}>Official National Park Directions</a>


			<div style={{ display: "grid", gridTemplateColumns: "1fr  1fr", margin: "0.5em 0" }}>
				<div>
					<h4>Address</h4>
					<DirectionAddress addresses={addresses}/>
				</div>
				<div>
					<h4>Coordinates</h4>
					<p>
						<a
							target='_blank'
							href={`https://www.google.com/maps/search/?api=1&query=${park.latitude},${park.longitude}`}
						>
							Lat: {park.latitude},<br/>
                            Log: {park.longitude}
						</a>
					</p>
				</div>
			</div>
        </div>
    );
};

const FeeItem = ({ cost, title, description }: { cost: string; title: string; description: string }) => {
	title = title.replace("-", "\u2011").replace("/", " ").slice(title.indexOf("-") + 1, title.length)
    return (
            <CardItem>
                <h3>{title}</h3>
                <p className="bold">${cost}</p>
				<p>{description}</p>
            </CardItem>
    );
};

const FeeSection = ({ entranceFees }: any) => {
    if (entranceFees.length === 0)
        return (
            <StyledCardContainer id="fees" className='no-fees'>
                <h2>No Entrance Fees</h2>
                    <div className='img-container' style={{padding: '1em 0 0'}}>
                        <img src='/hiking.svg' />
                    </div>
            </StyledCardContainer>
        );

    return (
        <StyledCardContainer id="fees">
            <h2>Entrance Fees</h2>
            <StyledCard $bg='#ffffff'>
                {entranceFees.map((fee: any) => (
                    <FeeItem key={fee.title} cost={fee.cost} title={fee.title} description={fee.description} />
                ))}
            </StyledCard>
        </StyledCardContainer>
    );
};

const CategoryCard = ({ category, data }: { category: string; data: any }) => {
    switch (category) {
        case "Visitor Centers":
            return (
                <div>

                    <h4 style={{display: 'flex', alignItems: 'center', gap: '1em'}}>
                        <Link to={"./visitor-centers/#" + data.name.replaceAll(" ", "-").toLowerCase()}>
                            {data.name}
                        </Link>{' '}
                        {data.isPassportStampLocation === "1" && (
                            <img
                            title='Passport Stamp'
                            src='/passport-book.webp'
                            alt='Passport Stamp'
                            style={{ height: "35px" }}
                            />
                            )}
                    </h4>
                    <p>{data.description}</p>
                </div>
            );
        case "Campgrounds":
            return (
                <div>
                    <h4>
                        <Link to={"./camping/#" + data.name.replaceAll(" ", "-").toLowerCase()}>{data.name}</Link>
                    </h4>
                    <p>{data.description}</p>
                </div>
            );
        case "Things to do":
            return (
                <div>
                    <h4>
                        <Link to={"./things-to-do/#" + data.title.replaceAll(" ", "-").toLowerCase()}>{data.title}</Link>
                    </h4>
                    <p>{data.shortDescription}</p>
                </div>
            );
        case "Events":
            return (
                <div>
                    <span className="bold">{new Date(data.date.replace(/-/g, '\/')).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <h4><Link to={"./events/#" + data.title.replaceAll(" ", "-").toLowerCase()}>{data.title}</Link></h4>
                    <div dangerouslySetInnerHTML={{__html: data.description.replaceAll('<br /><br />', '</p><p>')}}/>
                </div>
            );

        default:
            return <div>{data.name || data.title}</div>;
    }
};

const ContactPhone = ({type, number} : {type: string, number: string}) => {
    const icon = type === 'TTY' ?  <img width={24} height={24} src={`https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/${SymbolMap['text-telephone-service']}-black-22.svg`}/> : <PhoneIcon width={24} height={24} />

    if (type === 'Fax') return <></>;

    return (
        <CardItem>
            {icon}
            <a href={`tel:${number}`}>{number.replace("/", "-")}</a>
        </CardItem>
    )
}

const ContactEmail = ({email}: {email: string}) => (
    <>
    {email.length > 0 && (
        <CardItem>
            <EmailIcon width={24} height={24} />{" "}
            <a href={`mailto:${email}`}>{email}</a>
        </CardItem>
    )}
    </>
)

const ContactInfo = ({ park }: ParkProps) => {
    const { contacts, url } = park

    return (
        <StyledCardContainer id="contact">
            <h2>Contact</h2>
            <ContactCard>

                {contacts.phoneNumbers.length > 0 && contacts.phoneNumbers.map(({ type, phoneNumber }: { type: string, phoneNumber: string }) => (
                    <ContactPhone key={phoneNumber} type={type} number={phoneNumber}/>
                ))}

                {contacts.emailAddresses.length > 0 && contacts.emailAddresses.map(({ emailAddress }: { emailAddress: string }) => (
                    <ContactEmail key={emailAddress} email={emailAddress} />
                ))}

                <CardItem>
                    <GlobeIcon width={24} height={24} />
                    <Link to={url}>Official National Parks Page</Link>
                </CardItem>

            </ContactCard>
        </StyledCardContainer>
    );
};

interface LoaderProps {
    thingsToDo: any[];
    camping: any[];
    events: any[];
    tours: any[];
    visitorCenters: any[];
    parking: any[];
}

const uniqueCategories = (categories: any) => {
    const unique = Array.from(new Set(categories.map((obj: any) => (obj.name || obj.title) ))).map(id => {
        return categories.find((obj: any) => obj.name === id || obj.title === id);
    });
    return unique
}

const ParkPage = () => {
    const parks = useContext(ParkContext);
    const { parkId } = useParams();

    const park = parks.find((park: any) => park.parkCode === parkId);
    const state = stateMap.filter((state) => park.addresses[0].stateCode.toLowerCase().includes(state.id))[0];

    const loaderData = useLoaderData() as LoaderProps;

    const activeCategories = Object.keys(activityCategories)
        .map((category) => ({
            ...activityCategories[category],
            count: loaderData[category as keyof LoaderProps].length,
            data: loaderData[category as keyof LoaderProps],
        }))
        .filter((c) => c.count > 0);


    return (
        <>
            <main>
                <div
                    className='container'
                    style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4em", margin: "2em auto" }}
                >
                    {/* LEFT COLUMN */}
                    <div className="content">
                        {/* HEADER */}
						<ParkHeader park={park} activeCategories={activeCategories}/>

                        <p className="section">{park.description}</p>

                        <ParkDirections park={park} />

                        <div className='section'>
                            <h3>Weather</h3>
                            <p className='mb-1'>{park.weatherInfo}</p>
                            <p>Weather API info</p>
                        </div>


                        {activeCategories.map((category) => (

                            <div className='section' key={category.name}
                                id={category.name.replaceAll(" ", "-").toLowerCase()}
                            >
                                <h3
                                    style={{display: 'flex', alignItems: 'center', gap: '0.25em' }}
                                    >
                                    {category.icon}
                                    <br/>
                                    <Link to={category.name.replaceAll(" ", "-").toLowerCase()}>
                                        {category.name}
                                    </Link>
                                </h3>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5em', marginTop: '0.5em'}}>

                                {uniqueCategories(category.data).map((data) => (
                                    <CategoryCard key={data.name || data.title} category={category.name} data={data} />
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* RIGHT COLUMN */}
                    <div style={{display: 'flex', flexDirection: 'column', gap: '2em'}}>

                        {parkId && <ParkAlert parkId={parkId} />}

                        <ContactInfo park={park} />

                        <FeeSection entranceFees={park.entranceFees} />

                    </div>

                </div>
            </main>
        </>
    );
};

export default ParkPage;

const ContactCard = styled(StyledCard).attrs(props => ({
	// we can define static props
	// $bg: props.theme.colors.secondary,
	$border: '2px solid ' + props.theme.colors.black,
	// $radius: props.theme.radius.md
}))`
	box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 8px;
    font-size: 1.2em;
    /* gap: 1em; */

    & > * {
        display: flex;
        align-items: center;
        gap: 0.5em;
    }
`;