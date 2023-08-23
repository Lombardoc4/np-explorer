import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ParkContext from "../../utils/hooks/ParkContext";
import { stateMap } from "../../utils/lib/stateMap";
import { SymbolMap } from "../../utils/lib/symbolMap";
import { fetcher } from "../../utils/helper";
import { scrollToHash } from "../../utils/scrollToHash";
import { MainGrid } from "../../components/styled/MainGrid";
import { ContactCard } from "./Sidebar";
import { StyledSidebar } from "./components/StyledParkComponents";
import { DirectionSection } from "./components";
import { CardItem, StyledCard, StyledCardContainer } from "../../components/styled/StyledCard";

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const getOperatingHours = (operatingHours: any) => {
    const { standardHours } = operatingHours;

    // See if all days values match
    if (
        standardHours[daysOfWeek[0]] === standardHours[daysOfWeek[1]] &&
        standardHours[daysOfWeek[1]] === standardHours[daysOfWeek[2]] &&
        standardHours[daysOfWeek[2]] === standardHours[daysOfWeek[3]] &&
        standardHours[daysOfWeek[3]] === standardHours[daysOfWeek[4]] &&
        standardHours[daysOfWeek[4]] === standardHours[daysOfWeek[5]] &&
        standardHours[daysOfWeek[5]] === standardHours[daysOfWeek[6]]
    ) {
        return (
            <p>
                <span style={{ textTransform: "capitalize" }}>Monday - Sunday</span>: {standardHours[daysOfWeek[0]]}
            </p>
        );
    }

    // See if monday - friday values match
    if (
        standardHours[daysOfWeek[0]] === standardHours[daysOfWeek[1]] &&
        standardHours[daysOfWeek[1]] === standardHours[daysOfWeek[2]] &&
        standardHours[daysOfWeek[2]] === standardHours[daysOfWeek[3]] &&
        standardHours[daysOfWeek[3]] === standardHours[daysOfWeek[4]]
    ) {
        return (
            <>
                <p>
                    <span style={{ textTransform: "capitalize" }}>Monday - Friday</span>: {standardHours[daysOfWeek[0]]}
                </p>
                <p>
                    <span style={{ textTransform: "capitalize" }}>saturday</span>:{" "}
                    {operatingHours.standardHours["saturday"]}
                </p>
                <p>
                    <span style={{ textTransform: "capitalize" }}>sunday</span>:{" "}
                    {operatingHours.standardHours["sunday"]}
                </p>
            </>
        );
    }

    return daysOfWeek.map((day: string) => {
        if (operatingHours.standardHours[day] !== "") {
            return (
                <p>
                    <span style={{ textTransform: "capitalize" }}>{day}</span>: {operatingHours.standardHours[day]}
                </p>
            );
        }
    });
};

const VisitorCenters = () => {
    const { parkId } = useParams();
    const park = useContext(ParkContext);
    const state = stateMap.filter((state) => park.states.includes(state.id.toUpperCase()))[0];

    const [visitorCenters, setVisitorCenters] = useState<any[]>([]);
    // const visitorCenters = useLoaderData();
    // const { data: visitorCenters } = useLocation();

    useEffect(() => {
        // Scroll to hash

        // fetch visitorCenters
        fetcher(`visitorcenters?parkCode=${parkId}`).then((data) => setVisitorCenters(data));
        // const fetchCall = async () => {
        //     const response = await fetch(`https://developer.nps.gov/api/v1/visitorcenters?parkCode=${parkId}&api_key=${import.meta.env.VITE_NPS_API_KEY}`);
        //     const data = await response.json();
        //     setVisitorCenters(data.data);
        // }
        // fetchCall();
        // setvisitorCenters
    }, []);

    useEffect(() => {
        scrollToHash();
    }, [visitorCenters]);

    //     const testImageSource = (url: string) => {
    //         let imageFound = false;
    //         var tester=new Image();
    //         tester.onload=() => {imageFound=true};
    //         tester.src= url;

    //         return imageFound;
    // }
    if (visitorCenters.length < 0) return <>Loading..???</>;

    return (
        <>
            <div style={{ gridColumn: "1 / -1", marginBottom: "1em" }}>
                <Link className='btn' to={`/park/${park.parkCode}`}>
                    Back to {park.name}
                </Link>
            </div>
            <h1>Visitor Centers</h1>

            {visitorCenters.map((vc: any) => (
                <div key={vc.id} id={vc.name.replaceAll(" ", "-").toLowerCase()}>
                    <MainGrid>
                        <div className='content'>
                            <div className='section'>
                                <div style={{ display: "flex", gap: "1em", alignItems: "center" }}>
                                    {vc.isPassportStampLocation === "1" && (
                                        <img
                                            title='Passport Stamp'
                                            src='/passport-book.webp'
                                            alt='Passport Stamp'
                                            style={{ height: "30px" }}
                                        />
                                    )}
                                    <h2>{vc.name}</h2>
                                </div>
                                <p>{vc.description}</p>
                            </div>
                                {vc.amenities.length > 0 && (
                                <div className='section'>
                                    <h3 style={{ gridColumn: "1 / -1" }}>Amenities</h3>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1em", padding: '1em' }}>
                                        {vc.amenities.map((amenity: any) => (
                                            <div
                                            style={{ display: "flex", alignItems: "center", gap: "1em", }}
                                            key={amenity}
                                            >
                                                <img
                                                    width={32}
                                                    height={32}
                                                    src={`https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/${SymbolMap[amenity]}-black-22.svg`}
                                                    />{" "}
                                                <p className='bold'>{amenity}</p>
                                            </div>
                                        ))}
                                    </div>
                            </div>
                                )}

                            <DirectionSection park={vc}/>

                        </div>

                        <StyledSidebar>
                            {vc.images.length > 0 && (
                                // testImageSource(vc.images[0].url)) &&
                                <StyledCard>

                                <div className='img-container'>
                                    <img src={vc.images[0].url} alt={vc.images[0].altText} />
                                </div>
                                </StyledCard>
                            )}
                            <StyledCardContainer>
                                <h2>Hours</h2>
                                <StyledCard>
                                    {vc.operatingHours.map((operatingHours: any) => <CardItem>{getOperatingHours(operatingHours)}</CardItem>)}
                                    <CardItem>{vc.operatingHours[0].description}</CardItem>
                                </StyledCard>
                            </StyledCardContainer>
                            <ContactCard contacts={vc.contacts} url={vc.url} />
                        </StyledSidebar>
                    </MainGrid>
                </div>
            ))}
        </>
    );
};

export default VisitorCenters;
