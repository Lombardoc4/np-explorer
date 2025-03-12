import { fetcher } from '../../utils/helper';
import { FullHeightLoader } from '../../components/Loader';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../Error';
import { category, endpoint } from '.';
import SEO from '../../components/SEO';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CategoryCard } from '../Park/Sections/Activities';

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
      <>
        <SEO
          title={`Things to do at ${parkId?.toUpperCase()}`}
          description='Explore things to do provided by the USNP'
        />
        <FullHeightLoader />;
      </>
    );
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!thingsToDo || thingsToDo.length <= 0)
    return <ErrorPage error={'Issue loading things to do'} />;

  return (
    <>
      <SEO
        title={`Things to do | ${parkId?.toUpperCase()}`}
        description={`${thingsToDo.length} Things to at ${parkId}`}
      />
      <div className='container mx-auto min-h-svh px-4 py-24 lg:px-0 xl:max-w-5xl'>
        <header>
          <Breadcrumbs crumbs={[parkId as string, 'activities', category]} />
          <h1 className='mb-8 text-6xl font-thin md:text-8xl'>Things To Do</h1>
        </header>
        <main>
          <div className='grid grid-cols-4 gap-4'>
            {thingsToDo.map((ttd: IThingToDo) => (
              <CategoryCard data={ttd} />
              // <TDDSection key={ttd.id} ttd={ttd} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};
