import { useQuery } from '@tanstack/react-query';
import { Button } from '../../components/Button';
import { FullHeightLoader } from '../../components/Loader';
import ErrorPage from '../Error';
import { fetcher } from '../../utils/helper';
import { Link, useParams } from 'react-router';
import { ParkSection } from '../Park/Sections';
import { CategoryCard } from '../Park/Sections/Activities';

export const endpoint = 'campgrounds';
export const category = 'camping';

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

  if (!campgrounds || campgrounds.length <= 0) return null;

  return campgrounds.map((camp: ICampground) => (
    <CategoryCard data={camp} key={camp.name} name={'campground'} />
    // <CampingSection key={camp.name} {...camp} />
  ));
};
