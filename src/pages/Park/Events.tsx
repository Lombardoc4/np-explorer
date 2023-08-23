import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ParkContext from "../../utils/hooks/ParkContext";
import { stateMap } from "../../utils/lib/stateMap";
import { fetcher } from "../../utils/helper";
import { MainGrid } from "../../components/styled/MainGrid";
import { StyledCard } from "../../components/styled/StyledCard";
import { StyledSidebar } from "./components/StyledParkComponents";
// import { ParkHeader } from "./Park";

const Events = () => {
    const { parkId } = useParams();
    const park = useContext(ParkContext);
    const states = stateMap.filter((state) => park.states.includes(state.id.toUpperCase()));

    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        // fetch events
        fetcher(`events?parkCode=${parkId}`).then((data) => setEvents(data));
        // const fetchCall = async () => {
        //     const response = await fetch(`https://developer.nps.gov/api/v1/events?parkCode=${parkId}&api_key=${import.meta.env.VITE_NPS_API_KEY}`);
        //     const data = await response.json();
        //     setEvents(data.data);
        // }
        // fetchCall();
        // setevents
    }, []);

    if (!events) {
        return <>Loading events</>;
    }

    console.log("events", events);

    return (
        <>
            <h1>Events</h1>
            {events.map((thing: any) => (
                <div key={thing.id}>
                    <MainGrid>
                        <div className="content">
                            <div className="section">

                                <h2>{thing.title}</h2>
                                <p className="bold">
                                    {thing.location && <>{thing.location}<br/></>}
                                    {new Date(thing.date.replace(/-/g, "/")).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })} @ {thing.times.map((t: any, i: number) => <span>{i !== 0 && '|'} {t.timestart.indexOf(0) === 0 ? t.timestart.slice(1) : t.timestart}</span>)}</p>
                            </div>
                            <div className="section"
                                dangerouslySetInnerHTML={{
                                    __html: thing.description.replaceAll("<br /><br />", "</p><p>").replaceAll('<p>&nbsp;</p>', '')
                                }}
                            />
                        </div>
                        <StyledSidebar>
                            {thing.images.length > 0 && (
                                // testImageSource(vc.images[0].url)) &&
                                <StyledCard>
                                    <div className='img-container'>
                                        <img
                                            src={"https://www.nps.gov" + thing.images[0].url}
                                            alt={thing.images[0].altText}
                                        />
                                    </div>
                                </StyledCard>
                            )}

                            <StyledCard>
                                {/* ! CONTACT CARD */}
                                {thing.feeInfo && <p>{thing.feeInfo}</p>}
                                <p>{thing.isregresrequired ? ( thing.regresinfo || 'Registration required') : 'No registration required'}</p>
                                {thing.regresurl && <p>Register at <Link to={thing.regresurl}>Here</Link></p>}
                                <p>
                                    Contact {thing.contactname || 'the park'} for more info
                                    <br/>
                                    <a href={"mailto:" + thing.contactemailaddress}>{thing.contactemailaddress}</a>
                                    <br/>
                                    {thing.contacttelephonenumber}
                                </p>
                                <p>{thing.infourl}</p>
                            </StyledCard>
                        </StyledSidebar>
                    </MainGrid>
                </div>
            ))}
        </>
    );
};

export default Events;
