import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FullHeightLoader } from '../components/Loader';
import SEO from '../components/SEO';
import { fetcher } from '../utils/helper';
import ErrorPage from './Error';
import { Headphones, Tag } from 'lucide-react';
import { ImgGrid } from '../components/ImgGrid';

export const endpoint = 'tours';
export const category = 'Tours';

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
        <main>
          <Breadcrumbs crumbs={[parkId as string, 'activities', tour.title]} />
          <TourSection key={tour.id} tour={tour} />
        </main>
      </div>
    </>
  );
};

const TourSection = ({ tour }: { tour: ITour }) => {
  return (
    <>
      <div className='rounded-lg bg-black py-4 text-white'>
        {tour.title && (
          <h1 className='text-4xl font-thin md:text-6xl'>{tour.title}</h1>
        )}
        {tour.images.length > 0 && (
          <div className='my-4 overflow-hidden rounded-lg border border-white'>
            <ImgGrid images={tour.images} />
          </div>
        )}

        <p className='text-xl'>{tour.description}</p>
      </div>
      <div className='mb-0'>
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
      <div className='mx-auto mt-8 max-w-2xl'>
        <h2 className='mb-2 text-4xl'>Tour Stops</h2>
        <p className='font-black'>
          Duration: {tour.durationMin}-{tour.durationMax}{' '}
          {tour.durationUnit === 'm' ? 'minutes' : 'hours'}
        </p>
        <TourTimeline stops={tour.stops} />
      </div>
    </>
  );
};

const TourTimeline = ({ stops }: { stops: TourStop[] }) => {
  return (
    <div className='relative pl-4'>
      <ul>
        {stops.map((stop, i) => (
          <TourStop
            key={stop.assetId}
            stop={stop}
            isLast={i === stops.length - 1}
          />
        ))}
      </ul>
    </div>
  );
};

interface TourStopProps {
  stop: TourStop;
  isLast: boolean;
}

const TourStop = ({ stop, isLast }: TourStopProps) => {
  return (
    <div className='group relative my-4 flex'>
      {/* Timeline Dot & Line */}
      <div className='mt-6 flex flex-col items-center'>
        {/* Dot */}
        <div className='group-hover:bg-secondary bg-background border-secondary h-3 w-3 rounded-full border'></div>
        {/* Line */}
        {!isLast && (
          <div className='bg-secondary absolute -z-10 h-full w-1 flex-1 rounded'></div>
        )}
      </div>

      {/* Content */}
      <li className='group-hover:border-foreground ml-4 grid gap-4 rounded-xl border border-transparent p-4 group-hover:shadow-md'>
        <h3 className='text-2xl font-black'>
          {stop.ordinal}. {stop.assetName}
        </h3>
        {stop.audioFileUrl && (
          <Link
            className='mt-2 flex items-center gap-4 hover:underline'
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
    </div>
  );
};
