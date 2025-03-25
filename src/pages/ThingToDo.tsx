import { fetcher } from '../utils/helper';
import { FullHeightLoader } from '../components/Loader';
import { Link, useParams } from 'react-router';
import { ParkSectionTitle } from './Park/Sections';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from './Error';
import { ImgGrid } from '../components/ImgGrid';
import SEO from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Accessibility,
  Clipboard,
  Dog,
  DollarSign,
  LinkIcon,
  Tag,
} from 'lucide-react';
import { Button } from '../components/Button';

const endpoint = 'thingstodo';

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
      <main className='container mx-auto min-h-svh max-w-5xl px-4 py-24 lg:px-0'>
        <Breadcrumbs
          crumbs={[parkId as string, 'activities', thingToDo.title]}
        />
        <TTDSection key={thingToDo.id} ttd={thingToDo} />
      </main>
    </>
  );
};

const TTDSection = ({ ttd }: { ttd: IThingToDo }) => {
  return (
    <div className='grid gap-8'>
      <div className='rounded-lg bg-black p-4 text-white'>
        {ttd.title && (
          <h1 className='text-4xl font-thin md:text-6xl'>{ttd.title}</h1>
        )}
        {ttd.images.length > 0 && (
          <div className='mt-4 overflow-hidden rounded-lg border border-white'>
            <ImgGrid images={ttd.images} />
          </div>
        )}
        {ttd.activityDescription && (
          <div
            className='mt-4 [&_a]:underline [&_h2]:text-2xl [&_h2]:not-first:mt-4'
            dangerouslySetInnerHTML={{ __html: ttd.activityDescription.trim() }}
          />
        )}
      </div>

      <div className='grid grid-cols-3 gap-8'>
        <div className='col-span-2'>
          {ttd.duration && (
            <div>
              <h3 className='text-2xl'>
                <strong>Duration:</strong> {ttd.duration}
              </h3>
              <p>{ttd.durationDescription}</p>
            </div>
          )}
          {ttd.timeOfDay.length > 0 && (
            <div>
              <hr className='my-2' />
              <h3 className='text-2xl'>
                <strong>Time of Day:</strong> {ttd.timeOfDay.join(', ')}
              </h3>
              <p>{ttd.durationDescription}</p>
            </div>
          )}
          {ttd.season.length > 0 && (
            <div>
              <hr className='my-2' />
              <h3 className='text-2xl'>
                <strong>Season:</strong> {ttd.season.join(', ')}
              </h3>
              {ttd.seasonDescription && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: ttd.seasonDescription.trim(),
                  }}
                ></div>
              )}
            </div>
          )}
          {ttd.locationDescription && (
            <div>
              <hr className='my-2' />
              <h3 className='text-2xl'>
                <strong>Location:</strong> {ttd.location}
              </h3>
              <div className='fact-info'>
                <p className='font-bold'></p>
                {ttd.locationDescription && (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: ttd.locationDescription.trim(),
                    }}
                  />
                )}
              </div>
            </div>
          )}
          {ttd.longDescription && (
            <>
              <hr className='my-2' />

              <div
                className='[&_a]:underline [&_h2]:text-2xl [&_h2]:not-first:mt-4 [&_h3]:text-xl [&_h3]:not-first:mt-4'
                dangerouslySetInnerHTML={{
                  __html: ttd.longDescription
                    .replace(/<br\s*\/?>\s*<br\s*\/?>\s*<br\s*\/?>/g, '<br/>')
                    .trim(),
                }}
              />
            </>
          )}

          <div className='border-foreground mt-2 flex flex-wrap gap-2 border-t pt-4'>
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
        <div className='bg-primary h-fit rounded-xl p-4'>
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
        </div>
      </div>
      {ttd.relatedParks.length > 1 && (
        <div>
          <ParkSectionTitle>Related Parks</ParkSectionTitle>
          <div className='my-8 grid items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            {ttd.relatedParks.map((park: RelatedPark) => (
              <div className='flex flex-col gap-2 rounded-xl border-2 border-green-800 p-4'>
                <div>
                  <p className='truncate text-sm'>{park.states}</p>
                  <h4 className='text-xl leading-tight tracking-tight'>
                    {park.fullName}
                  </h4>
                </div>

                <Link className='mt-auto' to={`/${park.parkCode}`}>
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
  );
};

const QuickFacts = ({
  accessibilityInformation,
  age,
  ageDescription,
  petsDescription,
  arePetsPermitted,
  arePetsPermittedWithRestrictions,
  doFeesApply,
  feeDescription,
  isReservationRequired,
  reservationDescription,
}: IThingToDo) => {
  return (
    <>
      {age && (
        <div className='fact-item py-2'>
          <span className='icon'>📅</span>
          <div className='fact-info'>
            <strong>Age:</strong> {age}
            {ageDescription && (
              <p dangerouslySetInnerHTML={{ __html: ageDescription.trim() }} />
            )}
          </div>
        </div>
      )}
      <div className='fact-item py-2'>
        <DollarSign />
        <div className='fact-info'>
          <p>
            <strong>
              {!['Yes', 'true'].includes(doFeesApply) && 'No'} Fees
            </strong>
          </p>
          {feeDescription && (
            <p dangerouslySetInnerHTML={{ __html: feeDescription.trim() }} />
          )}
        </div>
      </div>
      <div className='fact-item py-2'>
        <Clipboard />
        <div className='fact-info'>
          <p>
            <strong>Reservations</strong> <br />
            Required:{' '}
            {!!isReservationRequired && isReservationRequired ? 'Yes' : 'No'}
          </p>
          {reservationDescription && (
            <p
              dangerouslySetInnerHTML={{
                __html: reservationDescription.trim(),
              }}
            />
          )}
        </div>
      </div>
      <div className='fact-item py-2'>
        <p className='flex gap-2'>
          <Dog />
          <strong>Pets</strong>
        </p>
        <div className='fact-info'>
          <p>
            {!['Yes', 'true'].includes(arePetsPermitted) && 'Not '}Permitted
          </p>
          {['Yes', 'true'].includes(arePetsPermitted) && (
            <p>
              {!['Yes', 'true'].includes(arePetsPermittedWithRestrictions) &&
                'Not '}
              Permitted with Restrictions
            </p>
          )}
          {petsDescription && (
            <p dangerouslySetInnerHTML={{ __html: petsDescription.trim() }} />
          )}
        </div>
      </div>
      <div className='fact-item py-2'>
        <p className='flex gap-2'>
          <Accessibility />
          <strong>Accessibility</strong>
        </p>
        <div
          className='fact-info'
          dangerouslySetInnerHTML={{
            __html: accessibilityInformation
              .replace(/<br\s*\/?>\s*<br\s*\/?>\s*<br\s*\/?>/g, '<br/>')
              .trim(),
          }}
        />
      </div>
    </>
  );
};
