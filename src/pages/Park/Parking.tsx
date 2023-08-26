import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ParkContext from "../../utils/hooks/ParkContext";
import { Loader } from "../../components/Loader";
import { MainGrid, StyledSidebar } from "./components/StyledParkComponents";
import { CardItem, StyledCard, StyledCardContainer } from "../../components/styled/StyledCard";
import { ContactCard, ContactItem } from "./Sidebar";
import { GlobeIcon } from "../../assets/icons";
// import { ParkHeader } from "./Park";

const Parking = () => {
    const park = useContext(ParkContext);

    const [parking, setParking] = useState<any[]>([]);

    useEffect(() => {
        // fetch parking
        const fetchCall = async () => {
            const response = await fetch(
                `https://developer.nps.gov/api/v1/parkinglots?parkCode=${park.parkCode}&api_key=${
                    import.meta.env.VITE_NPS_API_KEY
                }`
            );
            const data = await response.json();
            setParking(data.data);
        };
        fetchCall();
        // setparking
    }, []);

    if (parking.length <= 0) return <Loader val={"parking"} />;

    console.log("parking", parking);

    return (
        <>
            <h1 className='container'>Parking</h1>
            {parking.map((parkingLot: any) => (
                <ParkingSection key={parkingLot.name} parking={parkingLot} />
            ))}
        </>
    );
};

export default Parking;

const ParkingSection = ({ parking }: { parking: any }) => {
    return (
        <MainGrid>
            <div className='content'>
                <div className='section'>
                    <h2>{parking.name}</h2>
                </div>
                <div className='section'>
                    <p>{parking.description}</p>
                </div>
                <div className='section'>
                    <h4>Coordinates</h4>
                    <p>
                        <a
                            target='_blank'
                            href={`https://www.google.com/maps/search/?api=1&query=${parking.latitude},${parking.longitude}`}
                        >
                            Latitude: {("" + parking.latitude).slice(0, 8)},
                            <br />
                            Longitude: {("" + parking.longitude).slice(0, 8)}
                        </a>
                    </p>
                </div>
            </div>
            <StyledSidebar>
                <ContactCard contacts={parking.contacts}>
                    <>
                        <CardItem>
                            <p>
                                Managed by:
                                <br /> {parking.managedByOrganization}
                            </p>
                        </CardItem>
                        {parking.webcamUrl && (
                            <ContactItem>
                                <GlobeIcon width={24} height={24} />
                                <Link to={parking.webcamUrl}>Official National Parks Page</Link>
                            </ContactItem>
                        )}
                    </>
                </ContactCard>
                <StyledCardContainer>
                    <h2>Parking Spaces</h2>
                    <CardItem>
                        <span className='bold'>Total</span>: {parking.accessibility.totalSpaces}
                    </CardItem>
                    <CardItem>
                        <span className='bold'>ADA Spaces</span>: {parking.accessibility.numberofAdaSpaces}
                    </CardItem>
                    <CardItem>
                        <span className='bold'>ADA Van Spaces</span>:{" "}
                        {parking.accessibility.numberofAdaVanAccessbileSpaces}
                    </CardItem>
                    <CardItem>
                        <span className='bold'>Oversize Vehicles</span>:{" "}
                        {parking.accessibility.numberOfOversizeVehicleSpaces}
                    </CardItem>
                </StyledCardContainer>
            </StyledSidebar>
        </MainGrid>
    );
};
