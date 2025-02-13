import { useEffect } from 'react';
import { SymbolMap } from '../../utils/lib/symbolMap';
import { fetcher, getOperatingHours } from '../../utils/helper';
import { scrollToHash } from '../../utils/helper';
import { FullHeightLoader } from '../../components/Loader';
import { Link, useParams } from 'react-router';
import { DirectionSection } from '../Park/Sections/Direction';
import { ParkSection, ParkSectionTitle } from '../Park/Sections';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../Error';
import { Button } from '../../components/Button';
import { ChevronRight } from 'lucide-react';
import { ImgGrid } from '../../components/ImgGrid';

const VisitorCenterPage = () => {
  const { parkId, activityId } = useParams();
  const {
    status,
    error,
    data: visitorCenter,
  } = useQuery({
    queryKey: [
      'park',
      { catergory: 'visitorcenters', parkCode: parkId, activityId: activityId },
    ],
    queryFn: async () => {
      const data = await fetcher(`visitorcenters?parkCode=${parkId}`);
      return data.filter((vc: any) => (vc.id = activityId))[0];
    },
    retry: 0,
    staleTime: 5 * 60 * 1000,
  });
  console.log('visitorCenters', visitorCenter);

  useEffect(() => {
    scrollToHash();
  }, [visitorCenter]);

  if (status === 'pending') {
    return <FullHeightLoader />;
  }

  if (status === 'error') {
    return <ErrorPage error={error} />;
  }

  if (!visitorCenter)
    return <ErrorPage error={'Issue loading the visitor centers'} />;

  return (
    <div className='container mx-auto min-h-svh px-4 py-24 lg:px-0 xl:max-w-5xl'>
      <div className='mb-4 flex items-center gap-2'>
        <Button className='uppercase hover:underline'>
          <Link to={`/park/${parkId}`}>{parkId}</Link>
        </Button>
        <ChevronRight />
        <Button className='hover:underline'>
          <Link to={`/park/${parkId}/visitor-centers`}>Visitor Centers</Link>
        </Button>
        <ChevronRight />
        <Button className='hover:underline'>{visitorCenter.name}</Button>
      </div>

      <VCSection key={visitorCenter.id} vc={visitorCenter} />
    </div>
  );
};

export default VisitorCenterPage;

const VCSection = ({ vc }: { vc: any }) => {
  return (
    <ParkSection name={vc.name}>
      <div className='col-span-2'>
        {vc.images.length > 0 && <ImgGrid images={vc.images} />}
      </div>
      <div className='col-span-2 grid gap-8 md:grid-cols-2 md:gap-8'>
        <div>
          <p className='text-xl'>{vc.description}</p>
        </div>
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
      {vc.amenities.length > 0 && (
        <div className='col-span-2'>
          <ParkSectionTitle>Amenities</ParkSectionTitle>
          <div className='mt-8'>
            <div className='my-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {vc.amenities.map((amenity: any) => (
                <AmentyItem key={amenity} amenity={amenity} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className='col-span-2'>
        <DirectionSection park={vc} />
      </div>
    </ParkSection>
  );
};

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
