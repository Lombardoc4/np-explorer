import { useEffect, useState } from 'react';
import { fetcher, getOperatingHours, scrollToHash } from '../utils/helper';
import {
  MainGrid,
  StyledSidebar,
} from './Park/components/StyledParkComponents';
import {
  CardItem,
  StyledCard,
  StyledCardContainer,
} from '../components/styled/StyledCard';
import { WeatherDisplay } from './Park/components/weather';
import { useLoaderData, useParams } from 'react-router';
import { ContactCard } from './Park/Sections/Contact';
import { DirectionSection } from './Park/Sections/Direction';
import { FeeCard } from './Park/Sections/Fees';
import { ParkSection, ParkSectionTitle, WeatherSection } from './Park/Sections';
import { AnchorLink } from './Park/Page';

const Camping = () => {
  // const [camping, setCamping] = useState<any[]>([]);

  const { parkId } = useParams();

  const [campgrounds, setCampgrounds] = useState<any[]>([]);

  useEffect(() => {
    // fetch camping
    fetcher(`campgrounds?parkCode=${parkId}`).then((data) =>
      setCampgrounds(data),
    );
  }, []);
  useEffect(() => {
    scrollToHash();
  }, [campgrounds]);

  // TODO : Change this to error page
  if (campgrounds.length <= 0) return <>Loading camping data</>;

  return (
    <div className='container mx-auto px-4 lg:px-0'>
      <h2 className='text-4xl font-thin md:text-8xl'>Camping</h2>
      <div className='mt-4 mb-16 grid h-full grid-cols-2 gap-4 md:mt-8 md:grid-cols-4'>
        {campgrounds.map((campground: any) => (
          <AnchorLink key={campground.name} id={campground.name} />
        ))}
      </div>
      {campgrounds.map((camp: any, i: number) => (
        <CampingSection key={camp.name} camp={camp} />
      ))}
    </div>
  );
};

const CampingSection = ({ camp }: any) => {
  return (
    <>
      <div className='my-16'>
        <ParkSection name={camp.name}>
          <div className='col-span-2 grid gap-4 md:grid-cols-2 md:gap-8'>
            {camp.images.length > 0 && (
              <div className='h-fit overflow-hidden rounded-xl border border-dashed md:order-2'>
                <img
                  src={camp.images[0].url}
                  className='mx-auto w-full'
                  alt={camp.images[0].altText}
                />
              </div>
            )}
            <div className='grid items-stretch gap-8'>
              <p className='text-xl'>{camp.description}</p>
            </div>
          </div>
          {camp.operatingHours.length > 0 && (
            <div className='col-span-2'>
              <ParkSectionTitle>Hours</ParkSectionTitle>

              <div className='my-4'>
                {camp.operatingHours.map((operatingHours: any) => (
                  <p key={camp.id + 'hours'}>
                    {getOperatingHours(operatingHours)}
                  </p>
                ))}
              </div>
              <p className='text-xl'>{camp.operatingHours[0].description}</p>
            </div>
          )}
          <div className='col-span-2'>
            <ParkSectionTitle>Sites</ParkSectionTitle>
            <div className='my-4 grid gap-4 md:mt-8 md:grid-cols-2'>
              <div className='grid items-center text-center md:grid-cols-2'>
                <SiteCount title='Total' count={camp.campsites.totalSites} />
                <SiteCount
                  title='First Come, First Serve'
                  count={camp.numberOfSitesFirstComeFirstServe}
                />
                <SiteCount title='Tent' count={camp.campsites.tentOnly} />
                <SiteCount title='Group' count={camp.campsites.totalSites} />
                <SiteCount title='RV' count={camp.campsites.totalSites} />
                <SiteCount
                  title='Electric Hookup'
                  count={camp.campsites.totalSites}
                />
                <SiteCount title='Horse' count={camp.campsites.horse} />
                <SiteCount
                  title='Walk Boat To'
                  count={camp.campsites.walkBoatTo}
                />
                <SiteCount title='Other' count={camp.campsites.other} />
              </div>
              <div className='grid divide-y'>
                {camp.accessibility.fireStovePolicy && (
                  <p className='py-2'>
                    <span className='font-black'>Fire Policy:</span>{' '}
                    {camp.accessibility.fireStovePolicy}
                  </p>
                )}
                {camp.accessibility.rvInfo && (
                  <p className='py-2'>
                    <span className='font-black'>RV Info:</span>{' '}
                    {camp.accessibility.rvInfo}
                  </p>
                )}
                {camp.accessibility.additionalInfo && (
                  <p className='py-2'>
                    <span className='font-black'>Additional Info:</span>{' '}
                    {camp.accessibility.additionalInfo}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className='col-span-2'>
            <DirectionSection park={camp}>
              {camp.directionsOverview}
            </DirectionSection>
          </div>

          <div className='col-span-2'>
            <WeatherSection weather={camp.weatherOverview}>
              <WeatherDisplay lat={camp.latitude} long={camp.longitude} />
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
      </div>
    </>
  );
};

const SiteCount = ({ title, count }: { title: string; count: number }) => (
  <p className='text-2xl'>
    {title}: <span className='font-black'>{count}</span>
  </p>
);

export default Camping;
