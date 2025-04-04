import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/utils/helper';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Alert className='bg-accent'>
            <TriangleAlert className='h-4 w-4' />
            <AlertTitle>{category}</AlertTitle>
            <AlertDescription className='text-foreground line-clamp-1'>
              {title}
            </AlertDescription>
          </Alert>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-xl'>{title}</DialogTitle>
            <DialogDescription className='text-lg'>
              {description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
