import { useEffect, useMemo } from 'react';

import ErrorPage from '../Error';
import { WeatherDisplay } from '../../components/Weather/WeatherReport';
import { ParkAlert, FeeSection, ParkSection } from './Sections';
import { ImgGrid } from '../../components/ImgGrid';
import { FullHeightLoader } from '../../components/Loader';
import SEO from '../../components/SEO';
import { Link, useParams } from 'react-router';
import { WeatherSection } from '../../components/Weather';
import { DirectionSection } from '../../components/Direction';
import { fetcher } from '../../utils/helper';
import { useQuery } from '@tanstack/react-query';
import { Footer } from '../../components/Footer';
import { iconMap } from '../../lib/iconMap';
import { QuickNav } from '../../components/Sidebar/QuickNav';
import { CategoryCard } from './Sections/CategoryCard';
import MapContainer from '@/components/mapContainer';
import { LngLatLike } from 'mapbox-gl';
import { ChevronLeft, ChevronRight, LinkIcon, Loader } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from '@/components/ui/sidebar';
import { scroller, Link as ScrollLink } from 'react-scroll';
import { ShareModal } from '@/components/Modal/ShareModal';

const itemLimit = 8;
export const ParkPage = () => {
  const { parkId } = useParams();
  const {
    status,
    data: park,
    error,
  } = useQuery<IPark>({
    queryKey: ['parks', { parkCode: parkId }],
    queryFn: async ({ queryKey }) => {
      const { parkCode } = queryKey[1] as { parkCode: string };
      if (!parkCode) return [];

      const data = await fetcher(`parks?parkCode=${parkCode}`);
      if (!data[0]) throw Error('No matching park');
      // SetLocalStorage({
      //   name: data[0].fullName,
      //   parkCode: data[0].parkCode,
      // });

      return data[0];
    },
    retry: 1,
    enabled: !!parkId, // Enable query execution only if parkId exists
  });

  const title =
    status === 'success' && park
      ? park.fullName
      : (parkId?.toUpperCase() as string);

  const description =
    status === 'success' && park ? park.description : 'Explore this park'; // Default description

  return (
    <>
      {/* SEO */}
      <SEO title={title} description={description} />

      {/* Content */}

      {/* Loading */}
      {status === 'pending' && <FullHeightLoader />}

      {/* Errors */}
      {error && <ErrorPage error={error} />}
      {status === 'success' && !park && (
        <ErrorPage error={'No park data available'} />
      )}

      {/* Success */}
      {status === 'success' && park && <ParkLayout {...park} />}
    </>
  );
};

const fetchCustomData = async (endpoint: string, parkCode: string) => {
  return await fetcher(`${endpoint}?parkCode=${parkCode}`);
};

type sectionProps = {
  id: keyof typeof iconMap;
  label: string;
  condition?: boolean;
};

