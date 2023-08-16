import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ParkContext from "../../utils/hooks/ParkContext";
import { stateMap } from "../../utils/lib/stateMap";
// import { ParkHeader } from "./Park";

const Tours = () => {
    const {parkId} = useParams();
    const parks = useContext(ParkContext);
    const park = parks.find((park: any) => park.parkCode === parkId);
    const state = stateMap.filter(state => park.states.toLowerCase().includes(state.id))[0];

    const [tours, setTours] = useState<any[]>([]);

    useEffect(() => {
        // fetch tours
        const fetchCall = async () => {
            const response = await fetch(`https://developer.nps.gov/api/v1/tours?parkCode=${parkId}&api_key=${import.meta.env.VITE_NPS_API_KEY}`);
            const data = await response.json();
            setTours(data.data);
        }
        fetchCall();
        // settours
    }, []);

    console.log('tours', tours);
    return (
        <>
            <div className="container">
                <h1>Tours</h1>
                {tours.length > 0 &&
                    tours.map((thing: any) => (
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

export default Tours;