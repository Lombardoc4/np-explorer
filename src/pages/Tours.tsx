import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import ParkContext from "../utils/hooks/ParkContext";
import { Loader } from "../components/Loader";
import { MainGrid, StyledSidebar } from "./Park/components/StyledParkComponents";
import { CardItem, StyledCard, StyledCardContainer } from "../components/styled/StyledCard";
import { FireIcon, HeadPhoneIcon } from "../assets/icons";
import { scrollToHash } from "../utils/helper";
// import { ParkHeader } from "./Park";

const Tours = () => {
    const park = useContext(ParkContext);
    // const [tours, setTours] = useState<any[]>([]);
    const {tours} = useLoaderData() as {tours: any[]};

    // useEffect(() => {
    //     // fetch tours
    //     const fetchCall = async () => {
    //         const response = await fetch(
    //             `https://developer.nps.gov/api/v1/tours?parkCode=${park.parkCode}&api_key=${
    //                 import.meta.env.VITE_NPS_API_KEY
    //             }`
    //         );
    //         const data = await response.json();
    //         setTours(data.data);
    //     };
    //     fetchCall();
    //     // settours
    // }, []);

    useEffect(() => {
        scrollToHash();
    }, [tours]);

    // TODO : Change this to error page
    if (tours.length <= 0) return <Loader val={"Tours"} />;

    // console.log("tours", tours);
    return (
        <>
            <h1 className='container'>Tours</h1>
            {tours.map((tour: any) => (
                <TourSection tour={tour} />
            ))}
        </>
    );
};

export default Tours;

const TourSection = ({ tour }: { tour: any }) => {
    return (
        <MainGrid>
            <div className='content'>
                <div className='section'>
                    <h2>{tour.title}</h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5em 0.25em", marginTop: "0.5em" }}>
                        {tour.tags.map((tag: string) => (
                            <small
                                key={tag}
                                style={{
                                    backgroundColor: "#f1f1f1",
                                    textTransform: "capitalize",
                                    padding: "0.25em 0.75em",
                                    borderRadius: "1em",
                                }}
                            >
                                {tag}
                            </small>
                        ))}
                    </div>
                </div>
                <div className='section'>
                    <h3>Tour Stops</h3>
                    {tour.stops.map((stop: any) => (
                        <TourStop stop={stop} key={stop.assetId} />
                    ))}
                </div>

                <p>{tour.url}</p>
            </div>
            <StyledSidebar>
                <StyledCard className='img-container'>
                    <img src={tour.images[0].url} alt={tour.images[0].altText} />
                </StyledCard>
                <StyledCardContainer>
                    <h2>General Info</h2>
                    <StyledCard>
                        <CardItem>
                            <p className='bold'>
                                {tour.durationMin}-{tour.durationMax} {tour.durationUnit === "m" ? "minutes" : "hours"}
                            </p>
                        </CardItem>
                        <CardItem>
                            <p>{tour.description}</p>
                        </CardItem>
                    </StyledCard>
                </StyledCardContainer>
            </StyledSidebar>
        </MainGrid>
    );
};

const TourStop = ({ stop }: any) => {
    const [full, readFull] = useState(false);
    return (
        <div className='section'>
            <p className='bold'>{stop.assetName}</p>
            <p>
                {/* {full ? stop.significance : stop.significance.split(" ").slice(0, 25).join(" ") + "..."} */}
                <span className={!full ? "truncate" : ""}>{stop.significance}</span>
                <a className='btn' style={{ float: "right" }} onClick={() => readFull(!full)}>
                    Show {full ? "Less" : "More"}
                </a>
            </p>

            <p>
                <Link target='_blank' className='btn' to={stop.audioFileUrl}>
                    <HeadPhoneIcon /> Listen to transcript
                </Link>
            </p>

            <p>
                <span className='bold'>Next stop:</span> {stop.directionsToNextStop}
            </p>
        </div>
    );
};