export const ParkLayout = (park: IPark) => {
  const { parkCode } = park;

  const { data: tours, isFetching: toursFetching } = useQuery<ITour[]>({
    queryKey: ['park', { catergory: 'tours', parkCode: parkCode }],
    queryFn: () => fetchCustomData('tours', parkCode),
  });
  const { data: events, isFetching: eventsFetching } = useQuery<NPSEvent[]>({
    queryKey: ['park', { catergory: 'events', parkCode: parkCode }],
    queryFn: () => fetchCustomData('events', parkCode),
  });
  const { data: thingsToDo, isFetching: thingsToDoFetching } = useQuery<
    IThingToDo[]
  >({
    queryKey: ['park', { catergory: 'thingstodo', parkCode: parkCode }],
    queryFn: () => fetchCustomData('thingstodo', parkCode),
  });
  const { data: visitorCenters, isFetching: visitorCenterFetching } = useQuery<
    IVisitorCenter[]
  >({
    queryKey: ['park', { catergory: 'visitorcenters', parkCode: parkCode }],
    queryFn: () => fetchCustomData('visitorcenters', parkCode),
  });
  const { data: campgrounds, isFetching: campgroundsFetching } = useQuery<
    ICampground[]
  >({
    queryKey: ['campgrounds', parkCode],
    queryFn: () => fetchCustomData('campgrounds', parkCode),
  });
  const { data: parking, isFetching: parkingFetching } = useQuery({
    queryKey: ['park', { catergory: 'parkinglots', parkCode: parkCode }],
    queryFn: () => fetchCustomData('parkinglots', parkCode),
  });

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'weather', label: 'Weather' },
    {
      id: 'activities',
      label: 'Activities',
      condition:
        (!toursFetching && tours && tours.length > 0) ||
        (!thingsToDoFetching && thingsToDo && thingsToDo.length > 0) ||
        (!eventsFetching && events && events.length > 0),
    },
    {
      id: 'places',
      label: 'Places',
      condition:
        (!visitorCenterFetching &&
          visitorCenters &&
          visitorCenters?.length > 0) ||
        (!parkingFetching && parking && parking?.length > 0) ||
        (!campgroundsFetching && campgrounds && campgrounds?.length > 0),
    },
    { id: 'directions', label: 'Directions' },
  ].filter(
    (section) => section.condition === undefined || section.condition,
  ) as sectionProps[];

  const activities = useMemo(
    () => [
      ...(tours ? tours.map((t) => ({ ...t, type: 'Tour' })) : []),
      ...(thingsToDo
        ? thingsToDo.map((t) => ({ ...t, type: 'Thing to do' }))
        : []),
      ...(events ? events.map((e) => ({ ...e, type: 'Event' })) : []),
    ],
    [tours, thingsToDo, events],
  );

  return (
    <div className='flex h-dvh'>
      <SidebarProvider>
        <ParkSidebar sections={sections} />

        <div id='main-content' className='mt-16 flex-1 overflow-scroll'>
          <header id='overview' className='container mx-auto mt-4 grid px-4'>
            <div className='leading-2'>{StateLinks(park.states)}</div>
            <h1 className='text-3xl font-thin md:text-6xl'>{park.fullName}</h1>
            <div className='bg-primary mt-4 grid gap-4 rounded-xl border-4 p-4 xl:grid-cols-4'>
              <div className='xl:order-2 xl:col-span-3'>
                {park.images.length > 0 && (
                  <ImgGrid images={park.images} loadMore />
                )}
              </div>
              <div className='flex h-full flex-col'>
                <p className='mb-4 md:text-xl'>{park.description}</p>
                <div className='mt-auto flex items-center gap-4 border-t pt-4'>
                  {/* Official Page Link */}
                  {park.url && (
                    <Link
                      to={park.url}
                      target='_blank'
                      className='flex flex-col items-center justify-center'
                    >
                      <LinkIcon className='size-4 lg:size-6' /> NPS
                    </Link>
                  )}
                  <ShareModal name={park.fullName} />
                </div>
              </div>
            </div>
          </header>
          <main className='mt-8 grid gap-8 xl:gap-16'>
            {/* Mobile QuickNav */}
            <QuickNav sections={sections} />

            <div className='container mx-auto grid gap-4 px-4 md:gap-8'>
              {/* Alerts */}
              <ParkAlert parkId={park.parkCode} />
              {/* Fees */}
              <FeeSection
                entranceFees={park.entranceFees}
                entrancePasses={park.entrancePasses}
              />
            </div>

            {/* Weather */}
            <WeatherSection weather={park.weatherInfo} img={park.images[2]}>
              <WeatherDisplay lat={park.latitude} long={park.longitude} />
            </WeatherSection>

            {/* Activities */}
            {activities.length > 0 && (
              <ParkSection name='Activities' path='activities' count={8}>
                <div className='col-span-2 grid gap-8 sm:grid-cols-2 xl:grid-cols-4'>
                  {activities.slice(0, itemLimit).map((item) => (
                    <CategoryCard
                      key={item.title}
                      data={item}
                      name={item.type}
                      path={'activities'}
                    />
                  ))}
                </div>
              </ParkSection>
            )}
            <div>
              <div className={'w-full'}>
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
              <div className='bg-muted py-16'>
                <div className='container mx-auto grid gap-16'>
                  <div>
                    <h2 id='places' className='mb-4 text-4xl md:text-6xl'>
                      Places
                    </h2>
                    <MapLoader
                      parkCode={park.parkCode}
                      lnglat={[Number(park.longitude), Number(park.latitude)]}
                    />
                  </div>
                </div>
              </div>
              <div className='bg-primary py-8'>
                <DirectionSection location={park} />
              </div>
            </div>

            {/* Map for Visitor Centers, Parking, Campgrounds */}
          </main>
          <Footer />
        </div>

        {/* </main> */}
      </SidebarProvider>
    </div>
  );
};

