import { fetcher } from '../../utils/helper';
import { FullHeightLoader } from '../../components/Loader';
import { Link, useParams } from 'react-router';
import { AnchorLink } from '../Park/Page';
import { ParkSection } from '../Park/Sections';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../Error';
import { Button } from '../../components/Button';
import { category, endpoint } from '.';
import SEO from '../../components/SEO';
import { Breadcrumbs } from '../../components/Breadcrumbs';

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
          <Breadcrumbs parkId={parkId} category={category} />
          <h1 className='mb-8 text-6xl font-thin md:text-8xl'>Things To Do</h1>
        </header>
        <main>
          {thingsToDo.length > 1 && (
            <div className='mt-4 mb-16 grid h-full grid-cols-2 gap-4 md:grid-cols-4'>
              {thingsToDo.map((ttd: IThingToDo) => (
                <AnchorLink key={ttd.title} id={ttd.title} />
              ))}
            </div>
          )}
          <div className='grid gap-16'>
            {thingsToDo.map((ttd: IThingToDo) => (
              <TDDSection key={ttd.id} ttd={ttd} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

const TDDSection = ({ ttd }: { ttd: IThingToDo }) => {
  return (
    <ParkSection name={ttd.title}>
      <div className='col-span-2 grid gap-8 md:grid-cols-2 md:gap-8'>
        <div>
          <p className='text-xl'>{ttd.shortDescription}</p>
          <Button className='mt-4 bg-black text-white dark:bg-white dark:text-black'>
            <Link to={`./${ttd.id}`}>Learn More</Link>
          </Button>
        </div>
        {ttd.images.length > 0 && (
          <div className='h-fit overflow-hidden rounded border border-dashed md:order-2'>
            <img
              src={ttd.images[0].url}
              className='mx-auto w-full'
              alt={ttd.images[0].altText}
            />
          </div>
        )}
      </div>
    </ParkSection>
  );
};
