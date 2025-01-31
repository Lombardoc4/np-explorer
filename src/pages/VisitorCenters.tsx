import { useContext, useEffect, useState } from "react";
import ParkContext from "../utils/hooks/ParkContext";
import { SymbolMap } from "../utils/lib/symbolMap";
import { fetcher } from "../utils/helper";
import { scrollToHash } from "../utils/helper";
import { ContactCard } from "./Park/Sidebar";
import { MainGrid, StyledSidebar } from "./Park/components/StyledParkComponents";
import { DirectionSection } from "./Park/components";
import { CardItem, StyledCard, StyledCardContainer } from "../components/styled/StyledCard";
import { Loader } from "../components/Loader";
import { useLoaderData } from "react-router";
import { styled } from "styled-components";

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
    const park = useContext(ParkContext);
    // const [visitorCenters, setVisitorCenters] = useState<any[]>([]);
    const {visitorCenters} = useLoaderData() as {visitorCenters: any[]};

    // useEffect(() => {
    //     // fetch visitorCenters
    //     fetcher(`visitorcenters?parkCode=${park.parkCode}`).then((data) => setVisitorCenters(data));
    // }, []);

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
    if (visitorCenters.length <= 0) return <Loader val={"Visitor Centers"} />;

    return (
        <>
            <h1 className='container'>Visitor Centers</h1>

            {visitorCenters.map((vc: any) => (
                <VCSection key={vc.id} vc={vc} />
            ))}
        </>
    );
};

export default VisitorCenters;

const VCSection = ({ vc }: { vc: any }) => {
    return (
        <MainGrid id={vc.name.replaceAll(" ", "-").toLowerCase()}>
            <div className='content'>
                <div className='section'>
                    <div style={{ display: "flex", gap: "1em", alignItems: "center" }}>
                        {vc.isPassportStampLocation === "1" && (
                            <img
                                title='Passport Stamp'
                                src='/passport-book.webp'
                                alt='Passport Stamp'
                                style={{ height: "30px" }}
                            />
                        )}
                        <h2>{vc.name}</h2>
                    </div>
                    <p>{vc.description}</p>
                </div>
                {vc.amenities.length > 0 && (
                    <div className='section'>
                        <h3 style={{ gridColumn: "1 / -1" }}>Amenities</h3>
                        <StyledAmenities>
                            {vc.amenities.map((amenity: any) => (
                                <div className="amenity" key={amenity}>
                                    <img
                                        width={24}
                                        height={24}
                                        src={`https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/${SymbolMap[amenity]}-black-22.svg`}
                                    />{" "}
                                    <span className='bold'>{amenity}</span>
                                </div>
                            ))}
                        </StyledAmenities>
                    </div>
                )}

                <DirectionSection park={vc} />
            </div>

            <StyledSidebar>
                {vc.images.length > 0 && (
                    // testImageSource(vc.images[0].url)) &&
                    <StyledCard className='img-container'>
                        <img src={vc.images[0].url} alt={vc.images[0].altText} />
                    </StyledCard>
                )}
                <StyledCardContainer>
                    <h2>Hours</h2>
                    <StyledCard>
                        {vc.operatingHours.map((operatingHours: any) => (
                            <CardItem key={vc.id + 'hours'}>{getOperatingHours(operatingHours)}</CardItem>
                        ))}
                        <CardItem>{vc.operatingHours[0].description}</CardItem>
                    </StyledCard>
                </StyledCardContainer>
                <ContactCard contacts={vc.contacts} url={vc.url} />
            </StyledSidebar>
        </MainGrid>
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
`
