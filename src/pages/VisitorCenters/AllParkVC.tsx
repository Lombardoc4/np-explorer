import { fetcher } from '../../utils/helper';
import { FullHeightLoader } from '../../components/Loader';
import { Link, useParams } from 'react-router';
import { AnchorLink } from '../Park/Page';
import { ParkSection } from '../Park/Sections';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../Error';
import { Button } from '../../components/Button';
import { ChevronRight } from 'lucide-react';
import { catergory } from '.';
import SEO from '../../components/SEO';

export const AllParkVCs = () => {
  const { parkId } = useParams();

  const {
    status,
    error,
    data: visitorCenters,
  } = useQuery({
    queryKey: ['park', { catergory: catergory, parkCode: parkId }],
    queryFn: async () => await fetcher(`${catergory}?parkCode=${parkId}`),
  });

  if (status === 'pending') {
    return (
      <>
        <SEO
          title={`Visitor Centers of ${parkId?.toUpperCase()}`}
          description='Explore visitor centers in the park'
        />
        <FullHeightLoader />;
      </>
    );
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!visitorCenters || visitorCenters.length <= 0)
    return <ErrorPage error={'Issue loading the visitor centers'} />;

  return (
    <>
      <SEO
        title={`Visitor Centers of ${parkId?.toUpperCase()}`}
        description={`${visitorCenters.length} Visitor Centers at ${parkId}`}
      />
      <div className='container mx-auto min-h-svh px-4 py-24 lg:px-0 xl:max-w-5xl'>
        <header>
          <Breadcrumbs parkId={parkId} />
          <h1 className='mb-8 text-6xl font-thin md:text-8xl'>
            Visitor Centers
          </h1>
        </header>
        <main>
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
        </main>
      </div>
    </>
  );
};

const Breadcrumbs = ({ parkId }: { parkId?: string }) => (
  <div className='mb-4 flex items-center gap-2'>
    <Button className='uppercase hover:underline'>
      <Link to={`/park/${parkId}`}>{parkId}</Link>
    </Button>
    <ChevronRight />
    <Button className='hover:underline'>Visitor Centers</Button>
  </div>
);

const VCSection = ({ vc }: { vc: any }) => {
  return (
    <ParkSection name={vc.name}>
      <div className='col-span-2 grid gap-8 md:grid-cols-2 md:gap-8'>
        <div>
          <p className='text-xl'>{vc.description}</p>
          <Button className='mt-4 bg-black text-white dark:bg-white dark:text-black'>
            <Link to={`./${vc.id}`}>Learn More</Link>
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
