import { useContext } from 'react';

import ParkContext from '../../utils/hooks/ParkContext';
import {
  activityCategories,
  ActivityDetails,
} from '../../utils/lib/activityCategories';
import ErrorPage from '../Error';
import { WeatherDisplay } from './components/weather';
import {
  ParkAlert,
  DirectionSection,
  WeatherSection,
  FeeCard,
  CategorySection,
} from './Sections';
import { TriangleAlert, Wallet } from 'lucide-react';
import { Button } from '../../components/Button';
import { ShareModal } from '../../components/Modal/ShareModal';
import { ImgGrid } from '../../components/ImgGrid';
import { ParkTitle } from './components/title';
import { FullHeightLoader } from '../../components/Loader';

export const ParkPage = () => {
  const { status, error, data: park } = useContext(ParkContext);

  if (status === 'pending') {
    return <FullHeightLoader />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!park) {
    return <ErrorPage error={'No Park'} />;
  }

  return <ParkLayout {...park} />;
};

export const ParkLayout = (park: IPark) => {
  const endpoints = Object.keys(activityCategories);

  return (
    <>
      <header className='container mx-auto mt-24 px-4 lg:px-0'>
        <ParkTitle {...park} />
        {park.images.length > 0 && <ImgGrid images={park.images} />}
      </header>
      <div className='container mx-auto grid gap-16 px-4 md:my-8 lg:px-0 xl:max-w-5xl'>
        <ParkHeader name={park.fullName} description={park.description} />
        <ParkAlert parkId={park.parkCode} />

        <DirectionSection park={park} />

        <WeatherSection weather={park.weatherInfo}>
          <WeatherDisplay lat={park.latitude} long={park.longitude} />
        </WeatherSection>

        <FeeCard entranceFees={park.entranceFees} />
        {endpoints.map((e) => (
          <CategorySection key={e} parkCode={park.parkCode} endpoint={e} />
        ))}
      </div>

      {/* <div className='container'> */}
      {/* <ParkCards title={"Explore Other Parks"} parks={otherParks}  states={states}/> */}
      {/* </div> */}
    </>
  );
};

const ParkHeader = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  const [_modal, btn] = ShareModal(name);

  // const visitCount = getVisitorCount(park.parkCode);
  const categoryEls = Object.values(activityCategories).map(
    (category: ActivityDetails) => (
      <AnchorLink key={category.name} id={category.name} />
    ),
  );

  return (
    <div className='grid items-center gap-4 md:grid-cols-2 md:gap-8'>
      {/* {visitCount > 0 && <span>{visitCount} visitors in 2022</span>} */}
      <div className='flex gap-4 text-center md:col-span-2 md:items-end'>
        <a href='#alerts'>
          <Button>
            <TriangleAlert /> Alerts
          </Button>
        </a>
        <a href='#entrance-fees'>
          <Button>
            <Wallet />
            Fees
          </Button>
        </a>
        {btn}
      </div>
      <div>
        <p className='rounded border border-dashed bg-green-200 p-4 text-justify text-xl font-stretch-condensed dark:bg-green-900 dark:text-white'>
          {description}
        </p>
      </div>
      <div className='grid h-full grid-cols-2 gap-4'>{categoryEls}</div>
    </div>
  );
};

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
