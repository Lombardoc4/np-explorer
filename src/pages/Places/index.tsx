import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AllParkCamping } from './campgrounds';
import { AllParkVCs } from './visitorcenters';
import { useParams } from 'react-router';

export const Places = () => {
  const { parkId } = useParams();

  return (
    <div className='container mx-auto py-24'>
      <Breadcrumbs crumbs={[parkId as string, 'places']} />
      <AllParkVCs />
      <AllParkCamping />
    </div>
  );
};
