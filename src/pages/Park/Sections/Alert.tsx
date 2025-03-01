import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { ParkSection } from '../components/section';
import { LinkIcon } from 'lucide-react';

export const ParkAlert = ({ parkId }: { parkId: string }) => {
  const [alerts, setAlerts] = useState<any>([]);

  useEffect(() => {
    // Get Alerts for Park from API
    fetch(
      `https://developer.nps.gov/api/v1/alerts?parkCode=${parkId}&api_key=${import.meta.env.VITE_NPS_API_KEY}`,
    )
      .then((res: any) => {
        return res.json();
      })
      .then((data: any) => {
        setAlerts(data.data);
      });
  }, [parkId]);

  if (alerts.length <= 0) return;

  return (
    <ParkSection name='Alerts'>
      {alerts.map((alert: any) => (
        <ParkAlertItem key={alert.id} {...alert} />
      ))}
    </ParkSection>
  );
};

const ParkAlertItem = (alert: any) => {
  return (
    <div className='border-accent h-fit rounded-lg border border-dashed p-4'>
      <h3 className='text-lg font-black'>{alert.category}</h3>
      <p>{alert.title}</p>
    </div>
  );
};
