
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import styled from 'styled-components';

interface AlertBoxProps {
    $open: Boolean
}

const AlertBox = styled.div<AlertBoxProps>`
    position: fixed;
    top: 70px;
    width: 100%;
    height: calc(100vh - 70px);
    padding: 1em 1em 6em;
    overflow-y: scroll;
    opacity: ${({ $open }) => $open ? '1' : '0'};
    transition: opacity 0.6s ease-in-out 0s;
    pointer-events: ${({ $open }) => $open ? 'auto' : 'none'};
    display: block;
    
    .alerts {
        background-color: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.black};
        border: 2px solid ${({ theme }) => theme.colors.black};
        border-radius: 5px;
        padding: 1em;
        box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 8px;
        
        max-width: 800px;
        transform: ${({ $open }) => $open ? 'translateY(0%)' : 'translateY(100%)'};
        transition: transform 0.6s ease-in-out 0s, opacity 0.6s ease-in-out 0s;
    }
    
    h2{
        border-bottom: 1px solid ${({ theme }) => theme.colors.black};
    }
    
    @media (min-width: 768px) {
        top: 0;
        height: 100vh;
        padding: 1em 2em;
    }
`;

const AlertFloat = styled.button`
    position: fixed;
    bottom: 1em;
    left: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: 3.5em; */
    /* height: 3.5em; */
    z-index: ${({ theme }) => theme.zIndex.navbar};
    padding: 0.5em;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.black};
    border-radius: 5px;
    border: 2px solid ${({ theme }) => theme.colors.black};
    box-shadow: rgba(0, 0, 0, 0.26) 0px 0 8px -4px;
    outline: none;
    
    .badge {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        background-color: ${({ theme }) => theme.colors.black};
        color: ${({ theme }) => theme.colors.white};
        border-radius: 5px;
        width: 1.5em;
        height: 1.5em;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.75em;
        
    }  
    
    @media (min-width: 768px) {
        bottom: 2em;
        left: 2em;
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
    
    return(
        <AlertItem key={alert}>
            <p><b>{alert.category}</b> - {alert.title}</p>
            <p>{alert.description}</p>
            <Link to={alert.url}>NPS Info</Link>
        </AlertItem>
    )
}

export const ParkAlert = ({parkId}: {parkId: string}) => {
    const [alerts, setAlerts] = useState<any>([]);
    const [showAlerts, setShowAlerts] = useState<Boolean>(false);
    
    useEffect(() => {
        // Get Alerts for Park from API
        const fetchAlerts = async () => {
            const response = await fetch(`https://developer.nps.gov/api/v1/alerts?parkCode=${parkId}&api_key=${import.meta.env.VITE_NPS_API_KEY}`);
            const data = await response.json();
            setAlerts(data.data);
        }
        fetchAlerts();
    }, [parkId]);
    
    const toggleAlerts = () => {
        setShowAlerts(!showAlerts);
        document.body.classList.toggle('no-scroll');
    }
    
    if (alerts.length <= 0) return (<></>);
    
    return (
        <>
        
                    
        <AlertBox $open={showAlerts} className="overlay" onClick={toggleAlerts}>
            <div className="alerts" onClick={(e) => e.stopPropagation()}>
                
            <h2>ALERTS</h2>
            
            {/* {alerts.length > 0  && 
            <p style={{fontSize: '0.75em', fontStyle: 'italic', textTransform: 'uppercase'}}>Click alerts to read details</p>} */}
            
            {alerts.length > 0 &&
                alerts.map((alert: any) => (
                    <ParkAlertItem key={alert.id} {...alert} />
                    ))
            }
            </div>
        </AlertBox>
                
        <AlertFloat onClick={toggleAlerts}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
            </svg>
            <div className="badge">
                {alerts.length}
            </div>
        </AlertFloat>
        </>
    )
}