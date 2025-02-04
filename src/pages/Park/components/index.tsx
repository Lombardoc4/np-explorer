import { Link } from "react-router";

import { activityCategories, ActivityDetails } from "../../../utils/lib/activityCategories";
import { fetcher, filterParks, getVisitorCount, uniqueCategoryItems } from "../../../utils/helper";
import { useContext, useEffect, useState } from "react";
import { IMarker, LeafletMap } from "../../../components/LeafletMap";
import { ParkCardFilters } from "../../../components/ParkCardFilters";
import { ParkCardGrid } from "../../../components/ParkCards";
import { StateProps, stateMap } from "../../../utils/lib/stateMap";
import styled from "styled-components";
import ParkContext, { IPark } from "../../../utils/hooks/ParkContext";
import { ContactCard } from "../Sidebar";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Button } from "../../../components/Button";

export interface ParkProps {
    park: any;
}

interface ActiveCatergory extends ActivityDetails {
    data: any[];
    count: number;
}

export interface InputProps {
    name: "entranceFees" | "entrancePasses" | "activities";
    value: string;
}

export const ParkHeader = ({ park }: ParkProps) => {
    // const visitCount = getVisitorCount(park.parkCode);
    const categories = activityCategories;

    const categoryEls = Object.values(categories).map((category: ActivityDetails) => (
            <a key={category.name} className='border rounded-lg flex items-center justify-center text-xl hover:bg-green-200' href={"#" + category.name.replace(/ /g, "-").toLowerCase()}>
        {/* <Button className=""> */}
                {/* {category.count}  */}
                {category.name}
        {/* </Button> */}
            </a>
    ));

    return (
        <div className='grid grid-cols-2 gap-8'>
            {/* {visitCount > 0 && <span>{visitCount} visitors in 2022</span>} */}
            <div>
                <h3 className='text-3xl font-bold mb-2'>Overview</h3>
                <p className='text-xl p-4 text-justify border rounded-lg bg-green-200'>{park.description}</p>
            </div>
            <div className="flex flex-col">

            <h3 className='h-fit font-semibold text-2xl mb-2'>Table of Contents</h3>
            <div className='grid gap-2 grid-cols-2 h-full'>
                {categoryEls}
            </div>
            </div>
            {/* <div className='py-16'> */}
            {/* <div className="container mx-auto max-w-5xl"> */}
            {/* </div> */}
            {/* </div> */}
        </div>
    );
};

export const DirectionSection = ({ park, children }: { park: any; children?: JSX.Element }) => {
    const { addresses } = park;

    return (
        <div className='container mx-auto grid grid-cols-2 gap-x-8 items-center'>
            <div>
                <h3 className='text-4xl font-bold  border-b mb-2'>Directions</h3>

                <p className='text-lg'>{park.directionsInfo || children}</p>
                <a className='italic underline text-sm ' target='_blank' href={park.directionsUrl}>
                    Official National Park Directions
                </a>
            </div>
            <div className="flex gap-8">
                <ContactCard contacts={park.contacts} url={park.url} />
            <div>
                {addresses.length > 0 && (
                    <>
                        <h4 className='text-xl font-semibold'>Address</h4>
                        <DirectionAddress addresses={addresses} />
                    </>
                )}
                {/* <h4 className='text-xl font-semibold'>Coordinates</h4> */}
                <p>
                    <a
                        target='_blank'
                        href={`https://www.google.com/maps/search/?api=1&query=${park.latitude},${park.longitude}`}
                    >
                        {park.latitude.slice(0, 8)}, {park.longitude.slice(0, 8)}
                    </a>
                </p>
            </div>
            </div>
        </div>
    );
};

const DirectionAddress = ({ addresses }: { addresses: any[] }) => {
    addresses
        .filter((add: any) => add.type === "Physical")
        .map((add: any) => {
            add.gMapsUrl = `https://www.google.com/maps/search/?api=1&query=${add.line1
                .replaceAll(" ", "+")
                .replace(".", "")} ${add.city.replaceAll(" ", "+")} ${add.stateCode} ${add.postalCode}`;
            add.full = (
                <>
                    {add.line1},<br /> {add.city}, {add.stateCode} {add.postalCode}
                </>
            );
        });

    return (
        <>
            {addresses
                .filter((add: any) => add.type === "Physical")
                .map((add: any) => (
                    <p key={add.full}>
                        <a target='_blank' href={add.gMapsUrl}>
                            {add.full}
                        </a>
                    </p>
                ))}
        </>
    );
};

export const WeatherSection = ({ weather, children }: any) => {
    return (
        <div className='container mx-auto grid md:grid-cols-2 gap-8 items-center'>
            {children}
            <div>
                <h3 className='text-4xl font-bold border-b mb-2'>Weather</h3>
                <p className='text-lg'>{weather}</p>
            </div>
        </div>
    );
};

