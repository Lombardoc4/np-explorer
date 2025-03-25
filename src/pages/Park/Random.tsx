import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../utils/helper';
import { useState } from 'react';
import ErrorPage from '../Error';
import { ParkLayout } from './Page';
import { FullHeightLoader } from '../../components/Loader';
import { Button } from '@/components/ui/button';

const parkCount = 496;
const getRandomInt = () => Math.floor(Math.random() * parkCount);

export const RandomPark = () => {
  const [show, setShow] = useState(true);
  const [start, setStart] = useState(getRandomInt());
  const {
    isPending,
    data: park,
    error,
    refetch,
  } = useQuery<IPark>({
    queryKey: ['random-parks', { start: start }],
    queryFn: async ({ queryKey }) => {
      const { start } = queryKey[1] as { start: number };

      const data = await fetcher(`parks?limit=1&start=${start}`);
      if (!data[0]) throw Error('No matching park');

      return data[0];
    },
    retry: 1,
    enabled: !!start, // Enable query execution only if parkId exists
  });

  if (error) {
    return <ErrorPage error={error} />;
  }
  if (isPending) {
    return <FullHeightLoader />;
  }
  if (!park) {
    return <ErrorPage error={'Issue loading park data'} />;
  }

  const getNewPark = () => {
    const newStart = getRandomInt();
    setStart(newStart);
    setShow(true);
    refetch();
  };
  return (
    <>
      {show && (
        <div className='container mt-24 -mb-16 flex max-w-5xl items-center justify-between gap-4 rounded border bg-amber-400 p-4 text-black md:mx-auto'>
          <p className='text-2xl'>This was a randomly selected park</p>
          <div className='flex w-fit gap-4'>
            <Button className='bg-white text-black' onClick={getNewPark}>
              Get New Park
            </Button>
            <Button
              className='bg-white text-black'
              onClick={() => setShow(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
      <ParkLayout {...park} />
    </>
  );
};
