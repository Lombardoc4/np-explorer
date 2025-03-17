import { useContext, useEffect, useMemo } from 'react';

import ParkContext from '../../utils/hooks/ParkContext';
import ErrorPage from '../Error';
import { WeatherDisplay } from '../../components/Weather/WeatherReport';
import { ParkAlert, FeeSection, ParkSection } from './Sections';
import { ShareModal } from '../../components/Modal/ShareModal';
import { ImgGrid } from '../../components/ImgGrid';
import { FullHeightLoader } from '../../components/Loader';
import SEO from '../../components/SEO';
import { Link, useParams } from 'react-router';
import { WeatherSection } from '../../components/Weather';
import { DirectionSection } from '../../components/Direction';
import { fetcher } from '../../utils/helper';
import { useQuery } from '@tanstack/react-query';
import { Footer } from '../../components/Footer';
import { iconMap } from '../../utils/lib/iconMap';
import { QuickNav } from '../../components/Sidebar/QuickNav';
import { CategoryCard } from './Sections/Activities';
import MapContainer from '@/components/mapContainer';
import { LngLatLike } from 'mapbox-gl';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
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

const itemLimit = 8;
export const ParkPage = () => {
  const { parkId } = useParams();
  const { status, error, data: park } = useContext(ParkContext);

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
  const [_modal, btn] = ShareModal(park.fullName);

  const { data: alerts, isFetching: alertFetching } = useQuery({
    queryKey: ['park', { catergory: 'alerts', parkCode: parkCode }],
    queryFn: () => fetchCustomData('alerts', parkCode),
  });
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
  const { data: places, isFetching: placesFetching } = useQuery({
    queryKey: ['park', { catergory: 'places', parkCode: parkCode }],
    queryFn: () => fetchCustomData('places', parkCode),
  });

  const sections = [
    { id: 'overview', label: 'Overview' },
    {
      id: 'alerts',
      label: 'Alerts',
      condition: !alertFetching && alerts?.length > 0,
    },
    {
      id: 'fees',
      label: 'Fees',
      condition: park.entranceFees && park.entranceFees.length > 0,
    },
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
        (!campgroundsFetching && campgrounds && campgrounds?.length > 0) ||
        (!placesFetching && places && places.length > 0),
    },
    { id: 'directions', label: 'Directions' },
  ].filter(
    (section) => section.condition === undefined || section.condition,
  ) as sectionProps[];

  const activities = useMemo(
    () => [
      ...(tours ? tours.map((t) => ({ ...t, type: 'Tours' })) : []),
      ...(thingsToDo
        ? thingsToDo.map((t) => ({ ...t, type: 'Things to do' }))
        : []),
      ...(events ? events.map((e) => ({ ...e, type: 'Events' })) : []),
    ],
    [tours, thingsToDo, events],
  );

  return (
    <div className='flex h-dvh'>
      <SidebarProvider>
        <ParkSidebar sections={sections} />

        <div id='main-content' className='mt-16 flex-1 overflow-scroll'>
          <header id='overview' className='container mx-auto mt-4 px-4'>
            {StateLinks(park.states)}
            <div className='flex items-end justify-between gap-2'>
              <h1 className='text-3xl font-thin md:text-6xl'>
                {park.fullName}
              </h1>
              {btn}
            </div>
            <div className='bg-primary mt-4 grid gap-8 rounded-lg p-4 xl:grid-cols-4'>
              <div className='xl:order-2 xl:col-span-3'>
                {park.images.length > 0 && <ImgGrid images={park.images} />}
              </div>
              <p className='md:text-xl'>{park.description}</p>
            </div>
          </header>
          <main className='my-8 grid gap-8 xl:gap-16'>
            {/* Mobile QuickNav */}
            <QuickNav sections={sections} />

            <div className='container mx-auto grid gap-4 px-4 md:gap-8'>
              {/* Alerts */}
              <ParkAlert parkId={park.parkCode} />
              {/* Fees */}
              <FeeSection
                entranceFees={[...park.entrancePasses, ...park.entranceFees]}
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

            <MapLoader
              parkCode={park.parkCode}
              lnglat={[Number(park.longitude), Number(park.latitude)]}
            />

            <DirectionSection location={park} />

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
        className='hover:underline'
        key={state}
        to={'/' + state.toLowerCase()}
      >
        {state}
      </Link>
      {!!states.split(',')[i + 1] && ', '}
    </>
  ));

export const AnchorLink = ({ id }: { id: string }) => {
  return (
    <a
      className='flex h-full min-h-16 items-center justify-center rounded border border-double px-2 py-4 text-center font-black uppercase hover:bg-green-200 hover:underline md:text-2xl dark:hover:bg-green-900'
      href={'#' + id.replace(/ /g, '-').toLowerCase()}
    >
      {id}
    </a>
  );
};

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
  const { data: parking, isFetching: parkingFetching } = useQuery({
    queryKey: ['park', { catergory: 'parkinglots', parkCode: parkCode }],
    queryFn: () => fetchCustomData('parkinglots', parkCode),
  });
  const { data: places, isFetching: placesFetching } = useQuery({
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
      <div className='border-accent mx-4 flex min-h-[400px] items-center justify-center overflow-hidden rounded-lg border-2 lg:min-h-[500px]'>
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
    ...(parking?.map((p) => ({ ...p, type: 'parking' })) || []),
    ...(places?.map((p) => ({
      ...p,
      type: 'sign',
    })) || []),
  ];

  return <MapContainer lnglat={lnglat} locations={locations} />;
};
