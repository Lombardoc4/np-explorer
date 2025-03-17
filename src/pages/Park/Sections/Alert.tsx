import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { ParkSection } from '../components/section';
import { LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/Modal/modal';

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
    // <ParkSection name='Alerts'>
    <div id='alerts' className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
      {alerts.map((alert: any) => (
        <ParkAlertItem key={alert.id} {...alert} />
      ))}
    </div>
    // </ParkSection>
  );
};

const ParkAlertItem = (alert: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className='bg-accent h-full cursor-pointer rounded-lg border-2 px-4 py-2'
        onClick={() => setIsModalOpen(true)}
      >
        <h3 className='text-lg font-black'>{alert.category}</h3>
        <p className='line-clamp-1 lg:line-clamp-2'>{alert.title}</p>
      </div>
      <Modal
        type={'alert'}
        title={alert.title}
        subtitle={alert.category}
        isOpen={isModalOpen}
        onClose={closeModal}
        content={alert.description}
      />
    </>
  );
};
