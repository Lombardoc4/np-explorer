import { fetcher, getOperatingHours } from '../../utils/helper';
import { Link, useParams } from 'react-router';
import { ParkSection, ParkSectionTitle } from '../Park/Sections';
import { category, endpoint } from '.';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../../components/Button';
import { FullHeightLoader } from '../../components/Loader';
import ErrorPage from '../Error';
import { ImgGrid } from '../../components/ImgGrid';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { WeatherDisplay, WeatherSection } from '../../components/Weather';
import { DirectionSection } from '../../components/Direction';

export const Campground = () => {
  const { parkId, activityId } = useParams();
  const {
    status,
    error,
    data: campground,
  } = useQuery<ICampground>({
    queryKey: [
      'park',
      { catergory: endpoint, parkCode: parkId, activityId: activityId },
    ],
    queryFn: async () => {
      const data = await fetcher(`${endpoint}?parkCode=${parkId}`);
      return data.filter(
        (campground: ICampground) => campground.id === activityId,
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
    <div className='container mx-auto min-h-svh px-4 py-24 lg:px-0 xl:max-w-5xl'>
      <Breadcrumbs parkId={parkId} category={category} name={campground.name} />
      <CampingSection key={campground.id} campground={campground} />
    </div>
  );
};

const CampingSection = ({ campground }: { campground: ICampground }) => {
  return (
    <ParkSection name={campground.name}>
      {campground.images.length > 0 && (
        <div className='col-span-2'>
          <ImgGrid images={campground.images} />
        </div>
      )}
      <div className='col-span-2 grid gap-8 md:grid-cols-2 md:gap-8'>
        <div>
          <p className='text-xl'>{campground.description}</p>
        </div>

        {/* Hours */}
        {campground.operatingHours.length > 0 && (
          <div>
            <ParkSectionTitle>Hours</ParkSectionTitle>

            <div className='my-4'>
              {campground.operatingHours.map(
                (operatingHours: IOperatingHours) => (
                  <div key={campground.id + 'hours'}>
                    {getOperatingHours(operatingHours)}
                  </div>
                ),
              )}
            </div>
            <p className='mb-4 text-xl'>
              {campground.operatingHours[0].description}
            </p>
            <Button className='bg-black text-white dark:bg-white dark:text-black'>
              <Link to={campground.reservationUrl} target='_blank'>
                Make a reservation
              </Link>
            </Button>
          </div>
        )}
      </div>

      <div className='col-span-2'>
        <ParkSectionTitle>Sites</ParkSectionTitle>
        <Campsites
          campsites={campground.campsites}
          fcfs={campground.numberOfSitesFirstComeFirstServe}
        />

        <div className='my-4 grid gap-4 divide-y md:mt-8 md:grid-cols-2'>
          {campground.accessibility.fireStovePolicy && (
            <p className='py-2'>
              <span className='font-black'>Fire Policy:</span>{' '}
              {campground.accessibility.fireStovePolicy}
            </p>
          )}
          {campground.accessibility.rvInfo && (
            <p className='py-2'>
              <span className='font-black'>RV Info:</span>{' '}
              {campground.accessibility.rvInfo}
            </p>
          )}
          {campground.accessibility.additionalInfo && (
            <p className='py-2'>
              <span className='font-black'>Additional Info:</span>{' '}
              {campground.accessibility.additionalInfo}
            </p>
          )}
        </div>
      </div>

      <div className='col-span-2'>
        <DirectionSection location={campground} />
      </div>

      <div className='col-span-2'>
        <WeatherSection weather={campground.weatherOverview}>
          <WeatherDisplay
            lat={campground.latitude}
            long={campground.longitude}
          />
        </WeatherSection>
      </div>

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
    </ParkSection>
  );
};

const Campsites = ({
  campsites,
  fcfs,
}: {
  campsites: ICampground['campsites'];
  fcfs: number;
}) => (
  <div className='my-4 grid items-center gap-4 divide-x text-center md:grid-cols-4'>
    <SiteCount title='Total' count={campsites.totalSites} />
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

const SiteCount = ({ title, count }: { title: string; count: number }) => {
  if (!count) return;
  return (
    <div className='grid gap-1 text-2xl'>
      <p>{title}</p>
      <p className='text-4xl font-black'>{count}</p>
    </div>
  );
};
