import { iconMap } from '@/utils/lib/iconMap';
import { Search, X } from 'lucide-react';
import { Dropdown } from '../../components/Dropdown';
import { Footer } from '../../components/Footer';
import SEO from '../../components/SEO';
import { featureInfo, featureInfoProps } from './descriptions';
import Map from '@/components/map';
import { useState } from 'react';
import { LngLatLike } from 'mapbox-gl';
import { fetcher } from '@/utils/helper';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '@/components/Loader';
import ErrorPage from '../Error';
import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router';
const bgUrl = '/Grand_Teton_Landing_BG.jpg';

export const LandingPage = () => {
  return (
    <>
      <SEO title='Home' description='Explore Your Favorite National Park' />

      {/* Section 1 - Header */}
      <Header />

      {/* Section Divider */}

      {/* Section 2 - Description */}
      <Description />
      <WaveDivider reverse />

      {/* Section 3 - Selection Map */}
      <AllParksMap />
      {/* <USMap /> */}

      {/* Footer */}
      <Footer />
    </>
  );
};

const Header = () => (
  <header id='home' className='mt-4 grid min-h-dvh items-center sm:mt-0'>
    <div className='container px-4 md:mx-auto'>
      <h1 className='text-xl md:text-3xl'>
        Explore Your Favorite <br />
        <span className='text-3xl uppercase md:text-6xl lg:text-7xl'>
          National Parks
        </span>
      </h1>
      <div
        style={{ backgroundImage: `url(${bgUrl})` }}
        className={`my-2 h-[400px] overflow-hidden rounded-xl border-4 bg-cover bg-center shadow-2xl sm:my-4 md:h-[500px] dark:shadow-md dark:shadow-white`}
      >
        <div className='relative flex h-full w-full items-center justify-center bg-black/25 px-4 text-white lg:px-0'>
          <Dropdown type='park' />
        </div>
      </div>
    </div>
  </header>
);

const Description = () => (
  <>
    <WaveDivider />
    <section className='bg-muted py-8 md:pt-16'>
      <div className='container mx-auto px-6 text-center lg:px-0'>
        {/* Section Heading */}
        <h2 className='mb-12 text-3xl tracking-wide uppercase md:text-6xl'>
          A Modern take on <br className='hidden md:inline' /> National Parks
        </h2>

        {/* Feature Grid */}
        <div className='mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:gap-16'>
          {featureInfo.map((feat) => (
            <Feature key={feat.id} {...feat} />
          ))}
        </div>
        <div className='mt-16'>
          <Link
            to={'home'}
            duration={600}
            className='bg-accent text-accent-foreground mx-auto flex w-fit gap-2 rounded-lg px-3 py-2'
          >
            <Search /> Begin Your Search Now
          </Link>
        </div>
      </div>
      <WaveDivider />
    </section>
  </>
);

const WaveDivider = ({ reverse }: { reverse?: boolean }) => (
  <div className={'w-full ' + (reverse ? 'rotate-z-180' : '')}>
    <svg
      width='100%'
      height='60' // Reduced height
      viewBox='0 0 1440 120' // Adjusted viewBox to match height
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='none'
      className='text-muted block'
    >
      <path d='M0,96L80,80C160,64,320,32,480,37.3C640,43,800,85,960,90.7C1120,96,1280,64,1360,48L1440,32V120H0Z'></path>
    </svg>
  </div>
);

const Feature = ({ id, title, description }: featureInfoProps) => {
  const Icon = iconMap[id];

  return (
    <div className='bg-background flex flex-col items-center rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl dark:shadow-lg'>
      {/* Icon - Centered Above Content */}
      <div className='bg-accent flex h-20 w-20 items-center justify-center rounded-full shadow-md md:h-24 md:w-24'>
        <Icon className='h-12 w-12 text-[var(--color-text)] md:h-14 md:w-14 dark:text-[var(--color-text)]' />
      </div>

      {/* Text Content */}
      <div className='mx-auto mt-2 max-w-lg text-center'>
        <h3 className='text-xl font-bold md:text-3xl'>{title}</h3>
        <hr className='border-secondary my-4 rounded border-2' />
        <p className='text-foreground leading-relaxed'>{description}</p>
      </div>
    </div>
  );
};

const AllParksMap = () => {
  const USCenter = [-98.35, 39.5];
  const [selectedLocation, setSelectedLocation] = useState<IPark | null>(null);
  const [mapStyle, setMapStyle] = useState(
    'mapbox://styles/mapbox/outdoors-v12',
  );

  const {
    data: parks,
    isFetching,
    error,
  } = useQuery<IPark[]>({
    queryKey: ['park', { catergory: 'all-parks' }],
    queryFn: async () => await fetcher(`parks?`),
  });

  const toggleMapStyle = () => {
    setMapStyle((prev) =>
      prev === 'mapbox://styles/mapbox/outdoors-v12'
        ? 'mapbox://styles/mapbox/satellite-streets-v12'
        : 'mapbox://styles/mapbox/outdoors-v12',
    );
  };

  if (isFetching)
    return (
      <div className='flex h-48 items-center justify-center'>
        <Loader />
      </div>
    );
  if (error || !parks) return <ErrorPage error={error || 'No parks'} />;

  return (
    <div className='bg-primary container mx-auto my-16 overflow-hidden rounded-lg lg:grid lg:grid-cols-4'>
      {/* Map (3 columns) */}

      <div className='relative m-4 overflow-hidden rounded-lg border-2 shadow-lg lg:col-span-3'>
        <Map
          mapStyle={mapStyle}
          onLocationSelect={setSelectedLocation}
          lnglat={USCenter as LngLatLike}
          locations={parks}
          zoom={4}
        />

        {/* Layer Toggle Button */}
        <button
          onClick={toggleMapStyle}
          className='absolute top-3 right-3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 shadow-md hover:bg-gray-100'
        >
          {mapStyle.includes('satellite')
            ? 'Switch to Streets'
            : 'Switch to Satellite'}
        </button>
      </div>

      {/* Description Panel (1 column) */}
      <div className='inset-shadow col-span-1 max-h-[536px] overflow-scroll p-4'>
        {selectedLocation && (
          <div>
            <div className='flex items-center justify-between gap-2'>
              <h2 className='text-lg font-bold'>{selectedLocation.name}</h2>
              <X onClick={() => setSelectedLocation(null)} />
            </div>
            <div className='bg-accent my-1 h-0.5 rounded-full' />
            <p className='mb-4 line-clamp-[12]'>
              {selectedLocation.description}
            </p>
            <Link
              className={
                'cursor-pointer ' + buttonVariants({ variant: 'outline' })
              }
              to={`park/${selectedLocation.parkCode}`}
            >
              Learn more
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
