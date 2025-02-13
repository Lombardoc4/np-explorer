import { useEffect, useState } from 'react';
import { fetcher, getOperatingHours, scrollToHash } from '../../utils/helper';
import {
  MainGrid,
  StyledSidebar,
} from '../Park/components/StyledParkComponents';
import {
  CardItem,
  StyledCard,
  StyledCardContainer,
} from '../../components/styled/StyledCard';
import { WeatherDisplay } from '../Park/components/weather';
import { Link, useLoaderData, useParams } from 'react-router';
import { ContactCard } from '../Park/Sections/Contact';
import { DirectionSection } from '../Park/Sections/Direction';
import { FeeCard } from '../Park/Sections/Fees';
import {
  ParkSection,
  ParkSectionTitle,
  WeatherSection,
} from '../Park/Sections';
import { AnchorLink } from '../Park/Page';
import { catergory } from '.';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { Button } from '../../components/Button';
import { FullHeightLoader } from '../../components/Loader';
import ErrorPage from '../Error';
import { ImgGrid } from '../../components/ImgGrid';

const Breadcrumbs = ({ parkId, name }: { parkId?: string; name: string }) => (
  <div className='mb-4 flex items-center gap-2'>
    <Button className='uppercase hover:underline'>
      <Link to={`/park/${parkId}`}>{parkId}</Link>
    </Button>
    <ChevronRight />
    <Button className='hover:underline'>
      <Link to={`/park/${parkId}/camping`}>Camping</Link>
    </Button>
    <ChevronRight />
    <Button className='hover:underline'>{name}</Button>
  </div>
);

export const Campground = () => {
  const { parkId, activityId } = useParams();
  const {
    status,
    error,
    data: campground,
  } = useQuery({
    queryKey: [
      'park',
      { catergory: catergory, parkCode: parkId, activityId: activityId },
    ],
    queryFn: async () => {
      const data = await fetcher(`${catergory}?parkCode=${parkId}`);
      return data.filter((campground: any) => (campground.id = activityId))[0];
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
      <Breadcrumbs parkId={parkId} name={campground.name} />
      <CampingSection key={campground.id} campground={campground} />
    </div>
  );
};

const CampingSection = ({ campground }: { campground: any }) => {
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
              {campground.operatingHours.map((operatingHours: any) => (
                <div key={campground.id + 'hours'}>
                  {getOperatingHours(operatingHours)}
                </div>
              ))}
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
        <DirectionSection park={campground}>
          {campground.directionsOverview}
        </DirectionSection>
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

const Campsites = ({ campsites, fcfs }: { campsites: any; fcfs: string }) => (
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

const SiteCount = ({ title, count }: { title: string; count: string }) => {
  if (count === '0') return;
  return (
    <div className='grid gap-1 text-2xl'>
      <p>{title}</p>
      <p className='text-4xl font-black'>{count}</p>
    </div>
  );
};
