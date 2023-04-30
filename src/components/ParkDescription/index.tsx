import { Link } from "react-router-dom"
import styled from 'styled-components';

const InfoBox = styled.div`
    /* width: 50%; */
    padding: 1em;
    
    p{ margin-bottom: 1em; }
    
    .fees {
        margin-bottom: 1em;
        p{
            margin: 0;
        }
    }
`;


export const ParkDescription = ({ park }: any) => {
    return (
        <InfoBox>
            <h2>About {park.fullName}</h2>
            <p>{park.description}</p>  
            <p>{park.weatherInfo}</p>
            <div className="fees">
                <h3>Fees</h3>
                {park.entranceFees.map((fee: any) => (
                    <p key={fee.title}>
                        <b>${fee.cost}</b> - {fee.title} <br/>
                        <i>{fee.description}</i>
                    </p>
                ))}
            </div>
            <div className="directions"> 
                <h3>Directions</h3>
                <p>
                    {park.directionsInfo}
                    <br/>
                    <b>Coordinates</b>: {park.latitude}, {park.longitude}<br/>
                </p>
                <Link to={park.directionsUrl}>Nation Park Directions</Link>
            </div>
            <Link to={park.url}>National Parks Page</Link>
            
        </InfoBox>
    )
}