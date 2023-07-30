import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "../components/Header"
import ParkContext from "../utils/hooks/ParkContext";
import { stateMap } from "../utils/lib/stateMap";
import { ParkHeader } from "./Park";
import passbook from '/passport-book.webp';
import { SymbolMap } from "../utils/symbolMap";


const daysOfWeek= [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
]
  


const VisitorCenters = () => {
    const {parkId} = useParams();
    const parks = useContext(ParkContext);  
    const park = parks.find((park: any) => park.parkCode === parkId);
    const state = stateMap.filter(state => park.states.toLowerCase().includes(state.id))[0];
    
    const [visitorCenters, setVisitorCenters] = useState<any[]>([]);
    
    useEffect(() => {
        // fetch visitorCenters
        const fetchCall = async () => {
            const response = await fetch(`https://developer.nps.gov/api/v1/visitorcenters?parkCode=${parkId}&api_key=${import.meta.env.VITE_NPS_API_KEY}`);
            const data = await response.json();
            setVisitorCenters(data.data);
        }
        fetchCall();
        // setvisitorCenters
    }, []);
    
    const getOperatingHours = (operatingHours: any) => {
        const {standardHours} = operatingHours;
        
        // See if all days values match
        if (standardHours[daysOfWeek[0]] === standardHours[daysOfWeek[1]] && standardHours[daysOfWeek[1]] === standardHours[daysOfWeek[2]] && standardHours[daysOfWeek[2]] === standardHours[daysOfWeek[3]] && standardHours[daysOfWeek[3]] === standardHours[daysOfWeek[4]] && standardHours[daysOfWeek[4]] === standardHours[daysOfWeek[5]] && standardHours[daysOfWeek[5]] === standardHours[daysOfWeek[6]]) {
            return (
                <p><span style={{textTransform: 'capitalize'}}>Monday - Sunday</span>: {standardHours[daysOfWeek[0]]}</p>
            )
        }
        
        // See if monday - friday values match
        if (standardHours[daysOfWeek[0]] === standardHours[daysOfWeek[1]] && standardHours[daysOfWeek[1]] === standardHours[daysOfWeek[2]] && standardHours[daysOfWeek[2]] === standardHours[daysOfWeek[3]] && standardHours[daysOfWeek[3]] === standardHours[daysOfWeek[4]]) {
            return (  
                <>
                <p><span style={{textTransform: 'capitalize'}}>Monday - Friday</span>: {standardHours[daysOfWeek[0]]}</p>
                <p><span style={{textTransform: 'capitalize'}}>saturday</span>: {operatingHours.standardHours['saturday']}</p>
                <p><span style={{textTransform: 'capitalize'}}>sunday</span>: {operatingHours.standardHours['sunday']}</p>
                </>  
            )
        }
        
        return daysOfWeek.map((day: string) => {
            if (operatingHours.standardHours[day] !== "") {
                return (
                    <p><span style={{textTransform: 'capitalize'}}>{day}</span>: {operatingHours.standardHours[day]}</p>
                )
            }
        })
    }
    
    
//     const testImageSource = (url: string) => {
//         let imageFound = false;
//         var tester=new Image();
//         tester.onload=() => {imageFound=true};
//         tester.src= url;
        
//         return imageFound;
// }
    
    console.log('visitorCenters', visitorCenters);

    return (
        <>
            <div className="container">
                <Link to={`/park/${parkId}`}>
                    <button>Back</button>
                </Link>
                <h1>VisitorCenters</h1>
                {visitorCenters.length > 0 &&
                    visitorCenters.map((vc: any) => (
                        <div key={vc.id} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '4em 2em', gap: '2em'}}>
                            <div >
                                <div style={{display: 'flex', gap: '1em', alignItems: 'center'}}>
                                    {vc.isPassportStampLocation === '1' && <img title="Passport Stamp" src={passbook} alt="Passport Stamp" style={{height: '30px'}}/>}
                                    <h2>{vc.name}</h2>
                                </div>
                            <p>{vc.description}</p>
                            
                            <h3>Hours of Operations</h3>
                            <div>
                                {vc.operatingHours.map((operatingHours: any) => getOperatingHours(operatingHours))}
                            </div>
                            <p>{vc.operatingHours[0].description}</p>
                            
                            { vc.amenities.length > 0 &&
                                    <div style={{display: 'grid', gridTemplateColumns: "1fr 1fr", gap: '1em'}}>
                                        <h3 style={{gridColumn: '1 / -1'}}>Amenities</h3>
                                        {vc.amenities.map((amenity: any) => (
                                            <div style={{display: 'flex', alignItems: 'center', gap: '0.5em'}} key={amenity}>
                                                <img src={`https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/${SymbolMap[amenity]}-black-22.svg`}/>
                                                {' '}
                                                <p>{amenity}</p>
                                            </div>
                                        ))}
                                    </div>
                                }
                            
                            </div>
                            <div>
                                { vc.images.length > 0 && 
                                // testImageSource(vc.images[0].url)) &&
                                    <div className="img-container">
                                        <img src={vc.images[0].url} alt={vc.images[0].altText} />
                                    </div>
                                }
                                <h3>Direction</h3>
                            <p>{vc.directionsInfo}</p>
                            <p>Coordinates: <a href={`http://www.google.com/maps/place/${vc.latitude},${vc.longitude}`}>{vc.latitude.slice(0, 8)}, {vc.longitude.slice(0, 8)}</a></p>
                            <p><a href={vc.directionsUrl}>NPS Directions</a></p>
                    
                            <h3>Contact Info</h3>
                            { vc.contacts.phoneNumbers.length > 0 &&
                                vc.contacts.phoneNumbers.map(({phoneNumber}: {phoneNumber: string}) => (
                                    <p key={phoneNumber}>Phone: <a href={`tel:${phoneNumber}`}>{phoneNumber.slice(0, 3)}-{phoneNumber.slice(4, 7)}-{phoneNumber.slice(8, 12)}</a></p>
                                    ))   
                                }
                            { vc.contacts.emailAddresses.length > 0 &&
                                vc.contacts.emailAddresses.map(({emailAddress}: {emailAddress: string}) => (
                                    <>
                                        {emailAddress.length > 0 &&
                                            <p key={emailAddress}>Email: <a href={`mailto:${emailAddress}`}>{emailAddress}</a></p>
                                        }
                                    </>
                                ))   
                            } 
                            <br/>   
                            <p><a href="{vc.url}">National Park Page</a></p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default VisitorCenters;