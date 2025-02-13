import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { Button } from '../../../components/Button';
import { fetcher, uniqueCategoryItems } from '../../../utils/helper';
import { activityCategories } from '../../../utils/lib/activityCategories';
import { ParkSection } from '.';

const itemLimit = 4;

export const CategorySection = ({
  parkCode,
  endpoint,
}: {
  parkCode: string;
  endpoint: string;
}) => {
  const activeCat = activityCategories[endpoint];

  const { status, data: categories } = useQuery({
    queryKey: ['park', { catergory: endpoint, parkCode: parkCode }],
    queryFn: async () => await fetcher(`${endpoint}?parkCode=${parkCode}`),
  });

  if (status !== 'success' || categories.length <= 0) return;

  const uniqueCats = uniqueCategoryItems(categories);

  return (
    <ParkSection {...activeCat} count={categories.length}>
      {/* Accordian */}
      {uniqueCats.slice(0, itemLimit).map((cat) => (
        <CategoryCard key={cat.name || cat.title} data={cat} {...activeCat} />
      ))}
      {uniqueCats.length > itemLimit && (
        <Button className='col-span-2 mx-auto w-fit border border-current text-2xl hover:underline'>
          <Link to={activeCat.path}>
            Explore {categories.length} {activeCat.name}
          </Link>
        </Button>
      )}
    </ParkSection>
  );
};

const CategoryCard = ({
  data,
  name,
  path,
}: {
  data: any;
  name: string;
  path: string;
}) => {
  const href = `./${name.replace(/\ /g, '-').toLowerCase()}/${data.id}`;
  const date =
    data.date &&
    new Date(data.date.replace(/-/g, '/')).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className='group flex flex-col justify-start gap-2'>
      {/* Title Row w Passport Location */}
      <div className='w-full border-b pb-1'>
        {date && <p className='font-bold'>{date}</p>}
        <div className='flex items-center justify-between gap-4'>
          <h4 className='text-xl font-black'>
            <Link to={href}>{data.name || data.title}</Link>
          </h4>
          {data.isPassportStampLocation === '1' && <PassportImg />}
        </div>
      </div>

      {/* Content */}
      {name === 'Events' ? (
        <div
          className='line-clamp-4'
          dangerouslySetInnerHTML={{
            __html: data.description.replaceAll('<br /><br />', '</p><p>'),
          }}
        />
      ) : (
        <p className='line-clamp-4'>
          {data.description || data.shortDescription}
        </p>
      )}
      <Link className='mt-auto group-hover:underline' to={href}>
        Read more...
      </Link>
    </div>
  );
};

const PassportImg = () => (
  <img
    title='Passport Stamp Location'
    src='/passport-book.webp'
    alt='Passport Stamp'
    style={{ height: '36px' }}
  />
);
