import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CardItem, StyledCard, StyledCardContainer } from "../../components/styled/StyledCard";
import { MainGrid, StyledSidebar } from "./components/StyledParkComponents";
import { ContactEmail, ContactItem, ContactPhone, StyledContactCard } from "./Sidebar";

import ParkContext from "../../utils/hooks/ParkContext";
import { fetcher } from "../../utils/helper";
import { GlobeIcon } from "../../assets/icons";
import { Loader } from "../../components/Loader";

const Events = () => {
    const park = useContext(ParkContext);
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        // replace with localFetch()
        fetcher(`events?parkCode=${park.parkCode}`).then((data) => setEvents(data));
    }, []);

    if (events.length <= 0) {
        return <Loader val={"Events"} />;
    }

    return (
        <>
            <h1 className='container'>Events</h1>
            {events.map((event: any) => (
                <EventSection key={event.title} event={event} />
            ))}
        </>
    );
};

const EventSection = ({ event }: any) => {
    const date = new Date(event.date.replace(/-/g, "/")).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const times = event.times.map((t: any, i: number) => (
        <span key={"time" + i}>
            {i !== 0 && "|"} {t.timestart.indexOf(0) === 0 ? t.timestart.slice(1) : t.timestart}
        </span>
    ));

    const image = event.images.length > 0 && (
        <StyledCard className='img-container'>
            <img src={"https://www.nps.gov" + event.images[0].url} alt={event.images[0].altText} />
        </StyledCard>
    );

    console.log("events", event);

    return (
        <MainGrid>
            <div className='content'>
                <div className='section'>
                    <h2>{event.title}</h2>
                    {event.location && <p className='bold'>{event.location}</p>}
                    <p className='bold'>
                        {date} @ {times}
                    </p>
                </div>
                <div
                    className='section'
                    dangerouslySetInnerHTML={{
                        __html: event.description.replaceAll("<br /><br />", "</p><p>").replaceAll("<p>&nbsp;</p>", ""),
                    }}
                />
            </div>

            <StyledSidebar>
                {image}
                <StyledCardContainer id='contact'>
                    {/* <h2>Contact</h2> */}
                    <StyledContactCard>
                        {event.feeInfo && <CardItem>{event.feeInfo}</CardItem>}
                        <CardItem>
                            {event.isregresrequired === "true" ? (
                                event.regresinfo || <span className='bold'>Registration required</span>
                            ) : (
                                <>
                                    <b>NO</b> registration required
                                </>
                            )}
                            {event.regresurl && (
                                <p>
                                    Register at <Link to={event.regresurl}>Here</Link>
                                </p>
                            )}
                            <p>Contact {event.contactname || "the park"} for more info</p>
                        </CardItem>

                        <ContactEmail email={event.contactemailaddress} />
                        <ContactPhone type='cell' number={event.contacttelephonenumber} />
                        <ContactItem>
                            <GlobeIcon width={24} height={24} />
                            <Link to={event.infourl}>Official NPS Page</Link>
                        </ContactItem>
                    </StyledContactCard>
                </StyledCardContainer>
            </StyledSidebar>
        </MainGrid>
    );
};

export default Events;
