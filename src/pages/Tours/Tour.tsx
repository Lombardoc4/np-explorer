import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router';
import { endpoint, category } from '.';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { FullHeightLoader } from '../../components/Loader';
import SEO from '../../components/SEO';
import { fetcher } from '../../utils/helper';
import ErrorPage from '../Error';
import { Headphones, Tag } from 'lucide-react';
import { ParkSection } from '../Park/Sections';
import { ImgGrid } from '../../components/ImgGrid';

export const Tour = () => {
  const { parkId, activityId } = useParams();
  const {
    status,
    error,
    data: tour,
  } = useQuery<ITour>({
    queryKey: [
      'park',
      { catergory: endpoint, parkCode: parkId, activityId: activityId },
    ],
    queryFn: async () => {
      const data = await fetcher(`${endpoint}?parkCode=${parkId}`);
      return data.filter((activity: ITour) => activity.id === activityId)[0];
    },
  });

  if (status === 'pending') {
    return (
      <>
        <SEO
          title={`Visitor Center of ${parkId?.toUpperCase()}`}
          description={'Information of this visitor center'}
        />
        <FullHeightLoader />;
      </>
    );
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!tour) return <ErrorPage error={'Issue loading the visitor centers'} />;

  return (
    <>
      <SEO title={tour.title} description={tour.description} />
      <div className='container mx-auto min-h-svh px-4 py-24 lg:px-0 xl:max-w-5xl'>
        <Breadcrumbs parkId={parkId} category={category} name={tour.title} />
        <main>
          <TourSection key={tour.id} tour={tour} />
        </main>
      </div>
    </>
  );
};

const TourSection = ({ tour }: { tour: ITour }) => {
  return (
    <ParkSection name={tour.title}>
      {tour.images.length > 0 && (
        <div className='col-span-2'>
          <ImgGrid images={tour.images} />
        </div>
      )}
      <div className='col-span-2'>
        <p className='text-xl'>{tour.description}</p>
        <div className='mt-2 flex gap-2'>
          {tour.tags.map((tag: string) => (
            <p
              className='flex items-center gap-1 rounded bg-gray-300 px-2 py-1 text-sm text-black'
              key={tag}
            >
              <Tag size={16} />
              {tag}
            </p>
          ))}
        </div>
      </div>
      <div className='col-span-2'>
        <ParkSection name='Tour Stops'>
          <div>
            <p className='font-black'>
              Duration: {tour.durationMin}-{tour.durationMax}{' '}
              {tour.durationUnit === 'm' ? 'minutes' : 'hours'}
            </p>
            <div>
              {tour.stops.map((stop: TourStop, i: number) => (
                <>
                  {i !== 0 && <hr />}
                  <TourStop stop={stop} key={stop.assetId} />
                </>
              ))}
            </div>
          </div>
        </ParkSection>
      </div>
    </ParkSection>
  );
};

const TourStop = ({ stop }: { stop: TourStop }) => {
  return (
    <li className='my-4 grid gap-x-8 md:grid-cols-2'>
      <h3 className='mb-2 text-4xl font-thin md:col-span-2'>
        {stop.ordinal}. {stop.assetName}
      </h3>
      {stop.audioFileUrl && (
        <Link
          className='col-span-2 flex items-center gap-4 hover:underline'
          target='_blank'
          to={stop.audioFileUrl}
        >
          <Headphones /> Listen to transcript
        </Link>
      )}
      {stop.significance && (
        <p>
          <span className='font-black'>Significance: </span>
          <br />
          {stop.significance}
        </p>
      )}

      {stop.directionsToNextStop && (
        <p>
          <span className='font-black'>Next stop: </span>
          <br />
          {stop.directionsToNextStop}
        </p>
      )}
    </li>
  );
};
