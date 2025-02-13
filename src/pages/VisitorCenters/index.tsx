import { useEffect } from 'react';
import { fetcher } from '../../utils/helper';
import { scrollToHash } from '../../utils/helper';
import { FullHeightLoader } from '../../components/Loader';
import { Link, useParams } from 'react-router';
import { AnchorLink } from '../Park/Page';
import { ParkSection } from '../Park/Sections';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../Error';
import { Button } from '../../components/Button';
import { ChevronRight } from 'lucide-react';

const ParkVisitorCenters = () => {
  const { parkId } = useParams();

  const {
    status,
    error,
    data: visitorCenters,
  } = useQuery({
    queryKey: ['park', { catergory: 'visitorcenters', parkCode: parkId }],
    queryFn: async () => await fetcher(`visitorcenters?parkCode=${parkId}`),
    retry: 0,
    staleTime: 5 * 60 * 1000,
  });

  console.log('visitorCenters', visitorCenters);

  if (status === 'pending') {
    return <FullHeightLoader />;
  }

  if (status === 'error') {
    return <ErrorPage error={error} />;
  }

  if (!visitorCenters || visitorCenters.length <= 0)
    return <ErrorPage error={'Issue loading the visitor centers'} />;

  return (
    <div className='container mx-auto min-h-svh px-4 py-24 lg:px-0 xl:max-w-5xl'>
      <div className='mb-4 flex items-center gap-2'>
        <Button className='uppercase hover:underline'>
          <Link to={`/park/${parkId}`}>{parkId}</Link>
        </Button>
        <ChevronRight />
        <Button className='hover:underline'>Visitor Centers</Button>
      </div>
      <h1 className='text-6xl font-thin hover:underline md:text-6xl'>
        Visitor Centers
      </h1>

      {visitorCenters.length > 1 && (
        <div className='mt-4 mb-16 grid h-full grid-cols-2 gap-4 md:grid-cols-4'>
          {visitorCenters.map((vc: any) => (
            <AnchorLink key={vc.name} id={vc.name} />
          ))}
        </div>
      )}
      <div className='grid gap-16'>
        {visitorCenters.map((vc: any) => (
          <VCSection key={vc.id} vc={vc} />
        ))}
      </div>
    </div>
  );
};

export default ParkVisitorCenters;

const VCSection = ({ vc }: { vc: any }) => {
  const { parkId } = useParams();

  return (
    <ParkSection name={vc.name}>
      <div className='col-span-2 grid gap-8 md:grid-cols-2 md:gap-8'>
        <div>
          <p className='text-xl'>{vc.description}</p>
          <Button className='mt-4 bg-black text-white dark:bg-white dark:text-black'>
            <Link to={`/park/${parkId}/visitor-centers/${vc.id}`}>
              Learn More
            </Link>
          </Button>
        </div>
        {vc.images.length > 0 && (
          <div className='h-fit overflow-hidden rounded border border-dashed md:order-2'>
            <img
              src={vc.images[0].url}
              className='mx-auto w-full'
              alt={vc.images[0].altText}
            />
          </div>
        )}
      </div>
    </ParkSection>
  );
};
