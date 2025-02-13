import { SymbolMap } from '../../utils/lib/symbolMap';
import { fetcher, getOperatingHours } from '../../utils/helper';
import { FullHeightLoader } from '../../components/Loader';
import { Link, useParams } from 'react-router';
import { DirectionSection } from '../Park/Sections/Direction';
import { ParkSection, ParkSectionTitle } from '../Park/Sections';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../Error';
import { Button } from '../../components/Button';
import { ChevronRight } from 'lucide-react';
import { ImgGrid } from '../../components/ImgGrid';
import { catergory } from '.';
import SEO from '../../components/SEO';

const Breadcrumbs = ({ parkId, name }: { parkId?: string; name: string }) => (
  <div className='mb-4 flex items-center gap-2'>
    <Button className='uppercase hover:underline'>
      <Link to={`/park/${parkId}`}>{parkId}</Link>
    </Button>
    <ChevronRight />
    <Button className='hover:underline'>
      <Link to={`/park/${parkId}/visitor-centers`}>Visitor Centers</Link>
    </Button>
    <ChevronRight />
    <Button className='hover:underline'>{name}</Button>
  </div>
);

export const VisitorCenterPage = () => {
  const { parkId, activityId } = useParams();
  const {
    status,
    error,
    data: visitorCenter,
  } = useQuery({
    queryKey: [
      'park',
      { catergory: catergory, parkCode: parkId, activityId: activityId },
    ],
    queryFn: async () => {
      const data = await fetcher(`${catergory}?parkCode=${parkId}`);
      return data.filter((vc: any) => (vc.id = activityId))[0];
    },
    retry: 0,
    staleTime: 5 * 60 * 1000,
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

  if (!visitorCenter)
    return <ErrorPage error={'Issue loading the visitor centers'} />;

  return (
    <>
      <SEO title={visitorCenter.name} description={visitorCenter.description} />
      <div className='container mx-auto min-h-svh px-4 py-24 lg:px-0 xl:max-w-5xl'>
        <Breadcrumbs parkId={parkId} name={visitorCenter.name} />
        <main>
          <VCSection key={visitorCenter.id} vc={visitorCenter} />
        </main>
      </div>
    </>
  );
};

const VCSection = ({ vc }: { vc: any }) => {
  return (
    <ParkSection name={vc.name}>
      {vc.images.length > 0 && (
        <div className='col-span-2'>
          <ImgGrid images={vc.images} />
        </div>
      )}
      <div className='col-span-2 grid gap-8 md:grid-cols-2 md:gap-8'>
        <div>
          <p className='text-xl'>{vc.description}</p>
        </div>

        {/* Hours */}
        {vc.operatingHours.length > 0 && (
          <div>
            <ParkSectionTitle>Hours</ParkSectionTitle>

            <div className='my-4'>
              {vc.operatingHours.map((operatingHours: any) => (
                <div key={vc.id + 'hours'}>
                  {getOperatingHours(operatingHours)}
                </div>
              ))}
            </div>
            <p className='text-xl'>{vc.operatingHours[0].description}</p>
          </div>
        )}
      </div>

      {/* Amenities */}
      {vc.amenities.length > 0 && <Amenities amenities={vc.amenities} />}

      {/* Directions */}
      <div className='col-span-2'>
        <DirectionSection park={vc} />
      </div>
    </ParkSection>
  );
};

const Amenities = ({ amenities }: { amenities: any[] }) => (
  <div className='col-span-2'>
    <ParkSectionTitle>Amenities</ParkSectionTitle>
    <div className='mt-8'>
      <div className='my-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {amenities.map((amenity: any) => (
          <AmentyItem key={amenity} amenity={amenity} />
        ))}
      </div>
    </div>
  </div>
);

const AmentyItem = ({ amenity }: { amenity: string }) => {
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const imageColor = isDarkMode ? 'white' : 'black';
  return (
    <div className='flex items-center gap-4'>
      <img
        width={32}
        height={32}
        src={`https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/${SymbolMap[amenity]}-${imageColor}-22.svg`}
      />{' '}
      <span className='bold'>{amenity}</span>
    </div>
  );
};
