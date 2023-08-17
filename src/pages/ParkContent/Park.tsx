import { useContext } from "react";
import { useParams, Link, useLoaderData } from "react-router-dom";

import ParkContext from "../../utils/hooks/ParkContext";
import { ActivityDetails, activityCategories } from "../../utils/lib/activityCategories";

export interface ParkProps {
    park: any;
}

interface ActiveCatergory extends ActivityDetails {
    data: any[];
    count: number;
}

interface HeaderProps extends ParkProps {
    activeCategories: ActiveCatergory[];
}

interface LoaderProps {
    thingsToDo: any[];
    camping: any[];
    events: any[];
    tours: any[];
    visitorCenters: any[];
    parking: any[];
}

const ParkHeader = ({ park, activeCategories }: HeaderProps) => {
    const categories = activeCategories.map((category: ActivityDetails, i: number) => (
        <span key={category.name}>
            {i > 0 && <> - </> /*this is a divider*/}
            <a href={"#" + category.name.replaceAll(" ", "-").toLowerCase()}>
                {category.count} {category.name}
            </a>
        </span>
    ));

    return (
        <div className='section' style={{ display: "flex", flexDirection: "column" }}>
            <h2>{park.fullName}</h2>
            <div style={{ margin: "auto 0", display: "flex", flexWrap: "wrap", gap: "0.25em" }}>{categories}</div>
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

const DirectionSection = ({ park }: ParkProps) => {
    const { addresses } = park;

    return (
        <div className='section'>
            <h3>Directions</h3>

            <p>{park.directionsInfo}</p>
            <a target='_blank' href={park.directionsUrl}>
                Official National Park Directions
            </a>

            <div style={{ display: "grid", gridTemplateColumns: "1fr  1fr", margin: "0.5em 0" }}>
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
                            Lat: {park.latitude},<br />
                            Log: {park.longitude}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

const WeatherSection = ({ weather }: any) => {
    return (
        <div className='section'>
            <h3>Weather</h3>
            <p className='mb-1'>{weather}</p>
            <p>Weather API info</p>
        </div>
    );
};

const uniqueCategoryItems = (categories: any) => {
    const unique = Array.from(new Set(categories.map((obj: any) => obj.name || obj.title))).map((id) => {
        return categories.find((obj: any) => obj.name === id || obj.title === id);
    });
    return unique;
};

const CategoryCard = ({ category, data }: { category: string; data: any }) => {
    switch (category) {
        case "Visitor Centers":
            return (
                <div>
                    <h4 style={{ display: "flex", alignItems: "center", gap: "1em" }}>
                        <Link to={"./visitor-centers/#" + data.name.replaceAll(" ", "-").toLowerCase()}>
                            {data.name}
                        </Link>{" "}
                        {data.isPassportStampLocation === "1" && (
                            <img
                                title='Passport Stamp Location'
                                src='/passport-book.webp'
                                alt='Passport Stamp'
                                style={{ height: "35px" }}
                            />
                        )}
                    </h4>
                    <p>{data.description}</p>
                </div>
            );
        case "Campgrounds":
            return (
                <div>
                    <h4>
                        <Link to={"./camping/#" + data.name.replaceAll(" ", "-").toLowerCase()}>{data.name}</Link>
                    </h4>
                    <p>{data.description}</p>
                </div>
            );
        case "Things to do":
            return (
                <div>
                    <h4>
                        <Link to={"./things-to-do/#" + data.title.replaceAll(" ", "-").toLowerCase()}>
                            {data.title}
                        </Link>
                    </h4>
                    <p>{data.shortDescription}</p>
                </div>
            );
        case "Events":
            return (
                <div>
                    <span className='bold'>
                        {new Date(data.date.replace(/-/g, "/")).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                    <h4>
                        <Link to={"./events/#" + data.title.replaceAll(" ", "-").toLowerCase()}>{data.title}</Link>
                    </h4>
                    <div dangerouslySetInnerHTML={{ __html: data.description.replaceAll("<br /><br />", "</p><p>") }} />
                </div>
            );

        default:
            return <div>{data.name || data.title}</div>;
    }
};

const CategorySection = ({ activeCategories }: { activeCategories: ActiveCatergory[] }) => {
    const sections = activeCategories.map((category) => (
        <div className='section' key={category.name} id={category.name.replaceAll(" ", "-").toLowerCase()}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "0.25em" }}>
                {category.icon}
                <br />
                <Link to={category.name.replaceAll(" ", "-").toLowerCase()}>{category.name}</Link>
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5em", marginTop: "0.5em" }}>
                {uniqueCategoryItems(category.data).map((data) => (
                    <CategoryCard key={data.name || data.title} category={category.name} data={data} />
                ))}
            </div>
        </div>
    ));

    return <>{sections}</>;
};

const categories = (loaderData: LoaderProps) => {
    return Object.keys(activityCategories)
        .map((category) => ({
            ...activityCategories[category],
            count: loaderData[category as keyof LoaderProps].length,
            data: loaderData[category as keyof LoaderProps],
        }))
        .filter((c) => c.count > 0);
};

const Park = () => {
    const parks = useContext(ParkContext);
    const loaderData = useLoaderData() as LoaderProps;
    const { parkId } = useParams();

    const park = parks.find((park: any) => park.parkCode === parkId);
    const activeCategories = categories(loaderData);

    return (
        <div className='content'>
            <ParkHeader park={park} activeCategories={activeCategories} />

            <p className='section'>{park.description}</p>

            <DirectionSection park={park} />

            <WeatherSection weather={park.weatherInfo} />

            <CategorySection activeCategories={activeCategories} />
        </div>
    );
};

export default Park;
