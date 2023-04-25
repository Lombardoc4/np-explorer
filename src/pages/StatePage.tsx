import { Link, useNavigate, useParams } from "react-router-dom"
import ParkContext from "../hooks/ParkContext";
import { useContext, useEffect, useState } from "react";
import { stateMap } from "../data/stateMap";

import styled from 'styled-components';
import { parkVistors } from "../data/parkVisitors";
import { LeafletMap } from "../components/LeafletMap";
import { Dropdown } from "../components/Dropdown";

const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    /* background: rgb(80, 119, 67); */
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
            font-size: 5em;
        }
        p{ font-size: 1.25em }
    }
`;
    
const MapBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 67%;
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

export const StatePage = () => {
    const parks = useContext(ParkContext);
    const { stateId } = useParams();
    const navigate = useNavigate();
    const [ filters, setFilters ] = useState<FilterProps>({ activities: []});
    const [ defaultParks, setDefaultParks] = useState(parks.filter((park: any) => park.states.toLowerCase().includes(stateId)));
    const [ activeParks, setActiveParks] = useState(parks.filter((park: any) => park.states.toLowerCase().includes(stateId)));
    const [ loadMore, setLoadMore] = useState(0);
    
    
    // Look into useMemo for these
    const state = stateMap.filter(state => state.id === stateId)[0];
    const parkCount = activeParks.length;
    const visitCount = parkVistors.filter(park => park.state === state.name).reduce((acc: number, park: any) => acc + park.visitors, 0);
    
    
    // Reduce the park activities into an object with the activity name as the key and the count as the value
    const parkActivities = defaultParks.reduce((acc: any, park: any) => {
        park.activities.forEach((activity: any) => {
            if(acc[activity.name]){
                acc[activity.name] += 1;
            } else {
                acc[activity.name] = 1;
            }
        })
        return acc;
    }, {});
    
    // Sort Park Activities by with the most common first
    const sortedParkActivities = Object.keys(parkActivities).sort((a: any, b: any) => parkActivities[b] - parkActivities[a]);
    
    
    useEffect(() => {
        const newParkList = parks.filter((park: any) => park.states.toLowerCase().includes(stateId));
        setDefaultParks(newParkList);
        setActiveParks(newParkList);
        
        setLoadMore(0);
    }, [stateId]);
    
    const handleParkSelect = (park:any) => {
      navigate(`/park/${park}`)
    }
    
    const toggleFilter = (filter: string) => {
        let newActivites = [...filters.activities];
        if(filters.activities.includes(filter)){
            newActivites = filters.activities.filter((activity: string) => activity !== filter);
        } else {
            newActivites.push(filter);
        }
        setFilters({ ...filters, activities: newActivites });
        
        
        if (newActivites.length <= 0) {
            setActiveParks(defaultParks);
        } else {
            const compareStr = newActivites.join(', ');
            // Filter through parks
            const filteredParks = activeParks.filter((park: any) => {
                // Filter though activites
                return park.activities.filter((activity: any) => compareStr.includes(activity.name)).length > 0;
            });
            setActiveParks(filteredParks);
        }
    }
    
    
    return (
        <>
            <Header>
                <div className="container">
                    <div className="content">
                        <h1>{state.name}</h1>
                        <p><strong>{parkCount}</strong> National Parks with <strong>{visitCount}+</strong>&nbsp;visitors in 2022</p>
                    </div>
                    <MapBox>
                        <LeafletMap 
                        state={state} 
                        parkCoords={activeParks.map(park => ({ longitude: park.longitude, latitude: park.latitude, name: park.fullName }))}
                        />
                    </MapBox>
                </div>
            </Header>
            
            <div className="container" style={{display:'grid', gap: '2em', gridTemplateColumns: '250px auto', alignItems: 'flex-start'}}>
                <Card>
                    <div className="card-content">
                        <h3>Activities</h3>
                        <TileGrid>
                            {/* Get most present activites and add load more button */}
                            {sortedParkActivities.map((activity: string, i) => {
                                if (i < (10 + 10 * loadMore)) {
                                    if (filters.activities.includes(activity)) {
                                        return (
                                        <Tile className="active" key={activity}>{activity}
                                            <svg onClick={() => toggleFilter(activity)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </Tile>
                                        )
                                    }
                                    return <Tile onClick={() => toggleFilter(activity)} key={activity}>{activity}</Tile>
                                }
                            })}
                            
                            {sortedParkActivities.length > 10 && (
                                <Tile onClick={() => setLoadMore(loadMore + 1)} key="load-more">Load More</Tile>
                            )}
                        </TileGrid>
                    </div>
                </Card>
                <CardGrid >
                    {/* Grid Header */}
                    <div className="filters">
                        <Dropdown
                        placeholder={`Find a park in ${state.name}`}
                        options={activeParks.map((park) => ({value: park.parkCode, title: park.fullName}))}
                        // options={Array(5).fill('6').map((_, i) => ({value: i + '', title: `Option ${i}`}))}
                        onSelect={(option) => handleParkSelect(option)}
                        />
                        
                        <TileGrid className="row">
                            Filters: 
                            {filters.activities.length <= 0 && <p style={{color: '#ababab', fontStyle: 'italic'}}>No Filters</p>}
                            {filters.activities.length > 0 && filters.activities.map((activity: string) => (
                            <Tile className="active" key={activity}>{activity}
                                <svg onClick={() => toggleFilter(activity)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </Tile>
                            ))}
                        </TileGrid>
                    </div>
                    {/* A Grid of Cards with an image park name and description */}
                    {activeParks.map((park: any) => (
                        <Card key={park.parkCode}>
                            <Link className="img-container" to={`/park/${park.parkCode}`}>
                                <img src={park.images[0].url} alt={park.images[0].altText } />
                            </Link>
                            <div className="card-content">
                                <Link to={`/park/${park.parkCode}`}>
                                    <h2>{park.fullName}</h2>
                                </Link>
                                <p>{park.description}</p>
                            </div>
                        </Card>
                    ))}
                </CardGrid>
            </div>
        </>
    )
}
