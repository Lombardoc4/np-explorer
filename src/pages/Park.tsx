
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
        name: 'Parking Lots', 
        id: 'parkinglots',
        icon: 'balloon'
    },
    { 
        name: 'News Releases', 
        id: 'newsreleases' ,
        icon: 'balloon'
    },
    { 
        name: 'News Releases', 
        id: 'newsreleases' ,
        icon: 'balloon'
    },
]

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
    padding: 2em 1em;
        display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1em;
        
    /* @media (min-width: 768px) { */
        /* grid-template-columns: 1fr 1fr; */
    /* } */
`;



const AlertBox = styled.div`
    padding: 1em;
    margin: 1em;
    background-color: ${({ theme }) => theme.colors.gray};
    color: #507743;
    border-radius: 5px;
    box-shadow: rgba(80, 119, 67, 0.26) 0px 2px 8px;
    
    p:not(:last-child){
        padding: 0.5em 0;
        border-bottom: 1px solid #507743;
    }
    
    a { text-decoration: underline }
`;


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
            <MapBox>
                <LeafletMap 
                state={state} 
                parkCoords={[{ longitude: park.longitude, latitude: park.latitude, name: park.fullName }]}
                />
            </MapBox>
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
                        ).map((park: any) => 
                            ({ link: '/park/' + park.parkCode, text: park.fullName })
                        );
    const memoHeader =  useMemo(() => (
                            <ParkHeader park={activePark} parkId={parkId} state={state}/>
                        ), [parkId, state]);
    
    return (
        <>
            {memoHeader}
            
            <ImageGrid images={activePark.images}/>
            
            
            <DescriptionBox className="container">
                <div>
                    
                {parkId && <ParkAlert parkId={parkId}/>}
                <ParkDescription park={activePark}/>
                </div>
                
                <div>
                    {/* API Call */}
                    <CardButtonGrid buttons={activityCategories} />
                    {/* API Call */}
                </div>
            </DescriptionBox>
            
            {/* <AlertBox><h2>Park Events</h2></AlertBox> */}
            
            
            {/* !! Todo Replace with Cards????? */}
            <StyledList title={`Other Parks in ${state.name}`} listItems={otherParks}/>
        </>
    )
}