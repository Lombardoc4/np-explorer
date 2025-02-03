import { useContext, useEffect } from "react";
import { Params, useLoaderData } from "react-router";

import { ParkHeader, DirectionSection, WeatherSection, CategorySection } from "./components";
import { MainGrid } from "./components/StyledParkComponents";
import { FeeCard, Sidebar } from "./Sidebar";

import ParkContext from "../../utils/hooks/ParkContext";
import { activityCategories } from "../../utils/lib/activityCategories";
import { WeatherDisplay } from "../../components/Weather";
import { fetcher } from "../../utils/helper";
import { ParkAlert } from "../../components/ParkAlert";

export interface ParkProps {
    park: any;
}

export interface LoaderProps {
    thingsToDo: any[];
    campgrounds: any[];
    events: any[];
    tours: any[];
    visitorCenters: any[];
    parkingLots: any[];
}

// Adjust object to map it properly
const updateCategories = (loaderData: LoaderProps) => {
    return Object.keys(activityCategories)
        .map((category) => ({
            ...activityCategories[category],
            count: loaderData[category as keyof LoaderProps].length,
            data: loaderData[category as keyof LoaderProps],
        }))
        .filter((c) => c.count > 0);
};

const loader = async ({ params }: { params: Params }) => {
    const thingsToDo = await fetcher(`thingstodo?parkCode=${params.parkId}`);
    const campgrounds = await fetcher(`campgrounds?parkCode=${params.parkId}`);
    const events = await fetcher(`events?parkCode=${params.parkId}`);
    const tours = await fetcher(`tours?parkCode=${params.parkId}`);
    const visitorCenters = await fetcher(`visitorcenters?parkCode=${params.parkId}`);
    const parkingLots = await fetcher(`parkinglots?parkCode=${params.parkId}`);

    return {
        thingsToDo,
        campgrounds,
        events,
        tours,
        visitorCenters,
        parkingLots,
    };
};

export const Park = () => {
    const {status, error, data: park} = useContext(ParkContext);
    // const loaderData = useLoaderData() as LoaderProps;
    // const categories = updateCategories(loaderData);

    useEffect(() => {}, [park]);

    if (error) {
        return <>Errror: {error.message}</>
    }

    if (!park) {
        return <>No PArk</>
    }

    const endpoints = Object.keys(activityCategories)


    return (
        <div className='mx-auto container grid'>
            <ParkHeader park={park} />
            <div className='md:grid gap-x-16 my-8'>
                <div className='grid gap-16'>

                    <ParkAlert parkId={park.parkCode} />


                    <DirectionSection park={park} />

                    <WeatherSection weather={park.weatherInfo}>
                        <WeatherDisplay lat={park.latitude} long={park.longitude} />
                    </WeatherSection>

                    <FeeCard entranceFees={park.entranceFees}/>
                    {
                        endpoints.map(e =>

                            <CategorySection key={e} parkCode={park.parkCode} endpoint={e} />
                        )
                    }
                </div>
            </div>
        </div>
    );
};
