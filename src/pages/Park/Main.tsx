import { useContext } from "react";

import { ParkHeader, DirectionSection, WeatherSection, CategorySection } from "./components";
import { WeatherDisplay } from "../../components/Weather";
import { ParkAlert } from "../../components/ParkAlert";

import { FeeCard } from "./Sidebar";

import ParkContext from "../../utils/hooks/ParkContext";
import { activityCategories } from "../../utils/lib/activityCategories";

export interface ParkProps {
    park: any;
}

export const Park = () => {
    const {error, data: park} = useContext(ParkContext);

    if (error) {
        return <>Errror: {error.message}</>
    }

    if (!park) {
        return <>No Park</>
    }

    const endpoints = Object.keys(activityCategories)

    return (
        <div>
            <div className='container mx-auto max-w-5xl md:grid gap-16 my-8'>
                <ParkHeader park={park} />

                <ParkAlert parkId={park.parkCode} />

                <DirectionSection park={park} />

                <WeatherSection weather={park.weatherInfo}>
                    <WeatherDisplay lat={park.latitude} long={park.longitude} />
                </WeatherSection>

                <FeeCard entranceFees={park.entranceFees} />
                {endpoints.map((e) => (
                    <CategorySection key={e} parkCode={park.parkCode} endpoint={e} />
                ))}
            </div>
        </div>
    );
};
