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
      <>
        <SEO
          title={`Tours of ${parkId?.toUpperCase()}`}
          description='Plan a tour with USNP'
        />
        <FullHeightLoader />;
      </>
    );
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!tours || tours.length <= 0)
    return <ErrorPage error={'Issue loading the tours'} />;

  return (
    <>
      <SEO
        title={`Tours of ${parkId?.toUpperCase()}`}
        description={`${tours.length} tours at ${parkId}`}
      />
      <div className='container mx-auto min-h-svh px-4 py-24 lg:px-0 xl:max-w-5xl'>
        <header>
          <Breadcrumbs parkId={parkId} category={category} />
          <h1 className='mb-8 text-6xl font-thin md:text-8xl'>Tours</h1>
        </header>
        <main>
          {tours.length > 1 && (
            <div className='mt-4 mb-16 grid h-full grid-cols-2 gap-4 md:grid-cols-4'>
              {tours.map((tour: ITour) => (
                <AnchorLink key={tour.title} id={tour.title} />
              ))}
            </div>
          )}
          <div className='grid gap-16'>
            {tours.map((tour: ITour) => (
              <TourSection key={tour.id} tour={tour} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

const TourSection = ({ tour }: { tour: ITour }) => {
  return (
    <ParkSection name={tour.title}>
      <div className='col-span-2 grid gap-8 md:grid-cols-2 md:gap-8'>
        <div>
          <p className='text-xl'>{tour.description}</p>
          <Button className='mt-4 bg-black text-white dark:bg-white dark:text-black'>
            <Link to={`./${tour.id}`}>Learn More</Link>
          </Button>
        </div>
        {tour.images.length > 0 && (
          <div className='h-fit overflow-hidden rounded border border-dashed md:order-2'>
            <img
              src={tour.images[0].url}
              className='mx-auto w-full'
              alt={tour.images[0].altText}
            />
          </div>
        )}
      </div>
    </ParkSection>
  );
};
