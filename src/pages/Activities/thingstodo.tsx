import { fetcher } from '../../utils/helper';
import { Loader } from '../../components/Loader';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { CategoryCard } from '../Park/Sections/Activities';

const endpoint = 'thingstodo';

export const AllThingsToDo = () => {
  const { parkId } = useParams();

  const {
    status,
    error,
    data: thingsToDo,
  } = useQuery<IThingToDo[]>({
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

  if (error || !thingsToDo || thingsToDo.length <= 0) return <></>;

  return (
    <section>
      {/* <h2 className='mb-2 text-2xl font-thin md:text-4xl'>Things to do</h2> */}
      <div className='grid gap-4 md:grid-cols-4'>
        {thingsToDo.map((ttd: IThingToDo) => (
          <CategoryCard data={ttd} name='thingtodo' />
        ))}
      </div>
    </section>
  );
};
