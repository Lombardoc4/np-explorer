
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import styled from 'styled-components';

interface Props {
    show: Boolean
}

const AlertBox = styled.div`
    padding: 1em;
    margin: 1em 0;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.black};
    /* color: #507743; */
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 8px;
    border: 2px solid ${({ theme }) => theme.colors.black};
    
    
    h2{
        border-bottom: 1px solid ${({ theme }) => theme.colors.black};
    }
`;

const AlertItem = styled.div`
    
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* color: #507743; */
    padding: 0;
    background-color: transparent;
    border: none;
    outline: none;
    border-radius: 0;
    margin: 0.5em 0;
    
    p { margin-bottom: 0.25em;}
    
    a {
        text-decoration: underline;
    }
    
    .preview {
        cursor: pointer;
    }
    
    &:not(:last-child){
        padding: 0.5em 0;
        border-bottom: 1px solid ${({ theme }) => theme.colors.black};
    }
  
`;

const ParkAlertItem = (alert: any) => {
    const [showInfo, setShowInfo] = useState<Boolean>(true);
    
    return(
        <AlertItem key={alert}>
            <p><b>{alert.category}</b> - {alert.title}</p>
            {showInfo && <>
                <p>{alert.description}</p>
                <Link to={alert.url}>NPS Info</Link>
            </>}
        </AlertItem>
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
    
    if (alerts.length <= 0) return (<></>);
    
    return (
        <AlertBox>
                    <h2>ALERTS</h2>
                    
                    {/* {alerts.length > 0  && 
                    <p style={{fontSize: '0.75em', fontStyle: 'italic', textTransform: 'uppercase'}}>Click alerts to read details</p>} */}
                    
                    {alerts.length > 0 ? 
                        alerts.map((alert: any) => (
                            <ParkAlertItem key={alert.id} {...alert} />
                        ))
                        
                      : <p>No Alerts</p>
                    }
                </AlertBox>
    )
}