const CategoryCard = ({ category, data, path }: { category: string; data: any; path: string }) => {
    const name = data.name || data.title;
    const href = name.replace(/\ /g, "-").toLowerCase();
    const button = (
        <Button className='border mt-auto w-full cursor-pointer'>
            <Link to={`./${path}/#${href}`}>Read more</Link>
        </Button>
    );
    const link = (
        <p className='bold text-xl font-medium underline'>
            <Link to={`./${path}/#${href}`}>{name}</Link>
        </p>
    );
    const description = (
        <>
            <p className='line-clamp-4'>{data.description || data.shortDescription}</p>
            {button}
        </>
    );

    switch (category) {
        case "Events":
            const date = new Date(data.date.replace(/-/g, "/")).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            return (
                <div className='border rounded p-4 grid item-start gap-2'>
                    <span className='bold'>{date}</span>
                    {link}
                    <div
                        className='line-clamp-4'
                        dangerouslySetInnerHTML={{ __html: data.description.replaceAll("<br /><br />", "</p><p>") }}
                    />
                                {button}

                </div>
            );

        default:
            return (
                <div className="border rounded p-4 grid item-start gap-2">
                    <div >
                    {/* style={{ display: "flex", alignItems: "center", gap: "1em" }}> */}
                        {link}
                        {data.isPassportStampLocation === "1" && (
                            <img
                                title='Passport Stamp Location'
                                src='/passport-book.webp'
                                alt='Passport Stamp'
                                style={{ height: "22px" }}
                            />
                        )}
                    </div>

                    {description}
                </div>
            );
    }
};

export const CategorySection = ({ parkCode, endpoint }: { parkCode: string; endpoint: string }) => {
    const {
        status,
        data: categories,
        error,
    } = useQuery({
        queryKey: ["park", { catergory: endpoint, parkCode: parkCode }],
        queryFn: async() => await fetcher(`${endpoint}?parkCode=${parkCode}`),
        retry: 0,
    });

    const activeCat = activityCategories[endpoint]

    if (status === 'error') return

    if (status !== 'success') return

    if (categories.length <= 0) return;

    const uniqueCats = uniqueCategoryItems(categories);

    return (
        <div className='container mx-auto' id={activeCat.name.replace(/\ /g, "-").toLowerCase()}>
            <h3 className='flex items-center gap-1 text-4xl font-bold'>
                {activeCat.icon}
                <Link className='hover:underline' to={activeCat.path}>
                    {activeCat.name}
                </Link>{" "}
                ({categories.length})
            </h3>

            {/* Accordian */}
            <div className='grid grid-cols-2 gap-8 mt-4'>
                {uniqueCats.slice(0, 6).map((data) => (
                    <CategoryCard
                        key={data.name || data.title}
                        category={activeCat.name}
                        data={data}
                        path={activeCat.path}
                    />
                ))}
                {uniqueCats.length > 6 && (
                    <Button className="col-span-2 hover:underline">
                        <Link to={activeCat.path}>Read more about {activeCat.name}</Link>
                    </Button>
                )}
            </div>
        </div>
    );
};

export interface FilterProps {
    entranceFees: string;
    entrancePasses: string;
    activities: string[];
}

const initFilters: FilterProps = {
    entranceFees: "",
    entrancePasses: "",
    activities: [],
};

interface StateParksProps {
    parks: IPark[] | IPark[];
    title?: string;
    states: StateProps[];
    others?: boolean;
}

export const ParkCards = ({ parks, title, states }: StateParksProps) => {
    // const park = useContext(ParkContext);
    const [filters, setFilters] = useState<FilterProps>(initFilters);
    const filteredParks = filterParks(filters, parks);

    // console.log('states', states)

    // Coords for map
    const parkCoords: IMarker[] = filteredParks
        .filter((p) => p.latitude && p.longitude)
        .map((p) => ({
            longitude: parseFloat(p.longitude),
            latitude: parseFloat(p.latitude),
            name: p.fullName,
            id: p.parkCode,
            // active: park ? park.id === p.id : true,
        }));

    console.log(parkCoords);

    const toggleFilter = (input: InputProps) => {
        const { name, value } = input;
        if (name === "activities") {
            // if value already exists remove it otherwise add it
            const newActivities = filters.activities.find((a: string) => a === value)
                ? filters.activities.filter((a: string) => a !== value)
                : [...filters.activities, value];
            setFilters({ ...filters, activities: newActivities });
        } else {
            // update value
            const newFilters = { ...filters, [name]: value };
            setFilters(newFilters);
        }
    };

    return (
        <div className='grid gap-1 items-start my-8 justify-center'>
            <div className='container'>
                {title && <h2 className='text-4xl text-center'>{title}</h2>}

                {/* Map with parks */}
                {/* <div className="relative overflow-hidden">
                    <LeafletMap states={states} parkCoords={parkCoords} />
                </div> */}
            </div>

            <div id='other-parks'>
                {/* TWO COMPONENTS BELOW MIGHT BE COMBINABLE  */}
                {
                    <ParkCardFilters
                        otherParks={filteredParks}
                        toggleFilter={toggleFilter}
                        // state={state}
                    />
                }

                {/* <div className='container'>
                    {filteredParks.length > 0 ? (
                        <ParkCardGrid grid={true} parks={filteredParks} showDescription={false} />
                    ) : (
                        <h2>No parks match these filters</h2>
                    )}
                </div> */}
            </div>
        </div>
    );
};

const MainContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1em;
    /* grid-template-columns: 250px auto; */
    align-items: flex-start;
    margin: 2em auto;
    /* padding: 1em; */

    .title {
        font-size: 2.2em;
        text-align: center;
    }

    .filters {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
        padding-block: 1rem;

        position: sticky;
        z-index: ${({ theme }) => theme.zIndex.dropdown};

        background-color: ${({ theme }) => theme.colors.white};
    }

    @media (min-width: 768px) {
        .filters {
            top: calc(70px);
        }
    }
`;

const MapBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;
export { ParkCardGrid };
