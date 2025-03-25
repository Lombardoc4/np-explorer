import { fetcher, getOperatingHours } from '../utils/helper';
import { Link, useParams } from 'react-router';
import { FeeSection } from './Park/Sections';
import { useQuery } from '@tanstack/react-query';
import { FullHeightLoader } from '../components/Loader';
import ErrorPage from './Error';
import { ImgGrid } from '../components/ImgGrid';
import { WeatherDisplay, WeatherSection } from '../components/Weather';
import { DirectionSection } from '../components/Direction';
import { LinkIcon } from 'lucide-react';
import { ShareModal } from '@/components/Modal/ShareModal';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';

export const endpoint = 'campgrounds';
export const category = 'camping';

export const Campground = () => {
  const { parkId, placeId } = useParams();
  const {
    status,
    error,
    data: campground,
  } = useQuery<ICampground>({
    queryKey: [
      'park',
      { catergory: endpoint, parkCode: parkId, placeId: placeId },
    ],
    queryFn: async () => {
      const data = await fetcher(`${endpoint}?parkCode=${parkId}`);
      return data.filter(
        (campground: ICampground) => campground.id === placeId,
      )[0];
    },
  });

  if (status === 'pending') {
    return <FullHeightLoader />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!campground)
    return <ErrorPage error={'Issue loading the visitor centers'} />;

  return (
    <div className='my-20'>
      <CampingSection key={campground.id} campground={campground} />
    </div>
  );
};

