import { useContext } from "react";
import { useLoaderData } from "react-router-dom";

import { ParkHeader, DirectionSection, WeatherSection, CategorySection } from "./components";

import ParkContext from "../../utils/hooks/ParkContext";
import { activityCategories } from "../../utils/lib/activityCategories";
import { MainGrid } from "../../components/styled/MainGrid";
import { Sidebar } from "./Sidebar";

export interface ParkProps {
    park: any;
}

interface LoaderProps {
    thingsToDo: any[];
    camping: any[];
    events: any[];
    tours: any[];
    visitorCenters: any[];
    parking: any[];
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

export const Park = () => {
    const park = useContext(ParkContext);
    const loaderData = useLoaderData() as LoaderProps;
    const categories = updateCategories(loaderData);

    return (
        <MainGrid>
            <div className='content'>
                <ParkHeader park={park} categories={categories} />

                <DirectionSection park={park} />

                <WeatherSection weather={park.weatherInfo} />

                <CategorySection activeCategories={categories} />
            </div>

            <Sidebar park={park} />
        </MainGrid>
    );
};
