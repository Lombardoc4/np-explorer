import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header"
import ParkContext from "../utils/hooks/ParkContext";
import { stateMap } from "../utils/lib/stateMap";

const Camping = () => {
    const {parkId} = useParams();
    const parks = useContext(ParkContext);
    const park = parks.find((park: any) => park.parkCode === parkId);
    const state = stateMap.filter(state => park.states.toLowerCase().includes(state.id))[0];

    const [camping, setCamping] = useState<any[]>([]);

    if (!park || !parkId) return null;

    useEffect(() => {
        // fetch camping
        // fetchApi('campgrounds', `parkCode=${parkId}`).then((data: any) => {
            // setcamping
            // setCamping(data);
        // });
    }, []);

    console.log('camping', camping);
    return (
        <>
            <div className="container">
                <h1>Camping</h1>
                {camping.length > 0 &&
                    camping.map((thing: any) => (
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

export default Camping;