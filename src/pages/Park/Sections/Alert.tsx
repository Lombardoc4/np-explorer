import { useState } from 'react';
import Modal from '@/components/Modal/modal';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/utils/helper';

export const ParkAlert = ({ parkId }: { parkId: string }) => {
  const { data: alerts } = useQuery<Alert[]>({
    queryKey: ['alerts', { parkCode: parkId }],
    queryFn: async ({ queryKey }) => {
      const { parkCode } = queryKey[1] as { parkCode: string };
      if (!parkCode) return [];

      const data = await fetcher(`alerts?parkCode=${parkCode}`);
      if (!data) throw Error('No matching park');
      return data;
    },
    retry: 1,
    enabled: !!parkId, // Enable query execution only if parkId exists
  });

  if (!alerts || alerts.length <= 0) return;

  return (
    <div
      className={clsx(
        'grid gap-4 md:grid-cols-2',
        alerts.length > 2 ? 'xl:grid-cols-4' : 'xl:grid-cols-2',
      )}
    >
      {alerts.map((alert: Alert) => (
        <ParkAlertItem key={alert.id} {...alert} />
      ))}
    </div>
  );
};

const ParkAlertItem = ({ category, title, description }: Alert) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className='bg-accent h-full cursor-pointer rounded-lg border-2 px-4 py-2'
        onClick={() => setIsModalOpen(true)}
      >
        <h3 className='text-lg font-black'>{category}</h3>
        <p className='line-clamp-1 lg:line-clamp-2'>{title}</p>
      </div>
      <Modal
        type={'alert'}
        title={title}
        subtitle={category}
        isOpen={isModalOpen}
        onClose={closeModal}
        content={description}
      />
    </>
  );
};
