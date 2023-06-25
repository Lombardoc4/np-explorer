import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header"
import ParkContext from "../utils/hooks/ParkContext";
import { stateMap } from "../utils/data/stateMap";
import { ParkHeader } from "./Park";

const Parking = () => {
    const {parkId} = useParams();
    const parks = useContext(ParkContext);  
    const park = parks.find((park: any) => park.parkCode === parkId);
    const state = stateMap.filter(state => park.states.toLowerCase().includes(state.id))[0];
    
    const [parking, setParking] = useState<any[]>([]);
    
    useEffect(() => {
        // fetch parking
        const fetchCall = async () => {
            const response = await fetch(`https://developer.nps.gov/api/v1/parkinglots?parkCode=${parkId}&api_key=${import.meta.env.VITE_NPS_API_KEY}`);
            const data = await response.json();
            setParking(data.data);
        }
        fetchCall();
        // setparking
    }, []);
    
    console.log('parking', parking);
    return (
        <>
            <div className="container">
                <h1>Parking</h1>
                {parking.length > 0 &&
                    parking.map((thing: any) => (
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

export default Parking;