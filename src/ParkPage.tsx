
import { Link, useNavigate, useParams } from "react-router-dom"
import ParkContext from "./hooks/ParkContext";
import { useContext, useEffect, useState } from "react";
import { stateMap } from "./data/stateMap";

import styled from 'styled-components';
import { parkVistors } from "./data/parkVisitors";
import { LeafletMap } from "./components/LeafletMap";
import { Dropdown } from "./components/Dropdown";

const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    background: #000;
    color: #fff;
    margin-bottom: 2rem;
    
    .container{
        display: flex;
        /* justify-content: flex-end; */
    }
    
    .content{
        width: 33%;
        padding-right: 2em;
        margin: auto auto 1em 1em;
        
        h1{
            font-size: 3em;
        }
    }
`;
    
const MapBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66%;
    height: 100%;
`;

const CardGrid = styled.div`
    /* width: 80%; */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    /* margin: 1rem; */
    .filters{
        grid-column: 1 / -1;
    }
    
    .dropdown-search{
        margin: 0 0 1em;
    }
    
`;


const Card = styled.div`
    color: #000;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    /* margin: 1rem; */
    /* width: 300px; */
    overflow: hidden;
    transition: all 0.3s ease-out;
    /* &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.26);
        transform: translateY(-5px);
    } */
    
    .btn, button{
        margin: auto 0 0 auto;
        color: #fff;
    }
    
    .img-container {
        width: 100%;
        height: 200px;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .card-content{
        padding: 1rem;
        /* height: 100%; */
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
    }
    h2 { line-height: 1.1;  min-height: 3em; }
    h2:hover {
        text-decoration: underline;
        /* height: 100%; */
        /* font-size: 1.5rem; */
        /* margin: 1rem 0; */
    }
    p {
        font-size: 1rem;
        margin: 0 0 1rem;
    }
`;

const TileGrid = styled.div`
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    &.row{
        flex-direction: row;
        flex-wrap: wrap;
    }
`;

const Tile = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5em;
    
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    background: #f9f9f9;
    color: #507743;
    font-weight: 700;
    font-size: 0.75em;
    padding: 0.5em 1em;
    cursor: pointer;
    &:not(.active):hover {
        background: #507743;
        color: #fff;
    }
    &.active {
        background: #507743;
        color: #fff;
        & svg:hover{
            fill: #507743;
            background: #fff;
            border-radius: 50%;
        }
    }
`;
    
interface FilterProps {
    activities: string[];
}

export const ParkPage = () => {
    const parks = useContext(ParkContext);
    const { parkId } = useParams();
    const navigate = useNavigate();
    
    // const [ filters, setFilters ] = useState<FilterProps>({ activities: []});
    // const [ defaultParks, setDefaultParks] = useState(parks.filter((park: any) => park.states.toLowerCase().includes(stateId)));
    const [ activePark, setActivePark] = useState(parks.find((park: any) => park.parkCode === parkId));
    // const [ loadMore, setLoadMore] = useState(0);
    
    console.log('activePark', activePark)
    
    // Look into useMemo for these
    const state = stateMap.filter(state => activePark.states.toLowerCase().includes(state.id))[0];
    // const parkCount = activeParks.length;
    
    //  Compare parks with visitor data and return the park code
    const parkCodes = parkVistors.map((park: any) => park.parkCode);
    const visitorCodes = parkVistors.map((park: any) => park.parkCode);
    // console.log('length', parkCodes.length, visitorCodes.length);
    
    const matchingCodes = parkCodes.filter(code => visitorCodes.includes(code));
    console.log('matchingCodes', matchingCodes);
    
    // const parkCodes = parkVistors.map((park: any) => park.parkCode);
    console.log('codes', parkCodes, parkId, parkCodes.includes(parkId?.toUpperCase()));
    const visitors = parkVistors.filter(park => park.parkCode === parkId?.toUpperCase());
    
    
    const visitCount = visitors[0].visitors;
    
    
    // Reduce the park activities into an object with the activity name as the key and the count as the value
    // const parkActivities = defaultParks.reduce((acc: any, park: any) => {
    //     park.activities.forEach((activity: any) => {
    //         if(acc[activity.name]){
    //             acc[activity.name] += 1;
    //         } else {
    //             acc[activity.name] = 1;
    //         }
    //     })
    //     return acc;
    // }, {});
    
    // Sort Park Activities by with the most common first
    // const sortedParkActivities = Object.keys(parkActivities).sort((a: any, b: any) => parkActivities[b] - parkActivities[a]);
    
    
    // useEffect(() => {
    //     const newParkList = parks.filter((park: any) => park.states.toLowerCase().includes(stateId));
    //     setDefaultParks(newParkList);
    //     setActiveParks(newParkList);
        
    //     setLoadMore(0);
    // }, [stateId]);
    
    // const handleParkSelect = (park:any) => {
    //   navigate(`/park/${park}`)
    // }
    
    // const toggleFilter = (filter: string) => {
    //     let newActivites = [...filters.activities];
    //     if(filters.activities.includes(filter)){
    //         newActivites = filters.activities.filter((activity: string) => activity !== filter);
    //     } else {
    //         newActivites.push(filter);
    //     }
    //     setFilters({ ...filters, activities: newActivites });
        
        
    //     if (newActivites.length <= 0) {
    //         setActiveParks(defaultParks);
    //     } else {
    //         const compareStr = newActivites.join(', ');
    //         // Filter through parks
    //         const filteredParks = activeParks.filter((park: any) => {
    //             // Filter though activites
    //             return park.activities.filter((activity: any) => compareStr.includes(activity.name)).length > 0;
    //         });
    //         setActiveParks(filteredParks);
    //     }
    // }
    
    
    return (
        <>
            <Header>
                <div className="container">
                    <div className="content">
                        <h1>{activePark.fullName}</h1>
                        <h2>{state.name}</h2>
                        <p><strong>{visitCount}+</strong> visitors in 2022</p>
                    </div>
                    <MapBox>
                        <LeafletMap 
                        state={state} 
                        parkCoords={[{ longitude: activePark.longitude, latitude: activePark.latitude, name: activePark.fullName }]}
                        />
                    </MapBox>
                </div>
            </Header>
            
        </>
    )
}