const StateLinks = (states: IPark['states']) =>
  states.split(',').map((state, i) => (
    <>
      <Link
        className='text-sm hover:underline'
        key={state}
        to={'/' + state.toLowerCase()}
      >
        {state}
      </Link>
      {!!states.split(',')[i + 1] && ', '}
    </>
  ));

// const ActivityLoader = ({parkCode, lnglat})

const ParkSidebar = ({
  sections,
}: {
  sections: { id: keyof typeof iconMap; label: string }[];
}) => {
  // const [collapsed, setCollapsed] = useState(false);
  const { toggleSidebar, state } = useSidebar();
  const iconSize = 20;

  useEffect(() => {
    const hash = window.location.hash.substring(1); // Remove the '#' from the hash
    if (hash) {
      setTimeout(() => {
        scroller.scrollTo(hash, {
          containerId: 'main-content',
          smooth: true,
          duration: 500,
          offset: -20, // Adjust based on your layout
        });
      }, 1000); // Delay to ensure elements are loaded
    }
  }, []);

  return (
    <Sidebar collapsible='icon' className='mt-16'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sections.map((item) => {
                const Icon = iconMap[item.id];
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <ScrollLink
                        className='cursor-pointer'
                        to={item.id}
                        containerId='main-content'
                        smooth={true}
                        duration={500}
                        offset={-20}
                        onClick={() => {
                          window.history.pushState(null, '', `#${item.id}`);
                        }}
                      >
                        <Icon />
                        <span>{item.label}</span>
                      </ScrollLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div
        className='bg-accent absolute top-8 right-0 z-50 translate-x-[50%] cursor-pointer rounded-full opacity-50 shadow hover:opacity-100'
        onClick={toggleSidebar}
      >
        {state === 'collapsed' ? (
          <ChevronRight size={iconSize} />
        ) : (
          <ChevronLeft size={iconSize} />
        )}
      </div>
    </Sidebar>
  );
};

const MapLoader = ({
  parkCode,
  lnglat,
}: {
  parkCode: string;
  lnglat: LngLatLike;
}) => {
  const { data: visitorCenters, isFetching: visitorCenterFetching } = useQuery<
    IVisitorCenter[]
  >({
    queryKey: ['park', { catergory: 'visitorcenters', parkCode: parkCode }],
    queryFn: () => fetchCustomData('visitorcenters', parkCode),
  });
  const { data: campgrounds, isFetching: campgroundsFetching } = useQuery<
    ICampground[]
  >({
    queryKey: ['campgrounds', parkCode],
    queryFn: () => fetchCustomData('campgrounds', parkCode),
  });
  const { data: parking, isFetching: parkingFetching } = useQuery<IParking[]>({
    queryKey: ['park', { catergory: 'parkinglots', parkCode: parkCode }],
    queryFn: () => fetchCustomData('parkinglots', parkCode),
  });
  const { data: places, isFetching: placesFetching } = useQuery<IPlaces[]>({
    queryKey: ['park', { catergory: 'places', parkCode: parkCode }],
    queryFn: () => fetchCustomData('places', parkCode),
  });

  if (
    visitorCenterFetching ||
    parkingFetching ||
    campgroundsFetching ||
    placesFetching
  )
    return (
      <div className='border-accent flex min-h-[400px] items-center justify-center overflow-hidden rounded-lg border-2 lg:min-h-[500px]'>
        <Loader />
      </div>
    );

  const locations = [
    ...(visitorCenters?.map((vc) => ({
      ...vc,
      type: 'visitor-center',
    })) || []),
    ...(campgrounds?.map((cg) => ({
      ...cg,
      type: 'campsite',
    })) || []),
    ...(parking?.map((p: IParking) => ({ ...p, type: 'parking' })) || []),
    ...(places?.map((p: IPlaces) => ({ ...p, type: 'sign' })) || []),
  ];

  return <MapContainer lnglat={lnglat} locations={locations} />;
};
