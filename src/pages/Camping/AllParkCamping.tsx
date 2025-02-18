import { useQuery } from '@tanstack/react-query';
import { Button } from '../../components/Button';
import { FullHeightLoader } from '../../components/Loader';
import ErrorPage from '../Error';
import { fetcher } from '../../utils/helper';
import { Link, useParams } from 'react-router';
import { AnchorLink } from '../Park/Page';
import { ParkSection } from '../Park/Sections';
import { category, endpoint } from '.';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const AllParkCamping = () => {
  const { parkId } = useParams();

  const {
    status,
    error,
    data: campgrounds,
  } = useQuery<ICampground[]>({
    queryKey: ['park', { catergory: endpoint, parkCode: parkId }],
    queryFn: async () => await fetcher(`${endpoint}?parkCode=${parkId}`),
  });

  if (status === 'pending') {
    return <FullHeightLoader />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!campgrounds || campgrounds.length <= 0)
    return <ErrorPage error={'Issue loading the visitor centers'} />;

  return (
    <div className='container mx-auto min-h-svh px-4 py-24 lg:px-0 xl:max-w-5xl'>
      <Breadcrumbs parkId={parkId} category={category} />

      <h2 className='mb-8 text-6xl font-thin md:text-8xl'>Camping</h2>
      {campgrounds.length > 1 && (
        <div className='mt-4 mb-16 grid h-full grid-cols-2 gap-4 md:mt-8 md:grid-cols-4'>
          {campgrounds.map((campground: ICampground) => (
            <AnchorLink key={campground.name} id={campground.name} />
          ))}
        </div>
      )}
      <div className='grid gap-16'>
        {campgrounds.map((camp: ICampground) => (
          <CampingSection key={camp.name} {...camp} />
        ))}
      </div>
    </div>
  );
};

const CampingSection = (camp: ICampground) => {
  return (
    <ParkSection name={camp.name}>
      <div className='col-span-2 grid gap-8 md:grid-cols-2 md:gap-8'>
        <div>
          <p className='text-xl'>{camp.description}</p>
          <Button className='mt-4 bg-black text-white dark:bg-white dark:text-black'>
            <Link to={`./${camp.id}`}>Learn More</Link>
          </Button>
        </div>
        {camp.images.length > 0 && (
          <div className='h-fit overflow-hidden rounded border border-dashed md:order-2'>
            <img
              src={camp.images[0].url}
              className='mx-auto w-full'
              alt={camp.images[0].altText}
            />
          </div>
        )}
      </div>
    </ParkSection>
  );
};
