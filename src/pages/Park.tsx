
import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom"
import styled from 'styled-components';

import { LeafletMap } from "../components/LeafletMap";
import { ParkAlert } from "../components/ParkAlert";
import { Header } from "../components/Header";
import { CardButtonGrid } from "../components/CardButtonGrid";
import { StyledList } from "../components/StyledList";
import { ImageGrid } from "../components/ImageViewer";
import { ParkDescription } from "../components/ParkDescription";

import ParkContext from "../utils/hooks/ParkContext";
import { StateProps, stateMap } from "../utils/data/stateMap";
import { parkVistors } from "../utils/data/parkVisitors";
import { ParkCards } from "../components/ParkCards";

const activityCategories = [
    { 
        name: 'Things to do', 
        id: 'thingstodo',
        icon: 'balloon'
    },
    { 
        name: 'Amenities', 
        id: 'amenities/parksplaces',
        icon: 'balloon'
    },
    { 
        name: 'Camping', 
        id: 'campgrounds',
        icon: 'balloon' 
    },
    { 
        name: 'Events', 
        id: 'events',
        icon: 'balloon' 
    },
    { 
        name: 'Tours', 
        id: 'tours',
        icon: 'balloon' 
    },
    { 
        name: 'Visitor Centers', 
        id: 'visitorcenters',
        icon: 'balloon' 
    },
    { 
        name: 'Parking',
        id: 'parkinglots',
        icon: 'balloon'
    },
    { 
        name: 'News Releases', 
        id: 'newsreleases' ,
        icon: 'balloon'
    },
]





const getVisitorCount = (parkId : string) => {
    const visitors = parkVistors.filter(park => park.parkCode === parkId?.toUpperCase());
    return visitors.length >= 1 ? visitors[0].visitors: 0;
}

interface ParkHeaderProps {
    park: any;
    state: StateProps;
    parkId?: string;
}

const ParkHeader = ({ park, state, parkId  }: ParkHeaderProps) => {
    const visitCount = parkId && getVisitorCount(parkId);
    const Description = visitCount ? <p><strong>{visitCount}+</strong> visitors in 2022</p> : <p></p>;
    const subtitle = {
        text: state.name,
        link: '/state/' + state.id
    }
    
    return (
        <Header
        title={park.fullName}
        subtitle={subtitle}
        description={Description}>
            {parkId && <ImageGrid previewImgs={park.images} parkId={parkId}/> }
        </Header>
    )
}

export const ParkPage = () => {
    const parks = useContext(ParkContext);
    const { parkId } = useParams();
    
    // Migrate logic to loader action via router 
    // Todo Can this be simplied
    
    const activePark =  parks.find((park: any) => park.parkCode === parkId);
    const state =       stateMap.filter(state => activePark.states.toLowerCase().includes(state.id))[0];
    
    const otherParks =  parks.filter((park: any) => 
                            park.states.toLowerCase().includes(state.id) && park.fullName !== state.name
                        )
                        // .map((park: any) => 
                        //     ({ link: '/park/' + park.parkCode, text: park.fullName })
                        // );
    const memoHeader =  useMemo(() => (
                            <ParkHeader park={activePark} parkId={parkId} state={state}/>
                        ), [parkId, state]);
    
                        
console.log('activePark', activePark);
    return (
        <>
            {memoHeader}
            
            {/* {parkId && <ImageGrid previewImgs={activePark.images} parkId={parkId}/>} */}
            
            
            <div className="container" style={{padding: '1em'}}>
                {parkId && <ParkAlert parkId={parkId}/>}
            </div>
            
            <div className="container" style={{padding: '2em 1em'}}>
                <CardButtonGrid dir={'row'} buttons={activityCategories} />
            </div>
            
            <DescriptionBox className="container">
                <div>
                    
                <ParkDescription park={activePark}/>
                </div>
                
            </DescriptionBox>
            
            <DirectionSection className="container">
                {/* API Call */}
                
                <div className="directions"> 
                    <h2>Directions</h2>
                    <p>{activePark.directionsInfo}</p>
                    
                    <h3>Coordinates</h3>
                    <p>{activePark.latitude}, {activePark.longitude}</p>
                    
                    <a href={activePark.directionsUrl}>Nation Park Directions</a>
                </div>
                
                <MapBox>
                    <LeafletMap 
                    state={state} 
                    parkCoords={[{ longitude: activePark.longitude, latitude: activePark.latitude, name: activePark.fullName, id: activePark.parkCode }]}
                    />
                </MapBox>
            </DirectionSection>
            
            <div className="container" style={{padding: '2em 1em'}}>
                <h2>Other Parks in {state.name}</h2>
                <br/>
                <ParkCards parks={otherParks} columns={3} showDescription={false}/>
            </div>
        </>
    )
}


const MapBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const DescriptionBox = styled.div`
    /* background: #f1f1f1; */
    color: #000;
    padding: 0 1em;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1em;
    font-size: 1.2em;
    
    
        
    @media (min-width: 768px) {
        padding: 2em 1em;
    }
`;

const DirectionSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap:2em;
    font-size: 1.2em;
    
    
    background-color: ${({ theme }) => theme.colors.gray};
    color: #507743;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 8px;
    
    .directions {
        
        padding: 1em;
        /* margin: 1em 0; */
        
        p { margin-bottom: 1em; }
        
        a {
            text-decoration: underline;
            font-size: 1.1em;
            /* color: ${({ theme }) => theme.colors.black}; */
        }
    }
`;
    