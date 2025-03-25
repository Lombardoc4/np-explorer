import { fetcher } from '../../utils/helper';
import { Loader } from '../../components/Loader';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { CategoryCard } from '../Park/Sections/Activities';
export const endpoint = 'tours';
export const category = 'Tours';

export const AllTours = () => {
  const { parkId } = useParams();

  const {
    status,
    error,
    data: tours,
  } = useQuery<ITour[]>({
    queryKey: ['park', { catergory: endpoint, parkCode: parkId }],
    queryFn: async () => await fetcher(`${endpoint}?parkCode=${parkId}`),
  });

  if (status === 'pending') {
    return (
      <div className='flex h-96 items-center justify-center'>
        <Loader />
      </div>
    );
  }

  if (error || !tours || tours.length <= 0) return <></>;

  return (
    <section>
      {/* <h2 className='mb-2 text-2xl font-thin md:text-4xl'>Tours</h2> */}
      <div className='grid gap-4 md:grid-cols-4'>
        {tours.map((tour: ITour) => (
          <CategoryCard data={tour} name='tour' />
        ))}
      </div>
    </section>
  );
};
