import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import ParkContext from "../utils/hooks/ParkContext";
import { MainGrid, StyledSidebar } from "./Park/components/StyledParkComponents";
import { Loader } from "../components/Loader";
import { CardItem, StyledCard, StyledCardContainer } from "../components/styled/StyledCard";
import { GlobeIcon } from "../assets/icons";
import { ContactItem } from "./Park/Sidebar";
// import { ParkHeader } from "./Park";

const ThingsToDo = () => {
    const park = useContext(ParkContext);
    // const [thingsToDo, setThingsToDo] = useState<any[]>([]);
    const {thingsToDo} = useLoaderData() as {thingsToDo: any[]};

    // useEffect(() => {
    //     // fetch things to do
    //     const fetchCall = async () => {
    //         const response = await fetch(
    //             `https://developer.nps.gov/api/v1/thingstodo?parkCode=${park.parkCode}&api_key=${
    //                 import.meta.env.VITE_NPS_API_KEY
    //             }`
    //         );
    //         const data = await response.json();
    //         setThingsToDo(data.data);
    //     };
    //     fetchCall();
    //     // setThingsToDo
    // }, []);

    // TODO : Change this to error page
    if (thingsToDo.length <= 0) return <Loader val={"things to do"} />;

    // console.log("thingsToDo", thingsToDo);

    return (
        <>
            <h1 className='container'>Things to do</h1>
            {thingsToDo.map((activity) => (
                <TTDSection activity={activity} key={activity.id} />
            ))}
        </>
    );
};

export default ThingsToDo;

const TTDSection = ({ activity }: { activity: any }) => {
    return (
        <MainGrid id={activity.title.replaceAll(" ", "-").toLowerCase()}>
            <div className='content'>
                <div className='section'>
                    <h2>{activity.title}</h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5em 0.25em", marginTop: "0.5em" }}>
                        {activity.tags.map((tag: string) => (
                            <small
                                key={tag}
                                style={{
                                    backgroundColor: "#f1f1f1",
                                    textTransform: "capitalize",
                                    padding: "0.25em 0.75em",
                                    borderRadius: "1em",
                                }}
                            >
                                {tag}
                            </small>
                        ))}
                    </div>
                </div>
                <div className='section'>
                    <p className='bold'>{activity.duration}</p>
                    <p>{activity.shortDescription}</p>
                    {activity.doFeesApply !== "true" && (
                        <small>
                            <span className='bold'>Fees:</span>{" "}
                            {activity.feeDescription.length > 0
                                ? activity.feeDescription
                                : "Fees apply to access " + activity.title}
                        </small>
                    )}
                </div>
                {activity.doFeesApply === "true" && (
                    <div className='section'>
                        <h3>Fees</h3>
                        <p>{activity.feeDescription}</p>
                    </div>
                )}
                {activity.isReservationRequired === "true" && (
                    <div className='section'>
                        <h3>Reservation</h3>
                        <p>{activity.reservationDescription}</p>
                    </div>
                )}
                {activity.accessibilityInformation.length > 0 && (
                    <div className='section'>
                        <h3>Accessibility</h3>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: activity.accessibilityInformation
                                    .replaceAll("<br /><br />", "</p><p>")
                                    .replaceAll("<p>&nbsp;</p>", ""),
                            }}
                        />
                    </div>
                )}
                <div className='section'>
                    <h3>Pets</h3>
                    <p>
                        Pets <span className='bold'>are {activity.arePetsPermitted === "false" ? "not " : ""}</span>
                        allowed
                    </p>
                    <p>{activity.petsDescription}</p>
                </div>
                <div className='section'>
                    <ContactItem>
                        <GlobeIcon width={24} height={24} />
                        <Link to={activity.url}>Official National Parks Page</Link>
                    </ContactItem>
                </div>
            </div>
            <StyledSidebar>
                <StyledCard className='img-container'>
                    <img src={activity.images[0].url} alt={activity.images[0].altText} />
                </StyledCard>
                <StyledCardContainer>
                    <h2>Seasons</h2>
                    <StyledCard>
                        <CardItem style={{ display: "flex", justifyContent: "space-between" }}>
                            {activity.season.map((s: any) => (
                                <span key={s} className='bold'>
                                    {s}
                                </span>
                            ))}
                        </CardItem>
                        {activity.seasonDescription && <CardItem>{activity.seasonDescription}</CardItem>}
                    </StyledCard>
                </StyledCardContainer>

                <StyledCardContainer>
                    <h2>Location</h2>
                    <StyledCard>
                        <CardItem>
                            <p className='bold'>{activity.location}</p>
                            <p>{activity.locationDescription}</p>
                        </CardItem>
                        <CardItem>
                            <h4>Coordinates</h4>
                            <p>
                                <a
                                    target='_blank'
                                    href={`https://www.google.com/maps/search/?api=1&query=${activity.latitude},${activity.longitude}`}
                                >
                                    Latitude: {activity.latitude.slice(0, 8)}, Longitude{" "}
                                    {activity.longitude.slice(0, 8)}
                                </a>
                            </p>
                        </CardItem>
                    </StyledCard>
                </StyledCardContainer>
            </StyledSidebar>
        </MainGrid>
    );
};
