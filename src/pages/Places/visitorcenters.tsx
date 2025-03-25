import { fetcher } from '../../utils/helper';
import { FullHeightLoader } from '../../components/Loader';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../Error';
import { CategoryCard } from '../Park/Sections/Activities';

export const endpoint = 'visitorcenters';
export const category = 'Visitor Centers';

export const AllParkVCs = () => {
  const { parkId } = useParams();
  const {
    status,
    error,
    data: visitorCenters,
  } = useQuery<IVisitorCenter[]>({
    queryKey: ['park', { catergory: endpoint, parkCode: parkId }],
    queryFn: async () => await fetcher(`${endpoint}?parkCode=${parkId}`),
  });

  if (status === 'pending') {
    return <FullHeightLoader />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!visitorCenters || visitorCenters.length <= 0) return null;

  return visitorCenters.map((vc: IVisitorCenter) => (
    <CategoryCard key={vc.id} data={vc} name={'visitorcenter'} />
  ));
};

// const Filters = ({
//   passport,
//   changePassport,
//   collapsed,
// }: {
//   passport: boolean;
//   changePassport: () => void;
//   collapsed: boolean;
// }) => {
//   return (
//     <div>
//       <h2 className='text-xl'>{!collapsed && 'Filters'}</h2>
//       <div className='flex gap-2'>
//         <input
//           checked={passport}
//           onChange={changePassport}
//           type='checkbox'
//           name='passport-stamp'
//           id='passport-stamp'
//         />
//         <label htmlFor='passport-stamp'>
//           {collapsed ? 'PS' : 'Passport Stamp'}
//         </label>
//       </div>
//       <div className='flex gap-2'>
//         <input
//           checked={passport}
//           onChange={changePassport}
//           type='checkbox'
//           name='passport-stamp'
//           id='passport-stamp'
//         />
//         <label htmlFor='passport-stamp'>Has Phone</label>
//       </div>
//       <div className='flex gap-2'>
//         <input
//           checked={passport}
//           onChange={changePassport}
//           type='checkbox'
//           name='passport-stamp'
//           id='passport-stamp'
//         />
//         <label htmlFor='passport-stamp'>Has Email</label>
//       </div>

//       <div>Amenities</div>
//     </div>
//   );
// };
