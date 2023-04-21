
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import styled from 'styled-components';

const AlertBox = styled.div`
    padding: 1em;
    margin: 1em;
    background-color: #f9f9f9;
    color: #507743;
    border-radius: 5px;
    box-shadow: rgba(80, 119, 67, 0.26) 0px 2px 8px;
    
    p:not(:last-child){
        padding: 0.5em 0;
        border-bottom: 1px solid #507743;
    }
    
    a { text-decoration: underline }
`;

const ToggleButton = styled.button`
    display: flex;
    align-items: center;
    color: #507743;
    padding: 0;
    background-color: transparent;
    border: none;
    outline: none;
    border-radius: 0;
    text-decoration: underline;
    &:focus{
        outline: none;
    }
    
    div{
        transform: ${props => props.show ? 'rotate(0deg)' : 'rotate(90deg)'};
        transition: transform 0.2s ease-in-out;
    }
    
`;

const ParkAlertItem = (alert: any) => {
    const [showInfo, setShowInfo] = useState(false);
    
    return(
        <p key={alert}>
            <b>{alert.category}</b> - {alert.title}
            <ToggleButton show={showInfo} onClick={() => setShowInfo(!showInfo)}>
                {showInfo ? 'Hide' : 'Show'}
                <span style={{display: 'inline-block', marginLeft: '0.5em'}}>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                </span>
            </ToggleButton>
            {showInfo && <>
            {alert.description}
            <br/>
            <Link to={alert.url}>NPS Info</Link>
            </>}
        </p>
    )
}

export const ParkAlert = ({parkId}: {parkId: string}) => {
    const [alerts, setAlerts] = useState<any>([]);
    
    console.log('fetch again');
    
    useEffect(() => {
        // Get Alerts for Park from API
        const fetchAlerts = async () => {
            const response = await fetch(`https://developer.nps.gov/api/v1/alerts?parkCode=${parkId}&api_key=${import.meta.env.VITE_NPS_API_KEY}`);
            const data = await response.json();
            setAlerts(data.data);
        }
        fetchAlerts();
    }, [parkId]);
    
    return (
        <AlertBox>
                    <h2>ALERTS</h2>
                    {alerts.length > 0 ? (
                        <>
                        {alerts.map((alert: any) => (
                            <ParkAlertItem key={alert.id} {...alert} />
                        ))}
                        
                        </>
                    ) : (
                        <p>No Alerts</p>
                    )}
                </AlertBox>
    )
}