import { ParksDropdown } from "../components/Dropdown/ParksDropdown";
import { Header } from "../components/Header";
import styled from "styled-components";
import { USMap } from "../components/USMap";
import { ParkCardGrid, ParkCards } from "./Park/components";
import { useContext } from "react";
import SearchContext from "../utils/hooks/SearchContext";
import { ParkLocalStorage } from "../utils/hooks/ParkContext";
import { StateProps, stateMap } from "../utils/lib/stateMap";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

export const LandingPage = () => {
    const allParks = useContext(SearchContext);
    const lsParks = JSON.parse(localStorage.getItem('npe-recently-viewed') || '[]');
    const recentParks = allParks.filter(p => lsParks.find((lsPark: ParkLocalStorage) => lsPark.parkCode === p.parkCode))
    const recentParksStates = recentParks.reduce((acc: StateProps[], p) => {
        stateMap.map((s) => {
            if (p.states.includes(s.id.toUpperCase()) )
                acc.push(s)
        })
        return acc;
    }, [])


    return (
        <>
            <header className='bg-[url(https://www.nps.gov/common/uploads/structured_data/3C7FA4C5-1DD8-B71B-0B7FCC54E43FEE79.jpg)] bg-center bg-cover min-h-dvh grid'>
                <div className='w-full h-full bg-black/50 text-white grid items-center'>
                    <div className=' mx-auto container grid gap-8'>
                        <h1 className='text-6xl font-medium uppercase'>
                            Explore Your
                            <br /> Favorite National Parks
                        </h1>
                        <div className='relative h-[50px]'>
                            <ParksDropdown />
                        </div>
                    </div>
                </div>
            </header>

            <div className='container mx-auto my-12'>
                <h2 className='text-4xl uppercase font-bold'>
                    A modern look to
                    <br /> the National Parks Service
                </h2>
                <div className='grid gap-12 my-8 grid-cols-3'>
                    <div>
                        <h3 className='text-xl font-semibold'>Events & Things To Do</h3>
                        <p>
                            Sign up for upcoming events, like movies under the stars. There are plenty of suggested
                            things to do recommended by and for specific national parks.
                        </p>
                    </div>
                    <div>
                        <h3 className='text-xl font-semibold'>Visitor Centers</h3>
                        <p>
                            Vist one of the over 550 visitor centers managed by the NPS to get even more information
                            from an educated park range. There are plenty of chances to get your NPS Passport stamped
                        </p>
                    </div>
                    <div>
                        <h3 className='text-xl font-semibold'>Direction & Parking</h3>
                        <p>
                            Never get lost in the vast road system of our great National Parks. Get direction to your
                            favorite parks and accessible parking lots
                        </p>
                    </div>
                    <div>
                        <h3 className='text-xl font-semibold'>Camping</h3>
                        <p>
                            Whether first-come first-serve or requiring reservation, find your next campground and hit
                            the roads.{" "}
                        </p>
                    </div>
                    <div>
                        <h3 className='text-xl font-semibold'>Stay Alert</h3>
                        <p>Get the heads up before you go, with update to date alerts, you're ahead of the game</p>
                    </div>
                    <div>
                        <h3 className='text-xl font-semibold'>Book a tour</h3>
                        <p>
                            Interesting in learning about the rich history of our national parks, book a tour with the
                            NPS.
                        </p>
                    </div>
                </div>
            </div>

            <USMap />

            {recentParks.length > 0 && (
                <ParkCards parks={recentParks} title={"Recently Viewed Parks"} states={recentParksStates} />
            )}
        </>
    );
};
