import { Link } from "react-router";
import { useEffect, useState } from "react";

const ParkAlertItem = (alert: any) => {
    return (
        <div className="border rounded-xl border-dashed p-4 bg-yellow-500 text-black">
            <h3 className="font-black">{alert.category}</h3>
            <p className='border-b pb-2 mb-2'>{alert.title}</p>
            <p>{alert.description}</p>
            <Link to={alert.url}>NPS Info</Link>
        </div>
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

    if (alerts.length <= 0) return
    // if (alerts.length <= 0) return (
    //     <StyledCardContainer id='alerts'>
    //         <h2>NO ALERTS</h2>
    //     </StyledCardContainer>
    // )

    return (
        <div id='alerts'>
            {/* <h2 className="col-span-2 text-6xl font-thin mb-4">Alerts</h2> */}
            <div className='grid grid-cols-2 gap-8'>
                {alerts.map((alert: any) => (
                    <ParkAlertItem key={alert.id} {...alert} />
                ))}
            </div>
        </div>
    );
};
