import { Link } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CardItem, StyledCard, StyledCardContainer } from "../styled/StyledCard";

const ParkAlertItem = (alert: any) => {
    return (
        <CardItem>
            <h3>{alert.category}</h3>
            <p className='bold'>{alert.title}</p>
            <p>{alert.description}</p>
            <Link to={alert.url}>NPS Info</Link>
        </CardItem>
    );
};

export const ParkAlert = ({ parkId }: { parkId: string }) => {
    const [alerts, setAlerts] = useState<any>([]);

    useEffect(() => {
        // Get Alerts for Park from API
        fetch(`https://developer.nps.gov/api/v1/alerts?parkCode=${parkId}&api_key=${import.meta.env.VITE_NPS_API_KEY}`)
            .then((res: any) => {
                return res.json();
            })
            .then((data: any) => {
                setAlerts(data.data);
            });
    }, [parkId]);

    if (alerts.length <= 0) return (
        <StyledCardContainer id='alerts'>
            <h2>NO ALERTS</h2>
        </StyledCardContainer>
    )

    return (
        <StyledCardContainer id='alerts'>
            <h2>ALERTS</h2>
            <StyledAlertBox onClick={(e) => e.stopPropagation()}>
                { alerts.map((alert: any) => <ParkAlertItem key={alert.id} {...alert} />)}
            </StyledAlertBox>
        </StyledCardContainer>
    );
};

const StyledAlertBox = styled(StyledCard).attrs((props) => ({
    $bg: props.theme.colors.secondary,
    $border: "2px solid " + props.theme.colors.black,
}))`
    box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 8px;
`;
