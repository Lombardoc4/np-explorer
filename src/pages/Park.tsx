
import { useContext, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom"
import styled from 'styled-components';

import { LeafletMap } from "../components/LeafletMap";
import { ParkAlert } from "../components/ParkAlert";
import { Header } from "../components/Header";
import { CardButtonGrid } from "../components/CardButtonGrid";
import { ImageGrid } from "../components/ImageViewer";
import { ParkDescription } from "../components/ParkDescription";

import ParkContext from "../utils/hooks/ParkContext";
import { StateProps, stateMap } from "../utils/data/stateMap";
import { parkVistors } from "../utils/data/parkVisitors";
import { ParkCards } from "../components/ParkCards";
import { ReactComponent as ListStar} from "../assets/icons/list-stars.svg";
import { ReactComponent as Fire} from "../assets/icons/fire.svg";
import { ReactComponent as CalendarCheck} from "../assets/icons/calendar-check-fill.svg";
import { ReactComponent as People} from "../assets/icons/people-fill.svg";
import { ReactComponent as House} from "../assets/icons/house-fill.svg";
import { ReactComponent as Car} from "../assets/icons/car-front-fill.svg";
import { Dropdown } from "../components/Dropdown";
import { StateParks } from "./State";

const activityCategories = [
    { 
        name: 'Things to do', 
        id: 'things-to-do',
        icon: <ListStar/>
    },
    // { 
    //     name: 'Amenities', 
    //     id: 'amenities-parks-places',
    //     icon: 'balloon'
    // },
    { 
        name: 'Camping', 
        id: 'campgrounds',
        icon: <Fire/>
    },
    { 
        name: 'Events', 
        id: 'events',
        icon: <CalendarCheck/>
    },
    { 
        name: 'Tours', 
        id: 'tours',
        icon: <People/>
    },
    { 
        name: 'Visitor Centers', 
        id: 'visitor-centers',
        icon: <House/>
    },
    { 
        name: 'Parking',
        id: 'parking-lots',
        icon: <Car/>
    },
    // { 
    //     name: 'News Releases', 
    //     id: 'news-releases' ,
    //     icon: 'balloon'
    // },
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

export const ParkHeader = ({ park, state, parkId  }: ParkHeaderProps) => {
    const visitCount = parkId && getVisitorCount(parkId);
    const Description = visitCount ? <p style={{fontSize: '1.2em'}}><strong>{visitCount}+</strong> visitors in 2022</p> : <p></p>;
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
    
                        
    return (
        <>
            {memoHeader}
            {parkId && <ParkAlert parkId={parkId}/>}
            
            <Outlet/>
            
            {/* {parkId && <ImageGrid previewImgs={activePark.images} parkId={parkId}/>} */}
            
            
            
            <div className="container" style={{padding: '2em 1em'}}>
                <CardButtonGrid dir={'row'} buttons={activityCategories} />
            </div>
            
            <DescriptionBox className="container">
                    
                <ParkDescription park={activePark}/>
                
            </DescriptionBox>
            
            <div className="container">
                <h2>Directions</h2>
                <DirectionSection>
                    {/* API Call */}
                    
                    <div className="directions"> 
                        <p>{activePark.directionsInfo}</p>
                        
                        <h3>Coordinates</h3>
                        <p><a href={`http://www.google.com/maps/place/${activePark.latitude},${activePark.longitude}`}>{activePark.latitude}, {activePark.longitude}</a></p>
                        
                        <a href={activePark.directionsUrl}>Nation Park Directions</a>
                    </div>
                    
                    <MapBox>
                        <LeafletMap 
                        state={state} 
                        parkCoords={[{ longitude: activePark.longitude, latitude: activePark.latitude, name: activePark.fullName, id: activePark.parkCode }]}
                        />
                    </MapBox>
                </DirectionSection>
            </div>
            
            <div style={{marginTop: '4em'}}>
                <StateParks title={"Other parks in " + state.name} state={state} parks={otherParks}/>
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
    gap: 1em;
    font-size: 1.2em;
 
    
    
    
    @media (min-width: 768px) {
        padding: 2em 1em;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
`;

const DirectionSection = styled.div`
    display: grid;
    gap: 1em;
    font-size: 1.2em;
    
    
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 8px -2px;
    
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
    
    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
        gap:2em;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 16px -8px;
        
    }
`;
    