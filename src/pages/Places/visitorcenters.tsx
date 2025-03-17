import { fetcher } from '../../utils/helper';
import { FullHeightLoader } from '../../components/Loader';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../Error';
import SEO from '../../components/SEO';
import { CategoryCard } from '../Park/Sections/Activities';
import { activityCategories } from '../../utils/lib/activityCategories';
import { useState } from 'react';

export const endpoint = 'visitorcenters';
export const category = 'Visitor Centers';

export const AllParkVCs = () => {
  const activeCat = activityCategories[endpoint];
  const { parkId } = useParams();
  const [passport, change_passport] = useState(false);
  const {
    status,
    error,
    data: visitorCenters,
  } = useQuery<IVisitorCenter[]>({
    queryKey: ['park', { catergory: endpoint, parkCode: parkId }],
    queryFn: async () => await fetcher(`${endpoint}?parkCode=${parkId}`),
  });

  if (status === 'pending') {
    return (
      <>
        <SEO
          title={`Visitor Centers of ${parkId?.toUpperCase()}`}
          description='Explore visitor centers of the USNP'
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

  console.log('vis', visitorCenters);
  return (
    <>
      <SEO
        title={`Visitor Centers of ${parkId?.toUpperCase()}`}
        description={`${visitorCenters.length} Visitor Centers at ${parkId}`}
      />
      <div className='flex h-dvh'>
        {/* <Sidebar>
          <Filters
            changePassport={() => change_passport(!passport)}
            passport={passport} collapsed={false}          />
        </Sidebar> */}

        <div id='main-content' className='mt-16 flex-1 overflow-scroll p-6'>
          <header>
            <h1 className='mb-8 text-6xl font-thin md:text-8xl'>
              Visitor Centers
            </h1>
          </header>
          <main>
            <div className='col-span-2 grid gap-8 sm:grid-cols-2'>
              {visitorCenters
                .filter((vc) => {
                  if (passport) {
                    return vc.isPassportStampLocation === '1';
                  } else {
                    return true;
                  }
                })
                .map((vc: IVisitorCenter) => (
                  <CategoryCard key={vc.id} data={vc} {...activeCat} />
                ))}
              {/* <VCSection key={vc.id} vc={vc} /> */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

const Filters = ({
  passport,
  changePassport,
  collapsed,
}: {
  passport: boolean;
  changePassport: () => void;
  collapsed: boolean;
}) => {
  return (
    <div>
      <h2 className='text-xl'>{!collapsed && 'Filters'}</h2>
      <div className='flex gap-2'>
        <input
          checked={passport}
          onChange={changePassport}
          type='checkbox'
          name='passport-stamp'
          id='passport-stamp'
        />
        <label htmlFor='passport-stamp'>
          {collapsed ? 'PS' : 'Passport Stamp'}
        </label>
      </div>
      <div className='flex gap-2'>
        <input
          checked={passport}
          onChange={changePassport}
          type='checkbox'
          name='passport-stamp'
          id='passport-stamp'
        />
        <label htmlFor='passport-stamp'>Has Phone</label>
      </div>
      <div className='flex gap-2'>
        <input
          checked={passport}
          onChange={changePassport}
          type='checkbox'
          name='passport-stamp'
          id='passport-stamp'
        />
        <label htmlFor='passport-stamp'>Has Email</label>
      </div>

      <div>Amenities</div>
    </div>
  );
};
