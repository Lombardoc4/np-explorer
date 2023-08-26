import { useContext, useEffect, useState } from "react";
import ParkContext from "../../utils/hooks/ParkContext";
import { fetcher } from "../../utils/helper";
import { MainGrid, StyledSidebar } from "./components/StyledParkComponents";
import { ContactCard, FeeCard } from "./Sidebar";
import { DirectionSection } from "./components";
import { CardItem, StyledCard, StyledCardContainer } from "../../components/styled/StyledCard";
import { WeatherDisplay } from "../../components/Weather";

const Camping = () => {
    const park = useContext(ParkContext);

    const [camping, setCamping] = useState<any[]>([]);

    useEffect(() => {
        // fetch camping
        fetcher(`campgrounds?parkCode=${park.parkCode}`).then((data) => setCamping(data));
    }, []);

    if (camping.length <= 0) return <>Loading camping data</>;

    return (
        <>
            <h1 className='container'>Camping</h1>
            {camping.map((camp: any) => (
                <CampingSection key={camp.name} camp={camp} />
            ))}
        </>
    );
};

const CampingSection = ({ camp }: any) => {
    console.log("camps", camp);
    // console.log("camps", camp.campsites, camp.accessibility);
    return (
        <MainGrid>
            <div className='content'>
                <div className='section'>
                    <h2>{camp.name}</h2>
                    <p>{camp.description}</p>
                </div>

                <div className='section'>
                    <h3>Camp Sites</h3>
                    <p style={{ textAlign: "center" }}>
                        {camp.campsites.totalSites} Total Sites : {camp.numberOfSitesFirstComeFirstServe} sites
                        available for First Come, First Serve
                    </p>
                    <div
                        style={{
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "space-evenly",
                            margin: "0.5em 0",
                        }}
                    >
                        <p>
                            <span className='bold'>{camp.campsites.tentOnly}</span>
                            <br />
                            Tent Sites
                        </p>
                        <p>
                            <span className='bold'>{camp.campsites.group}</span>
                            <br />
                            Group Sites
                        </p>
                        <p>
                            <span className='bold'>{camp.campsites.rvOnly}</span>
                            <br />
                            RV Sites
                        </p>
                        <p>
                            <span className='bold'>{camp.campsites.electricalHookups}</span>
                            <br />
                            Electric Hookup Sites
                        </p>
                    </div>
                    <p>
                        <span className='bold'>Fire Policy:</span> {camp.accessibility.fireStovePolicy}
                    </p>
                    <p>
                        <span className='bold'>RV Info:</span> {camp.accessibility.rvInfo}
                    </p>
                    <p>
                        <span className='bold'>Additional Info:</span> {camp.accessibility.additionalInfo}
                    </p>
                </div>

                <div className='section'>
                    <h3>Weather</h3>
                    {camp.weatherOverview}
                    <WeatherDisplay lat={camp.latitude} long={camp.longitude} />
                </div>

                <DirectionSection park={camp}>{camp.directionsOverview}</DirectionSection>
            </div>
            <StyledSidebar>
                <StyledCard className='img-container'>
                    <img src={camp.images[0].url} alt={camp.images[0].altText} />
                </StyledCard>
                <ContactCard contacts={camp.contacts} url={camp.url} />
                <FeeCard entranceFees={camp.fees} />

                <StyledCardContainer>
                    <h2>Reservation</h2>
                    <StyledCard>
                        <CardItem>
                            <p className='bold'>{camp.reservationInfo}</p>
                        </CardItem>
                        {camp.reservationUrl && (
                            <CardItem>
                                <a href={camp.reservationUrl} className='btn' target='_blank'>
                                    Make a reservation now
                                </a>
                            </CardItem>
                        )}
                    </StyledCard>
                </StyledCardContainer>

                <StyledCardContainer>
                    <h2>Accessibility</h2>
                    <StyledCard>
                        <CardItem>
                            <p className='bold'>Road Access:</p>{" "}
                            {camp.accessibility.accessRoads.map((road: string) => (
                                <p>{road}</p>
                            ))}
                        </CardItem>
                        <CardItem>
                            <p className='bold'>ADA Info:</p> {camp.accessibility.adaInfo}
                        </CardItem>
                        <CardItem>
                            <p className='bold'>Wheelchair Info:</p> {camp.accessibility.wheelchairAccess}
                        </CardItem>
                    </StyledCard>
                </StyledCardContainer>
            </StyledSidebar>
        </MainGrid>
    );
};

export default Camping;
