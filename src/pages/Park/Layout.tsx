import { useContext } from 'react';
import { Outlet } from 'react-router';

import ParkContext from '../../utils/hooks/ParkContext';
import ErrorPage from '../Error';
import { FullHeightLoader } from '../../components/Loader';

export const ParkLayout = () => {
  const { status, error, data: park } = useContext(ParkContext);

  if (status === 'pending') {
    return <FullHeightLoader />;
  }
  if (error) return <ErrorPage error={error} />;
  if (!park) return <ErrorPage error={'No Park'} />;

  return <Outlet />;
};
