import { useContext } from "react";


import ParkContext from "../../utils/hooks/ParkContext";
import { activityCategories, ActivityDetails } from "../../utils/lib/activityCategories";
import ErrorPage from "../Error";
import { WeatherDisplay } from "./components/weather";
import { ParkAlert, DirectionSection, WeatherSection, FeeCard, CategorySection } from "./Sections";


export interface ParkProps {
    park: any;
}

export const ParkPage = () => {
    const {error, data: park} = useContext(ParkContext);
    if (error) {
        return <ErrorPage error={error} />
    }

    if (!park) {
        return <ErrorPage error={'No Park'} />;
    }

    const endpoints = Object.keys(activityCategories)

    return (
        <div className='container mx-auto max-w-5xl md:grid gap-16 md:my-16 px-4 xl:px-0'>
            <ParkHeader description={park.description} />
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
    );
};

const ParkHeader = ({ description }: {description: string}) => {
    // const visitCount = getVisitorCount(park.parkCode);
    const categoryEls = Object.values(activityCategories).map((category: ActivityDetails) => (
        <AnchorLink key={category.name} id={category.name}/>
    ));

    return (
        <div className='grid md:grid-cols-2 gap-8 items-center'>
            {/* {visitCount > 0 && <span>{visitCount} visitors in 2022</span>} */}
            <div>
                <p className='font-stretch-condensed text-xl p-4 text-justify border border-dashed rounded bg-green-200 dark:bg-green-900 dark:text-white'>{description}</p>
            </div>
            <div className='grid grid-cols-2 gap-4 h-full'>
                {categoryEls}
            </div>
        </div>
    );
};

export const AnchorLink = ({ id }: {id: string}) => {
    return (
        <a
            className='text-center py-4 px-2 uppercase min-h-16 h-full border border-double rounded flex items-center justify-center md:text-2xl font-black hover:bg-green-200 dark:hover:bg-green-900 hover:underline'
            href={"#" + id.replace(/ /g, "-").toLowerCase()}
        >
            {id}
        </a>
    );
};
