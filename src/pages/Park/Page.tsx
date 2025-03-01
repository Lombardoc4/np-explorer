import { useContext } from 'react';

import ParkContext from '../../utils/hooks/ParkContext';
import { activityCategories } from '../../utils/lib/activityCategories';
import ErrorPage from '../Error';
import { WeatherDisplay } from '../../components/Weather/WeatherReport';
import { ParkAlert, FeeSection, CategorySection } from './Sections';
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
import { Link as ScrollLink } from 'react-scroll';
import clsx from 'clsx';
import { Sidebar } from '../../components/Sidebar';
import { iconMap } from '../../utils/lib/iconMap';
import { QuickNav } from '../../components/Sidebar/QuickNav';

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

const SidebarContent = ({
  sections,
  collapsed,
}: {
  sections: { id: keyof typeof iconMap; label: string }[];
  collapsed: boolean;
}) => {
  // const [collapsed, setCollapsed] = useState(false);

  return (
    <ul className='divide-y divide-gray-800 dark:divide-gray-400'>
      {sections.map(({ id, label }) => {
        const Icon = iconMap[id];
        return (
          <li
            key={id}
            className={clsx('flex h-12 items-center', {
              'justify-center': collapsed,
            })}
          >
            <ScrollLink
              to={id}
              containerId='main-content'
              smooth={true}
              duration={300}
              offset={-90}
              className='flex w-full cursor-pointer items-center justify-start text-green-700 hover:text-green-900 dark:text-green-600 dark:hover:text-green-400'
            >
              <Icon size={24} className={collapsed ? 'mx-auto' : ''} />
              {!collapsed && (
                <span className='ml-2 w-fit overflow-hidden'>{label}</span>
              )}
            </ScrollLink>
          </li>
        );
      })}
    </ul>
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
  const endpoints = Object.keys(activityCategories);
  const [_modal, btn] = ShareModal(park.fullName);

  const { data: alerts, isFetching: alertFetching } = useQuery({
    queryKey: ['park', { catergory: 'alerts', parkCode: parkCode }],
    queryFn: () => fetchCustomData('alerts', parkCode),
  });
  const { data: visitorCenters, isFetching: visitorCenterFetching } = useQuery<
    IVisitorCenter[]
  >({
    queryKey: ['park', { catergory: 'visitorcenters', parkCode: parkCode }],
    queryFn: () => fetchCustomData('visitor-centers', parkCode),
  });
  const { data: tours, isFetching: toursFetching } = useQuery<ITour[]>({
    queryKey: ['park', { catergory: 'tours', parkCode: parkCode }],
    queryFn: () => fetchCustomData('tours', parkCode),
  });
  const { data: campgrounds, isFetching: campgroundsFetching } = useQuery<
    ICampground[]
  >({
    queryKey: ['campgrounds', parkCode],
    queryFn: () => fetchCustomData('campgrounds', parkCode),
  });
  const { data: events, isFetching: eventsFetching } = useQuery({
    queryKey: ['park', { catergory: 'events', parkCode: parkCode }],
    queryFn: () => fetchCustomData('events', parkCode),
  });
  const { data: thingsToDo, isFetching: thingsToDoFetching } = useQuery<
    IThingToDo[]
  >({
    queryKey: ['park', { catergory: 'thingstodo', parkCode: parkCode }],
    queryFn: () => fetchCustomData('thingstodo', parkCode),
  });
  const { data: parking, isFetching: parkingFetching } = useQuery({
    queryKey: ['park', { catergory: 'parkinglots', parkCode: parkCode }],
    queryFn: () => fetchCustomData('parkinglots', parkCode),
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
    {
      id: 'events',
      label: 'Events',
      condition: !eventsFetching && events && events?.length > 0,
    },
    { id: 'weather', label: 'Weather' },
    { id: 'directions', label: 'Directions' },
    {
      id: 'visitor-centers',
      label: 'Visitor Centers',
      condition:
        !visitorCenterFetching && visitorCenters && visitorCenters?.length > 0,
    },
    {
      id: 'tours',
      label: 'Tours',
      condition: !toursFetching && tours && tours?.length > 0,
    },
    {
      id: 'campgrounds',
      label: 'Campgrounds',
      condition: !campgroundsFetching && campgrounds && campgrounds?.length > 0,
    },
    {
      id: 'things-to-do',
      label: 'Things to Do',
      condition: !thingsToDoFetching && thingsToDo && thingsToDo?.length > 0,
    },
    {
      id: 'parking',
      label: 'Parking',
      condition: !parkingFetching && parking && parking?.length > 0,
    },
  ].filter(
    (section) => section.condition === undefined || section.condition,
  ) as sectionProps[];

  return (
    <div className='flex h-dvh'>
      <Sidebar>
        <SidebarContent sections={sections} collapsed={false} />
      </Sidebar>

      <div
        id='main-content'
        className='mt-4 flex-1 overflow-scroll bg-[var(--color-bg)] md:mt-0'
      >
        <div className='container mx-auto p-4 md:p-8'>
          <header
            id='overview'
            className='container mx-auto mt-12 md:mt-16 lg:px-0'
          >
            {StateLinks(park.states)}
            <div className='item-center flex justify-between gap-2'>
              <h1 className='text-2xl font-thin md:text-6xl'>
                {park.fullName}
              </h1>
              {btn}
            </div>
            <div className='mt-4 rounded-lg bg-[var(--color-bg-2)] p-4 pb-0'>
              {park.images.length > 0 && <ImgGrid images={park.images} />}
              <p className='py-4 md:text-xl'>{park.description}</p>
            </div>
          </header>
          <main className='my-8 grid gap-8 xl:gap-16'>
            {/* Mobile QuickNav */}
            <QuickNav sections={sections} />

            {/* Alerts */}
            <ParkAlert parkId={park.parkCode} />
            {/* Fees */}
            <FeeSection
              entranceFees={[...park.entrancePasses, ...park.entranceFees]}
            />
            {/* Weather */}
            <WeatherSection weather={park.weatherInfo}>
              <WeatherDisplay lat={park.latitude} long={park.longitude} />
            </WeatherSection>

            {/* Events */}
            <CategorySection
              key={'tours'}
              parkCode={park.parkCode}
              endpoint={'tours'}
            />
            <CategorySection
              key={'events'}
              parkCode={park.parkCode}
              endpoint={'events'}
            />
            <CategorySection
              key={'thingstodo'}
              parkCode={park.parkCode}
              endpoint={'thingstodo'}
            />
            <CategorySection
              key={'camping'}
              parkCode={park.parkCode}
              endpoint={'camping'}
            />

            <DirectionSection location={park} />
            {/* {endpoints
              .filter((e) => e !== 'events')
              .map((e) => (
                <CategorySection
                  key={e}
                  parkCode={park.parkCode}
                  endpoint={e}
                />
              ))} */}
          </main>
        </div>
        <Footer />
      </div>
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
