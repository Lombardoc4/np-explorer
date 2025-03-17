import { iconMap } from '@/utils/lib/iconMap';
import { Search, X } from 'lucide-react';
import { Dropdown } from '../../components/Dropdown';
import { Footer } from '../../components/Footer';
import SEO from '../../components/SEO';
import { featureInfo, featureInfoProps } from './descriptions';
import Map from '@/components/map';
import { useEffect, useState } from 'react';
import { LngLatLike } from 'mapbox-gl';
import { fetcher } from '@/utils/helper';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '@/components/Loader';
import ErrorPage from '../Error';
import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { stateMap, StateProps } from '@/utils/lib/stateMap';
import clsx from 'clsx';
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

      {/* Section 3 - Selection Map */}
      <AllParksMap />
      {/* <USMap /> */}

      {/* Footer */}
      <Footer />
    </>
  );
};

const Header = () => (
  <header
    id='home'
    className='bg-muted mt-4 grid min-h-dvh items-center sm:mt-0'
  >
    <div className='container px-4 md:mx-auto'>
      <h1 className='text-xl md:text-3xl'>
        Explore Your Favorite <br />
        <span className='text-3xl uppercase md:text-6xl lg:text-7xl'>
          National Parks
        </span>
      </h1>
      <div
        style={{ backgroundImage: `url(${bgUrl})` }}
        className={`my-2 h-[400px] overflow-hidden rounded-xl border-4 bg-cover bg-center shadow-2xl sm:my-4 md:h-[500px]`}
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
    <WaveDivider reverse />
    <section className='py-8 md:pt-16'>
      {/* Feature Grid */}
      <div className='container mx-auto px-6 md:px-0'>
        <FeatureGroup category='places' />
      </div>
      <div className='container mx-auto px-6 md:px-0'>
        <FeatureGroup category='activities' reverse />
      </div>
    </section>
    {/* <WaveDivider /> */}
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

const FeatureGroup = ({
  category,
  reverse,
}: {
  category: 'activities' | 'places';
  reverse?: boolean;
}) => {
  return (
    <div className='relative my-8 mb-16 flex justify-center gap-4 md:gap-8'>
      <div
        className={clsx(
          'order-2 col-span-2 grid gap-8 md:order-first',
          reverse && 'md:order-last',
        )}
      >
        {featureInfo[category as keyof typeof featureInfo].map((feat) => (
          <Feature key={feat.id} {...feat} />
        ))}
      </div>
      <div>
        <h2 className='sticky top-32 rotate-180 text-5xl uppercase [writing-mode:vertical-lr] md:text-7xl'>
          {category}
        </h2>
      </div>
    </div>
  );
};

const Feature = ({ id, title, description }: featureInfoProps) => {
  const Icon = iconMap[id];

  return (
    <div className='bg-background flex max-w-lg flex-col rounded-lg transition-transform hover:shadow-2xl md:p-4 dark:shadow-lg'>
      <div className='flex items-center gap-4'>
        {/* Icon - Centered Above Content */}
        <div className='bg-accent flex h-12 w-12 items-center justify-center rounded-full shadow-md'>
          <Icon className='h-6 w-6 text-[var(--color-text)] dark:text-[var(--color-text)]' />
        </div>
        <h3 className='text-xl font-bold md:text-4xl'>{title}</h3>
      </div>

      {/* Text Content */}
      <div className=''>
        <hr className='border-secondary my-4 rounded border-2' />
        <p className='text-foreground leading-relaxed'>{description}</p>
      </div>
    </div>
  );
};

const AllParksMap = () => {
  const USCenter: LngLatLike = [-98.35, 39.5];
  const [selectedLocation, setSelectedLocation] = useState<IPark | null>(null);
  const [activeParks, setActiveParks] = useState<IPark[] | null>(null);
  const [state, setState] = useState<StateProps | null>(null);
  const [center, setCenter] = useState<LngLatLike>(USCenter);
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

  useEffect(() => {
    if (!parks) return;
    if (state) {
      setActiveParks(
        parks?.filter((park) => park.states.toLowerCase().includes(state.id)),
      );
      setCenter(state.coords);
      return;
    }

    setCenter(USCenter);
    setActiveParks(parks);
  }, [parks, state]);

  if (isFetching)
    return (
      <div className='flex h-48 items-center justify-center'>
        <Loader />
      </div>
    );
  if (error || !parks) return <ErrorPage error={error || 'No parks'} />;

  return (
    <div className='bg-muted px-4 py-12'>
      <div className='container mx-auto overflow-hidden'>
        <h2 className='text-3xl md:text-6xl'>All U.S. National Parks</h2>
        <div className='bg-primary my-2 rounded-lg border-4 p-4 sm:my-4 lg:grid lg:grid-cols-4'>
          {/* Map (3 columns) */}

          <div className='relative overflow-hidden rounded-lg border-2 shadow-lg lg:col-span-3'>
            {activeParks && (
              <Map
                mapStyle={mapStyle}
                onLocationSelect={setSelectedLocation}
                selectedLocation={selectedLocation}
                lnglat={center}
                locations={activeParks}
                zoom={2}
              />
            )}

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
          <div className='inset-shadow col-span-1 mt-4 max-h-[536px] overflow-scroll md:mt-0 md:ml-4'>
            {!selectedLocation && (
              <>
                <Select
                  onValueChange={(val) =>
                    setState(stateMap.find((state) => state.id === val) || null)
                  }
                >
                  <SelectTrigger className='bg-background w-full'>
                    <SelectValue placeholder='Select a state' />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value=''>All States</SelectItem> */}
                    {stateMap.map((state) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state &&
                  activeParks?.map((park) => (
                    <div
                      onClick={() => setSelectedLocation(park)}
                      className='bg-accent border-foreground my-2 flex items-center gap-2 rounded border p-2 text-black'
                    >
                      <p>{park.name}</p>
                    </div>
                  ))}
              </>
            )}
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
      </div>
    </div>
  );
};
