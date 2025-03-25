import { SymbolMap } from '../utils/lib/amenitiesMap';
import { fetcher, getOperatingHours } from '../utils/helper';
import { FullHeightLoader } from '../components/Loader';
import { useParams } from 'react-router';
import { DirectionSection } from '../components/Direction';
import { ParkSection, ParkSectionTitle } from './Park/Sections';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from './Error';
import { ImgGrid } from '../components/ImgGrid';
import SEO from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/themeProvider';
import { Badge } from '@/components/ui/badge';

export const endpoint = 'visitorcenters';

export const VisitorCenterPage = () => {
  const { parkId, placeId } = useParams();
  const {
    status,
    error,
    data: visitorCenter,
  } = useQuery<IVisitorCenter>({
    queryKey: [
      'park',
      { catergory: endpoint, parkCode: parkId, placeId: placeId },
    ],
    queryFn: async () => {
      const data = await fetcher(`${endpoint}?parkCode=${parkId}`);
      return data.filter((vc: IVisitorCenter) => vc.id === placeId)[0];
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

  if (!visitorCenter)
    return <ErrorPage error={'Issue loading the visitor centers'} />;

  return (
    <>
      <SEO title={visitorCenter.name} description={visitorCenter.description} />
      <div className='py-24'>
        <Breadcrumbs
          crumbs={[parkId as string, 'places', visitorCenter.name]}
        />
        <VCSection key={visitorCenter.id} vc={visitorCenter} />
      </div>
    </>
  );
};

const VCSection = ({ vc }: { vc: IVisitorCenter }) => {
  // Resolve if

  return (
    <ParkSection name={vc.name}>
      <header className='col-span-2'>
        {vc.images.length > 0 && <ImgGrid images={vc.images} />}
        <div>
          <p className='text-xl'>{vc.description}</p>
          <p className='text-xl'>{vc.audioDescription}</p>
        </div>
      </header>
      <main className='col-span-2 grid gap-8 md:grid-cols-2'>
        {/* Hours */}
        {vc.operatingHours && vc.operatingHours.length > 0 && (
          <div>
            <ParkSectionTitle>Hours</ParkSectionTitle>

            <div className='my-4'>
              {vc.operatingHours.map((operatingHours: OperatingHours) => (
                <div key={vc.id + 'hours'}>
                  {getOperatingHours(operatingHours)}
                </div>
              ))}
            </div>
            <p className='text-xl'>{vc.operatingHours[0].description}</p>
          </div>
        )}
        {vc.amenities.length > 0 && <Amenities amenities={vc.amenities} />}
        {/* Amenities */}
      </main>

      {/* Directions */}
      <div className='col-span-2'>
        <DirectionSection location={vc} />
      </div>
    </ParkSection>
  );
};

const Amenities = ({ amenities }: { amenities: string[] }) => (
  <div>
    <div className='my-4'>
      <div className='flex flex-wrap gap-2'>
        {amenities.map((amenity: string) => (
          <AmenityItem key={amenity} amenity={amenity} />
        ))}
      </div>
    </div>
  </div>
);

const AmenityItem = ({ amenity }: { amenity: string }) => {
  const { theme } = useTheme();
  const [imageColor, setImageColor] = useState<'white' | 'black'>('black');

  useEffect(() => {
    const resolveImageColor = () => {
      if (theme === 'dark') {
        return 'white';
      } else if (theme === 'light') {
        return 'black';
      } else {
        // Handle 'system' theme by checking system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'white'
          : 'black';
      }
    };

    setImageColor(resolveImageColor());
  }, [theme]);
  return (
    <Badge>
      <img
        // width={24}
        // height={24}
        src={`https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/${SymbolMap[amenity]}-${imageColor}-22.svg`}
        alt={`${amenity} icon`}
      />
      <p>{amenity}</p>
    </Badge>
  );
};
