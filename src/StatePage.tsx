import { Link, useParams } from "react-router-dom"
import ParkContext from "./ParkContext";
import { useContext } from "react";
import { stateMap } from "./data/stateMap";

import styled from 'styled-components';
import { parkVistors } from "./data/parkVisitors";
import { LeafletMap } from "./components/LeafletMap";

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
        width: 25%;
        margin: auto;
    }
`;
    
const MapBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
    grid-gap: 2rem;
    /* margin: 1rem; */
`;


const Card = styled.div`
    display: flex;
    flex-direction: column;
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

export const StatePage = () => {
    const { stateId } = useParams();
    const state = stateMap.filter(state => state.id === stateId)[0];
    const parks = useContext(ParkContext);
    // console.log('parks', parks);
    
    // Cache unless url changes
    
    const activeParks = parks.filter((park: any) => park.states.toLowerCase().includes(stateId));
    const parkCount = activeParks.length;
    const visitCount = parkVistors.filter(park => park.state === state.name).reduce((acc: number, park: any) => acc + park.visitors, 0);
    
    return (
        <>
            <Header>
                <div className="container">
                    <div className="content">
                        <h1>{state.name}</h1>
                        <p><strong>{parkCount}</strong> National Parks Locations</p>
                        <p>Over <strong>{visitCount}</strong> visitors in 2022</p>
                    </div>
                    <MapBox>
                        <LeafletMap 
                        state={state} 
                        parkCoords={activeParks.map(park => ({ longitude: park.longitude, latitude: park.latitude, name: park.fullName }))}
                        />
                    </MapBox>
                </div>
            </Header>
            
            <CardGrid className="container">
                {/* A Grid of Cards with an image park name and description */}
                {activeParks.map((park: any) => (
                    <Card key={park.parkCode}>
                        <div className="img-container">
                            <img src={park.images[0].url} alt={park.images[0].altText } />
                        </div>
                        <div className="card-content">
                            <Link to={`/park/${park.parkCode}`}>
                                <h2>{park.fullName}</h2>
                            </Link>
                            <p>{park.description}</p>
                            <Link className="btn" to={`/park/${park.parkCode}`}>
                                <button>View Park</button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </CardGrid>
        
        </>
    )
}