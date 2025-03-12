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
        <Breadcrumbs
          crumbs={[parkId as string, 'activities', category, tour.title]}
        />
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
      <div className='col-span-2'>
        {tour.images.length > 0 && <ImgGrid images={tour.images} />}
      </div>
      <div className='mb-0'>
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
      <ParkSection name='Tour Stops' subtitle>
        <div className='col-span-2 -mt-4'>
          <p className='font-black'>
            Duration: {tour.durationMin}-{tour.durationMax}{' '}
            {tour.durationUnit === 'm' ? 'minutes' : 'hours'}
          </p>
          <TourTimeline stops={tour.stops} />
        </div>
      </ParkSection>
    </ParkSection>
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
    <div className='group relative flex items-center'>
      {/* Timeline Dot & Line */}
      <div className='flex flex-col items-center'>
        {/* Dot */}
        <div className='group-hover:bg-secondary bg-background border-secondary h-3 w-3 rounded-full border'></div>
        {/* Line */}
        {!isLast && (
          <div className='bg-secondary absolute top-[50%] -z-10 h-full w-1 flex-1 rounded'></div>
        )}
      </div>

      {/* Content */}
      <li className='my-4 ml-6 grid gap-x-8'>
        <h3 className='text-2xl font-thin'>
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