const CampingSection = ({ campground }: { campground: ICampground }) => {
  const [_modal, btn] = ShareModal(campground.name);
  const { parkId } = useParams();

  return (
    <div>
      <div className='container mx-auto'>
        <Breadcrumbs crumbs={[parkId as string, 'places', campground.name]} />
        <div className='bg-primary mt-4 grid gap-4 rounded-xl border-4 p-4 lg:grid-cols-4'>
          <div className='lg:order-2 lg:col-span-3'>
            {campground.images.length > 0 && (
              <ImgGrid images={campground.images} />
            )}
          </div>
          <div className='flex h-full flex-col'>
            <p className='mb-4 md:text-xl'>{campground.description}</p>
            <div className='mt-auto flex items-center gap-4 border-t pt-4'>
              {/* Official Page Link */}
              {campground.url && (
                <Link
                  to={campground.url}
                  target='_blank'
                  className='flex flex-col items-center justify-center'
                >
                  <LinkIcon className='size-4 lg:size-6' /> NPS
                </Link>
              )}
              {btn}
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto mt-8 grid gap-4 px-4 md:grid-cols-2'>
        {/* Hours */}
        {campground.operatingHours.length > 0 && (
          <div className='grid h-fit'>
            <div className='my-4'>
              {campground.operatingHours.map(
                (operatingHours: OperatingHours) => (
                  <div key={campground.id + 'hours'}>
                    {getOperatingHours(operatingHours)}
                  </div>
                ),
              )}
            </div>
            {campground.operatingHours.map((op) => (
              <p className='mb-4 overflow-hidden text-xl break-words'>
                {op.description}
              </p>
            ))}
            {campground.reservationUrl && (
              <Button className='bg-black text-white dark:bg-white dark:text-black'>
                <Link to={campground.reservationUrl} target='_blank'>
                  Make a reservation
                </Link>
              </Button>
            )}
          </div>
        )}
        <div>
          <Campsites
            campsites={campground.campsites}
            fcfs={campground.numberOfSitesFirstComeFirstServe}
            reserverable={campground.numberOfSitesReservable}
          />
          <FeeSection entranceFees={campground.fees} />
        </div>
      </div>
      <div className='my-4 grid gap-4 divide-y md:mt-8 md:grid-cols-2'>
        {campground.accessibility.fireStovePolicy && (
          <div className='bg-accent h-full cursor-pointer rounded-lg border-2 px-4 py-2'>
            <h4 className='font-black'>Fire Policy</h4>

            <p>{campground.accessibility.fireStovePolicy}</p>
          </div>
        )}
        {campground.accessibility.rvInfo && (
          <div className='bg-accent h-full cursor-pointer rounded-lg border-2 px-4 py-2'>
            <h4 className='font-black'>RV Info</h4>{' '}
            <p>{campground.accessibility.rvInfo}</p>
          </div>
        )}
        {campground.accessibility.wheelchairAccess && (
          <div className='bg-accent h-full cursor-pointer rounded-lg border-2 px-4 py-2'>
            <h4 className='font-black'>Wheelchair Access</h4>{' '}
            <p>{campground.accessibility.wheelchairAccess}</p>
          </div>
        )}
        {campground.accessibility.additionalInfo && (
          <div className='bg-accent h-full cursor-pointer rounded-lg border-2 px-4 py-2'>
            <h4 className='font-black'>Additional Info</h4>{' '}
            <p>{campground.accessibility.additionalInfo}</p>
          </div>
        )}
      </div>

      <WeatherSection weather={campground.weatherOverview}>
        <WeatherDisplay lat={campground.latitude} long={campground.longitude} />
      </WeatherSection>

      <DirectionSection location={campground} />

      {/* <StyledSidebar>
            {camp.images[0] && (
              <StyledCard className='img-container'>
                <img src={camp.images[0].url} alt={camp.images[0].altText} />
              </StyledCard>
            )}
            <ContactCard contacts={camp.contacts} url={camp.url} />
            <FeeCard entranceFees={camp.fees} />

            <StyledCardContainer>
              <h2>Reservation</h2>
              <StyledCard>
                <CardItem>
                  <p className='bold'>{camp.reservationInfo}</p>
                </CardItem>
                {camp.reservationUrl && (
                  <CardItem>
                    <a
                      href={camp.reservationUrl}
                      className='btn'
                      target='_blank'
                    >
                      Make a reservation now
                    </a>
                  </CardItem>
                )}
              </StyledCard>
            </StyledCardContainer>

            {camp.accessibility.accessRoads ||
              camp.accessibility.adaInfo ||
              (camp.accessibility.wheelchairAccess && (
                <StyledCardContainer>
                  <h2>Accessibility</h2>
                  <StyledCard>
                    {camp.accessibility.accessRoads && (
                      <CardItem>
                        <p className='bold'>Road Access:</p>{' '}
                        {camp.accessibility.accessRoads.map((road: string) => (
                          <p>{road}</p>
                        ))}
                      </CardItem>
                    )}
                    {camp.accessibility.adaInfo && (
                      <CardItem>
                        <p className='bold'>ADA Info:</p>{' '}
                        {camp.accessibility.adaInfo}
                      </CardItem>
                    )}
                    {camp.accessibility.wheelchairAccess && (
                      <CardItem>
                        <p className='bold'>Wheelchair Info:</p>{' '}
                        {camp.accessibility.wheelchairAccess}
                      </CardItem>
                    )}
                  </StyledCard>
                </StyledCardContainer>
              ))}
          </StyledSidebar> */}
    </div>
  );
};

const Campsites = ({
  campsites,
  fcfs,
  reserverable,
}: {
  campsites: ICampground['campsites'];
  fcfs: string;
  reserverable: string;
}) => (
  <div className='my-4 grid grid-cols-2 gap-2 text-center md:grid-cols-4'>
    <SiteCount title='Total' count={campsites.totalSites} />
    <SiteCount title='Reservable' count={reserverable} />
    <SiteCount title='First Come, First Serve' count={fcfs} />
    <SiteCount title='Tent' count={campsites.tentOnly} />
    <SiteCount title='Group' count={campsites.group} />
    <SiteCount title='RV' count={campsites.rvOnly} />
    <SiteCount title='Electric Hookup' count={campsites.electricalHookups} />
    <SiteCount title='Horse' count={campsites.horse} />
    <SiteCount title='Walk Boat To' count={campsites.walkBoatTo} />
    <SiteCount title='Other' count={campsites.other} />
  </div>
);

const SiteCount = ({ title, count }: { title: string; count: string }) => {
  if (!count || count === '0') return;
  return (
    <div className='border-accent flex flex-col items-center justify-center rounded-2xl border py-2'>
      <p className='text-2xl font-black md:text-4xl'>{count}</p>
      <p>{title}</p>
    </div>
  );
};
