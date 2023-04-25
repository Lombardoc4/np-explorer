
import { Link, useNavigate, useParams } from "react-router-dom"
import ParkContext from "../hooks/ParkContext";
import { useContext, useEffect, useState, Fragment, useRef, useMemo } from "react";
import { stateMap } from "../data/stateMap";

import styled from 'styled-components';
import { parkVistors } from "../data/parkVisitors";
import { LeafletMap } from "../components/LeafletMap";
import { Dropdown } from "../components/Dropdown";
import { ParkAlert } from "../components/ParkAlert";

const DetailCategories = [
    { name: 'Things to do', id: 'thingstodo' },
    { name: 'Amenities', id: 'amenities/parksplaces' },
    { name: 'Camping', id: 'campgrounds' },
    { name: 'Events', id: 'events' },
    { name: 'Tours', id: 'tours' },
    { name: 'Visitor Centers', id: 'visitorcenters' },
    { name: 'Parking Lots', 'id': 'parkinglots'},
    { name: 'News Releases', id: 'newsreleases' },
]

const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    background: #000;
    color: #fff;
    /* margin-bottom: 2rem; */
    
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
        h2{ font-size: 2em; font-style: italic; }
    }
`;
    
const MapBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66%;
    height: 100%;
`;

const DescriptionBox = styled.div`
    /* background: #f9f9f9; */
    color: #000;
    padding: 2em 1em;
        display: flex;
        gap: 1em;
`;

const InfoBox = styled.div`
    width: 50%;
    padding: 1em;
    
    p{ margin-bottom: 1em; }
    
    .fees {
        margin-bottom: 1em;
        p{
            margin: 0;
        }
    }
`;

const ImgGrid = styled.div`
    padding: 1em;
    background-color: #f9f9f9;
    
    .container{
        position: relative;
        display: flex;
        flex-wrap: no-wrap;
        overflow: hidden;
        gap: 0.5em;
    }
    
    .img-container{
        min-width: 300px;
        max-width: 25%;
        overflow: hidden;
    }
    
    .overlay{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.3s 0.3s ease-out;
        opacity: 0;
        &:hover{
            opacity: 1;
            transition: opacity 0.3s ease-out;
            
        }
            
    }
`;


        
const DetailGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5em;
    padding: 1em;
    
    .detailCard{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1em;
        text-transform: uppercase;
        height: 100%;
        background-color: #f9f9f9;
        border-radius: 5px;
        box-shadow: rgba(80, 119, 67, 0.26) 0px 2px 8px;
        overflow: hidden;
        transition: all 0.3s ease-out 0s;
        background-color: rgb(80, 119, 67);
        color: #f9f9f9;
        &:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.26);
            transform: translateY(-3px);
        }
        
    }
`;

const ActionButtons = () => {
    return (
        <DetailGrid>
            {
                DetailCategories.map((category: any) => (
                    // On Click of each button, navigate to the detail page
                    <div key={category.name} className="detailCard">
                        <svg xmlns="http://www.w3.org/2000/svg" width="76" height="76" fill="currentColor" className="bi bi-balloon" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 9.984C10.403 9.506 12 7.48 12 5a4 4 0 0 0-8 0c0 2.48 1.597 4.506 4 4.984ZM13 5c0 2.837-1.789 5.227-4.52 5.901l.244.487a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3.177 3.177 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.244-.487C4.789 10.227 3 7.837 3 5a5 5 0 0 1 10 0Zm-6.938-.495a2.003 2.003 0 0 1 1.443-1.443C7.773 2.994 8 2.776 8 2.5c0-.276-.226-.504-.498-.459a3.003 3.003 0 0 0-2.46 2.461c-.046.272.182.498.458.498s.494-.227.562-.495Z"/>
                        </svg>
                        <h3>{category.name}</h3>
                    </div>
                ))
            }       
        </DetailGrid>
    )
}

const MainDescription = ({ park }: any) => {
    return (
        <InfoBox>
            <p>{park.description}</p>  
            <p>{park.weatherInfo}</p>
            <div className="fees">
                <h3>Fees</h3>
                {park.entranceFees.map((fee: any) => (
                    <p key={fee.title}>
                        <b>${fee.cost}</b> - {fee.title} <br/>
                        <i>{fee.description}</i>
                    </p>
                ))}
            </div>
            <div className="directions"> 
                <h3>Directions</h3>
                <p>
                    <b>Coordinates</b>: {park.latitude}, {park.longitude}<br/>
                    {park.directionsInfo}
                    <br/>
                </p>
                <Link to={park.directionsUrl}>Nation Park Directions</Link>
            </div>
            <Link to={park.url}>National Parks Page</Link>
            
        </InfoBox>
    )
}

const ImageGrid = ({ images }: any) => {
    return (
        <ImgGrid>
            <div className="container">
                {images.slice(0, 4).map((image: any, i: number) => (
                    <div key={image.title} className={"img-container " + "img" + (i + 1)}>
                        <img src={image.url} alt={image.altText} title={image.title} />
                        <div className="credits">
                            {image.credit}
                        </div>
                    </div>
                ))}
                <div className="overlay">
                    {/* OnClick Open Modal Gallery */}
                    <button>View More</button>
                </div>
            </div>
        </ImgGrid>
    )
}

const ParkHeader = ({ park, state, parkId  }: any) => {
    
    const visitors = parkVistors.filter(park => park.parkCode === parkId?.toUpperCase());
    const visitCount = visitors.length >= 1 ? visitors[0].visitors: 0;
    
    return (
        <Header>
            <div className="container">
                <div className="content">
                    <h1>{park.fullName}</h1>
                    <h2>{state.name}</h2>
                    { visitCount !== 0 && <p><strong>{visitCount}+</strong> visitors in 2022</p>}
                </div>
                <MapBox>
                    <LeafletMap 
                    state={state} 
                    parkCoords={[{ longitude: park.longitude, latitude: park.latitude, name: park.fullName }]}
                    />
                </MapBox>
            </div>
        </Header>
    )
}

const OtherParks = ({ state }: any) => {
    const parks = useContext(ParkContext);
    const otherParks = parks.filter((park: any) => park.states.toLowerCase().includes(state.id) && park.fullName !== state.name);
    
    return (
        <div className="container" style={{padding: '2em 3em'}}>
            <h2>Other Parks in {state.name}</h2>
            <ul style={{display: 'grid', gridTemplateRows: `repeat(${Math.round(otherParks.length / 2)}, 1fr)`, gridAutoFlow: 'column'}}>
                {otherParks.map((park: any) => (
                    <li key={park.parkCode}>
                        <Link to={`/park/${park.parkCode}`}>
                            {park.fullName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const ParkPage = () => {
    const parks = useContext(ParkContext);
    const { parkId } = useParams();
    
    const activePark = useMemo(() => parks.find((park: any) => park.parkCode === parkId), [parkId]);
    
    // Look into useMemo for these
    const state = stateMap.filter(state => activePark.states.toLowerCase().includes(state.id))[0];

    console.log('activePArk', activePark);
    
    return (
        <>
            <ParkHeader park={activePark} parkId={parkId} state={state}/>
            
            <ImageGrid images={activePark.images}/>
           
            <DescriptionBox className="container">
                <MainDescription park={activePark}/>
                
                <div style={{width: '50%'}}>
                    
                    <ParkAlert parkId={parkId}/>
                    
                    <ActionButtons/>
                    
                </div>
            </DescriptionBox>
            
            <OtherParks state={state}/>
        </>
    )
}