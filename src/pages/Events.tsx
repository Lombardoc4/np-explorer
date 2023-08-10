import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header"
import ParkContext from "../utils/hooks/ParkContext";
import { stateMap } from "../utils/lib/stateMap";
// import { ParkHeader } from "./Park";

const Events = () => {
    const {parkId} = useParams();
    const parks = useContext(ParkContext);
    const park = parks.find((park: any) => park.parkCode === parkId);
    const state = stateMap.filter(state => park.states.toLowerCase().includes(state.id))[0];

    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        // fetch events
        const fetchCall = async () => {
            const response = await fetch(`https://developer.nps.gov/api/v1/events?parkCode=${parkId}&api_key=${import.meta.env.VITE_NPS_API_KEY}`);
            const data = await response.json();
            setEvents(data.data);
        }
        fetchCall();
        // setevents
    }, []);

    console.log('events', events);
    return (
        <>
            <div className="container">
                <h1>Events</h1>
                {events.length > 0 &&
                    events.map((thing: any) => (
                        <div key={thing.id}>
                            <h2>{thing.title}</h2>
                            <p>{thing.shortDescription}</p>
                            <p>{thing.url}</p>
                            </div>
                        ))
                }
            </div>
        </>
    )
}

export default Events;