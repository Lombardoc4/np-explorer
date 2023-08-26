import { ParksDropdown } from "../components/Dropdown/ParksDropdown";
import { Header } from "../components/Header";
import styled from "styled-components";
import { USMap } from "../components/USMap";
import { OtherParks } from "./Park/components";
import { useContext } from "react";
import SearchContext from "../utils/hooks/SearchContext";
import { ParkLocalStorage } from "../utils/hooks/ParkContext";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

export const LandingPage = () => {
    const allParks = useContext(SearchContext);
    const lsParks = JSON.parse(localStorage.getItem('npe-recently-viewed') || '[]');
    const recentParks = allParks.filter(p => lsParks.find((lsPark: ParkLocalStorage) => lsPark.parkCode === p.parkCode))

    return (
        <>
            <header style={{backgroundColor: '#000', color: '#fff', padding: '4em 0'}}>
                <div className="container" style={{display: 'flex', gap: '1em',  flexDirection: 'column', justifyContent: "center", textAlign: 'center'}}>
                    <h1 style={{fontSize: '3em', textTransform: 'uppercase'}}>Explore Your Favorite National&nbsp;Parks</h1>
                    <div style={{position: 'relative', minHeight: '50px', width: '100%', display: 'flex', justifyContent: 'center'}}>

                    <ParksDropdown/>
                    </div>
                </div>
            </header>
            <div className='container' style={{padding: '4em 0'}}>
                <h2 style={{fontSize: '2em', textTransform: 'uppercase'}}>A modern look to<br/> the National Parks Service</h2>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', margin: '2em 0', gap: '2em'}}>
                    <div>
                        <h3>Events & Things To Do</h3>
                        <p>Sign up for upcoming events, like movies under the stars. There are plenty of suggested things to do recommended by and for specific national parks.</p>
                    </div>
                    <div>
                        <h3>Visitor Centers</h3>
                        <p>Vist one of the over 550 visitor centers managed by the NPS to get even more information from an educated park range. There are plenty of chances to get your NPS Passport stamped</p>
                    </div>
                     <div>
                        <h3>Direction & Parking</h3>
                        <p>Never get lost in the vast road system of our great National Parks. Get direction to your favorite parks and accessible parking lots</p>
                    </div>
                    <div>
                        <h3>Camping</h3>
                        <p>Whether first-come first-serve or requiring reservation, find your next campground and hit the roads. </p>
                    </div>
                    <div>
                        <h3>Stay Alert</h3>
                        <p>Get the heads up before you go, with update to date alerts, you're ahead of the game</p>
                    </div>
                    <div>
                        <h3>Book a tour</h3>
                        <p>Interesting in learning about the rich history of our national parks, book a tour with the NPS.</p>
                    </div>
                </div>
            </div>

            <USMap />


            {recentParks.length > 0 && <div className="container">
                <OtherParks parks={recentParks} title={'Recently Viewed Parks'} others={false} />
            </div>}

        </>
    );
};
