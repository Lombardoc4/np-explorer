import { useEffect, useState } from "react";
import { SymbolMap } from "../utils/lib/symbolMap";
import { fetcher } from "../utils/helper";
import { scrollToHash } from "../utils/helper";
import { Loader } from "../components/Loader";
import { useParams } from "react-router";
import { styled } from "styled-components";
import { DirectionSection } from "./Park/Sections/Direction";
import { AnchorLink } from "./Park/Page";
import { ParkSection, ParkSectionTitle } from "./Park/Sections";
import clsx from "clsx";

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const getOperatingHours = (operatingHours: any) => {
    const { standardHours } = operatingHours;

    // See if all days values match
    if (
        standardHours[daysOfWeek[0]] === standardHours[daysOfWeek[1]] &&
        standardHours[daysOfWeek[1]] === standardHours[daysOfWeek[2]] &&
        standardHours[daysOfWeek[2]] === standardHours[daysOfWeek[3]] &&
        standardHours[daysOfWeek[3]] === standardHours[daysOfWeek[4]] &&
        standardHours[daysOfWeek[4]] === standardHours[daysOfWeek[5]] &&
        standardHours[daysOfWeek[5]] === standardHours[daysOfWeek[6]]
    ) {
        return (
            <p>
                <span style={{ textTransform: "capitalize" }}>Monday - Sunday</span>: {standardHours[daysOfWeek[0]]}
            </p>
        );
    }

    // See if monday - friday values match
    if (
        standardHours[daysOfWeek[0]] === standardHours[daysOfWeek[1]] &&
        standardHours[daysOfWeek[1]] === standardHours[daysOfWeek[2]] &&
        standardHours[daysOfWeek[2]] === standardHours[daysOfWeek[3]] &&
        standardHours[daysOfWeek[3]] === standardHours[daysOfWeek[4]]
    ) {
        return (
            <>
                <p>
                    <span style={{ textTransform: "capitalize" }}>Monday - Friday</span>: {standardHours[daysOfWeek[0]]}
                </p>
                <p>
                    <span style={{ textTransform: "capitalize" }}>saturday</span>:{" "}
                    {operatingHours.standardHours["saturday"]}
                </p>
                <p>
                    <span style={{ textTransform: "capitalize" }}>sunday</span>:{" "}
                    {operatingHours.standardHours["sunday"]}
                </p>
            </>
        );
    }

    return daysOfWeek.map((day: string) => {
        if (operatingHours.standardHours[day] !== "") {
            return (
                <p>
                    <span style={{ textTransform: "capitalize" }}>{day}</span>: {operatingHours.standardHours[day]}
                </p>
            );
        }
    });
};

const VisitorCenters = () => {
    // const park = useContext(ParkContext);
    const { parkId } = useParams();

    const [visitorCenters, setVisitorCenters] = useState<any[]>([]);
    // const {visitorCenters} = useLoaderData() as {visitorCenters: any[]};

    useEffect(() => {
        // fetch visitorCenters
        // const fetchVCs = async () => {
        //     await fetcher(`visitorcenters?parkCode=${parkId}`).then((data) => setVisitorCenters(data));
        // };
        // fetchVCs();
        fetcher(`visitorcenters?parkCode=${parkId}`).then((data) => setVisitorCenters(data));
    }, []);

    useEffect(() => {
        scrollToHash();
    }, [visitorCenters]);

    //     const testImageSource = (url: string) => {
    //         let imageFound = false;
    //         var tester=new Image();
    //         tester.onload=() => {imageFound=true};
    //         tester.src= url;

    //         return imageFound;
    // }

    // TODO : Change this to error page
    if (!visitorCenters || visitorCenters.length <= 0) return <Loader val={"Visitor Centers"} />;

    return (
        <div className="container mx-auto px-4 xl:px-0">
                        <h2 className='text-4xl md:text-8xl font-thin'>Visitor Centers</h2>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 h-full mt-4 md:mt-8 mb-16'>
                {visitorCenters.map((vc: any) => (
                    <AnchorLink key={vc.name} id={vc.name}/>
                ))}
            </div>
            {visitorCenters.map((vc: any) => (
                <VCSection key={vc.id} vc={vc} />
            ))}
        </div>
    );
};

export default VisitorCenters;

const AmentyItem = ({ amenity }: { amenity: string }) => {
    const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const imageColor = isDarkMode ? "white" : "black";
    return (
        <div className='flex items-center gap-4'>
            <img
                width={32}
                height={32}
                src={`https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/${SymbolMap[amenity]}-${imageColor}-22.svg`}
            />{" "}
            <span className='bold'>{amenity}</span>
        </div>
    );
};

const VCSection = ({ vc }: { vc: any }) => {
    return (
        <div className='my-16'>
            <ParkSection name={vc.name}>
                <div className='col-span-2 grid md:grid-cols-2 gap-4 md:gap-8'>
                    {vc.images.length > 0 && (
                        <div className='md:order-2 border border-dashed rounded-xl overflow-hidden h-fit'>
                            <img src={vc.images[0].url} className='w-full mx-auto' alt={vc.images[0].altText} />
                        </div>
                    )}
                    <div className='grid gap-8 items-stretch'>
                        <p className='text-xl'>{vc.description}</p>
                    </div>
                </div>
                <div className='col-span-2'>
                    <ParkSectionTitle>
                        Hours
                        </ParkSectionTitle>

                    <div className="my-4">
                        {vc.operatingHours.map((operatingHours: any) => (
                            <p key={vc.id + "hours"}>{getOperatingHours(operatingHours)}</p>
                        ))}
                    </div>
                    <p className="text-xl">{vc.operatingHours[0].description}</p>
                </div>
                {vc.amenities.length > 0 && (
                    <div className='col-span-2'>
                        <ParkSectionTitle>Amenities</ParkSectionTitle>
                        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4'>
                            {vc.amenities.map((amenity: any) => (
                                <AmentyItem key={amenity} amenity={amenity} />
                            ))}
                        </div>
                    </div>
                )}
                <div className='col-span-2'>
                    <DirectionSection park={vc} />
                </div>
            </ParkSection>
        </div>
    );
};

const StyledAmenities = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    .amenity {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        text-align: center;
    }

    @media (min-width: 768px) {
        .amenity {
            flex-direction: row;
        }
    }
`;
