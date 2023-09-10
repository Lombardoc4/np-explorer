import { Link } from "react-router-dom";

import { ActivityDetails } from "../../../utils/lib/activityCategories";
import { filterParks, uniqueCategoryItems } from "../../../utils/helper";
import { useContext, useEffect, useState } from "react";
import { IMarker, LeafletMap } from "../../../components/LeafletMap";
import { ParkCardFilters } from "../../../components/ParkCardFilters";
import { ParkCardGrid } from "../../../components/ParkCards";
import { StyledCard } from "../../../components/styled/StyledCard";
import SearchContext from "../../../utils/hooks/SearchContext";
import { StateProps, stateMap } from "../../../utils/lib/stateMap";
import styled from "styled-components";
import { IPark } from "../../../utils/hooks/ParkContext";

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

interface HeaderProps extends ParkProps {
    categories: ActiveCatergory[];
}

export const ParkHeader = ({ park, categories }: HeaderProps) => {
    const categoryEls = categories.map((category: ActivityDetails, i: number) => (
        <span key={category.name}>
            {i > 0 && <> - </> /*this is a divider*/}

            <a href={"#" + category.name.replaceAll(" ", "-").toLowerCase()}>
                {category.count} {category.name}
            </a>
        </span>
    ));

    return (
        <>
            <div className='section' style={{ display: "flex", flexDirection: "column" }}>
                <h2>{park.fullName}</h2>
                <div style={{ margin: "auto 0", display: "flex", flexWrap: "wrap", gap: "0.25em" }}>{categoryEls}</div>
            </div>
            <div className='section'>
                <p>{park.description}</p>
            </div>
        </>
    );
};

export const DirectionSection = ({ park, children }: { park: any; children?: JSX.Element }) => {
    const { addresses } = park;

    return (
        <div className='section'>
            <h3>Directions</h3>

            <p>{park.directionsInfo || children}</p>
            <a target='_blank' href={park.directionsUrl}>
                Official National Park Directions
            </a>

            <div style={{ display: "grid", gridTemplateColumns: "1fr  1fr", margin: "0.5em 0", gap: "1em" }}>
                <div>
                    <h4>Address</h4>
                    <DirectionAddress addresses={addresses} />
                </div>
                <div>
                    <h4>Coordinates</h4>
                    <p>
                        <a
                            target='_blank'
                            href={`https://www.google.com/maps/search/?api=1&query=${park.latitude},${park.longitude}`}
                        >
                            Latitude: {park.latitude.slice(0, 8)},<br />
                            Longitude: {park.longitude.slice(0, 8)}
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
        <div className='section'>
            <h3>Weather</h3>
            <p className='mb-1'>{weather}</p>
            {children}
        </div>
    );
};

const CategoryCard = ({ category, data, path }: { category: string; data: any; path: string }) => {
    const name = data.name || data.title;
    const href = name.replace(/\ /g, "-").toLowerCase();
    const link = (
        <p className='bold'>
            <Link to={`./${path}/#${href}`}>{name}</Link>
        </p>
    );
    const description = <p>{data.description || data.shortDescription}</p>;

    switch (category) {
        case "Events":
            const date = new Date(data.date.replace(/-/g, "/")).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            return (
                <div>
                    <span className='bold'>{date}</span>
                    {link}
                    <div dangerouslySetInnerHTML={{ __html: data.description.replaceAll("<br /><br />", "</p><p>") }} />
                </div>
            );

        default:
            return (
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
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

export const CategorySection = ({ activeCategories }: { activeCategories: ActiveCatergory[] }) => {
    const sections = activeCategories.map((category) => (
        <div className='section' key={category.name} id={category.name.replaceAll(" ", "-").toLowerCase()}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "0.25em" }}>
                {category.icon}
                <br />
                <Link to={category.path}>{category.name}</Link> ({category.count})
            </h3>

            {/* Accordian */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5em", marginTop: "0.5em" }}>
                {uniqueCategoryItems(category.data).map((data) => (
                    <CategoryCard
                        key={data.name || data.title}
                        category={category.name}
                        data={data}
                        path={category.path}
                    />
                ))}
                <button>
                    <Link to={category.path}>Read more about {category.name}</Link>
                </button>
            </div>
        </div>
    ));

    return <>{sections}</>;
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
    others?: boolean
}

export const ParkCards = ({ parks, title, states }: StateParksProps) => {
    const [filters, setFilters] = useState<FilterProps>(initFilters);
    const filteredParks = filterParks(filters, parks);

    // console.log('states', states)

    // Coords for map
    const parkCoords: IMarker[] = filteredParks.filter(p => p.latitude && p.longitude).map(p => ({
                longitude: parseFloat(p.longitude),
                latitude: parseFloat(p.latitude),
                name: p.fullName,
                id: p.parkCode,
                active: true,
    }))


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
        <MainContainer>
            {title && <h2 className='title'>{title}</h2>}

            {/* Map with parks */}
            <StyledCard style={{ position: "relative" }}>
                <LeafletMap states={states} parkCoords={parkCoords} />
            </StyledCard>

            <div id='other-parks'>
                {/* TWO COMPONENTS BELOW MIGHT BE COMBINABLE  */}
                {<ParkCardFilters
                    otherParks={filteredParks}
                    toggleFilter={toggleFilter}
                    // state={state}
                />}

                <div>
                    {filteredParks.length > 0 ? (
                        <ParkCardGrid grid={true} parks={filteredParks} showDescription={false} />
                    ) : (
                        <h2>No parks match these filters</h2>
                    )}
                </div>
            </div>
        </MainContainer>
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
        margin-bottom: 1em;

        position: sticky;
        top: 0;
        z-index: ${({ theme }) => theme.zIndex.dropdown};

        background-color: ${({ theme }) => theme.colors.white};
    }

    /* @media (min-width: 768px) {
		padding: 2em;
		gap: 1em;
	} */
`;

const MapBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;
export { ParkCardGrid };
