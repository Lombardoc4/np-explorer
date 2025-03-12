import { fetcher } from '../../utils/helper';
import { FullHeightLoader } from '../../components/Loader';
import { Link, useParams } from 'react-router';
import { ParkSectionTitle } from '../Park/Sections';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../Error';
import { ImgGrid } from '../../components/ImgGrid';
import { category, endpoint } from '.';
import SEO from '../../components/SEO';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { LinkIcon, Tag } from 'lucide-react';
import QuickFacts from './QuickFacts';
import { Button } from '../../components/Button';

export const ThingToDo = () => {
  const { parkId, activityId } = useParams();
  const {
    status,
    error,
    data: thingToDo,
  } = useQuery<IThingToDo>({
    queryKey: [
      'park',
      { catergory: endpoint, parkCode: parkId, activityId: activityId },
    ],
    queryFn: async () => {
      const data = await fetcher(`${endpoint}?parkCode=${parkId}`);
      return data.filter((ttd: IThingToDo) => ttd.id === activityId)[0];
    },
  });

  if (status === 'pending') {
    return (
      <>
        <SEO
          title={`Thing to do |  ${parkId?.toUpperCase()}`}
          description={'Information of this thing to do'}
        />
        <FullHeightLoader />;
      </>
    );
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!thingToDo) return <ErrorPage error={'Issue loading the Thing to dos'} />;

  return (
    <>
      <SEO title={thingToDo.title} description={thingToDo.longDescription} />
      <div className='container mx-auto min-h-svh px-4 py-24 lg:px-0'>
        <Breadcrumbs
          crumbs={[parkId as string, 'activities', category, thingToDo.title]}
        />
        <main>
          <TTDSection key={thingToDo.id} ttd={thingToDo} />
        </main>
      </div>
    </>
  );
};

const TTDSection = ({ ttd }: { ttd: IThingToDo }) => {
  return (
    <div className='grid gap-8'>
      {ttd.images.length > 0 && (
        <div className='rounded-lg bg-black text-white'>
          <div className='pb-4'>
            {ttd.title && (
              <h1 className='text-4xl font-thin md:text-6xl'>{ttd.title}</h1>
            )}
          </div>
          <div className='overflow-hidden rounded-lg border border-white'>
            <ImgGrid images={ttd.images} />
          </div>
          <div className='flex items-center justify-around gap-4 py-4'>
            {ttd.duration && (
              <div>
                <p className='md:text-xl'>
                  <strong>Duration:</strong> {ttd.duration}
                </p>
                <p>{ttd.durationDescription}</p>
              </div>
            )}
            {ttd.timeOfDay.length > 0 && (
              <div>
                <p className='md:text-xl'>
                  <strong>Time of Day:</strong> {ttd.timeOfDay.join(', ')}
                </p>
                <p>{ttd.durationDescription}</p>
              </div>
            )}
            {ttd.season.length > 0 && (
              <div>
                <p className='md:text-xl'>
                  <strong>Season:</strong> {ttd.season.join(', ')}
                </p>
                <p>{ttd.seasonDescription}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className='grid grid-cols-4 gap-8'>
        <div className='col-span-3'>
          <div
            className='[&_a]:underline [&_h2]:text-2xl [&_h2]:not-first:mt-4'
            dangerouslySetInnerHTML={{ __html: ttd.longDescription }}
          />
          <div className='border-foreground mt-4 flex flex-wrap gap-2 border-t pt-4'>
            {ttd.tags.map((tag: string) => (
              <p
                className='flex items-center gap-1 rounded bg-gray-300 px-2 py-1 text-xs text-black'
                key={tag}
              >
                <Tag size={16} />
                {tag}
              </p>
            ))}
          </div>
        </div>
        <div>
          <div className='divide-foreground grid divide-y'>
            <div className='grid gap-2 pb-2'>
              <Link
                className='col-span-full lg:col-span-1'
                to={ttd.url}
                target='_blank'
              >
                <Button className='w-full bg-green-800 py-2 text-white'>
                  Upcoming Events
                </Button>
              </Link>

              <Link
                className='flex items-center gap-1 text-sm italic hover:underline'
                to={ttd.url}
              >
                <LinkIcon size={16} /> Official Park Page
              </Link>
            </div>

            <QuickFacts {...ttd} />
          </div>
          {ttd.relatedParks.length > 1 && (
            <div>
              <ParkSectionTitle>Related Parks</ParkSectionTitle>
              <div className='my-8 grid items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-4'>
                {ttd.relatedParks.map((park: RelatedPark) => (
                  <div className='flex flex-col gap-4 rounded-xl border-2 border-green-800 p-4'>
                    <div>
                      <p className='text-sm'>{park.states}</p>
                      <h4 className='text-2xl'>{park.fullName}</h4>
                    </div>

                    <Link className='mt-auto' to={`/park/${park.parkCode}`}>
                      <Button className='w-full bg-green-800 py-2 text-white'>
                        View Park
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
