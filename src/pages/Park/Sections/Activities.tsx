import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
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
      <div className='col-span-2 grid gap-8 sm:grid-cols-2 xl:grid-cols-4'>
        {uniqueCats.slice(0, itemLimit).map((cat) => (
          <CategoryCard key={cat.name || cat.title} data={cat} {...activeCat} />
        ))}
      </div>
    </ParkSection>
  );
};

export const CategoryCard = ({
  data,
  name,
  path,
}: {
  data: any;
  name: string;
  path: string;
}) => {
  const href = `./${path.replace(/ /g, '-').toLowerCase()}/${data.id}`;
  const date =
    data.date &&
    new Date(data.date.replace(/-/g, '/')).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className='group flex flex-col overflow-hidden rounded-lg border-2 border-green-700 shadow-md transition-transform hover:scale-[101%] hover:shadow'>
      {/* Image */}
      {data.images[0]?.url && data.images[0]?.url.startsWith('https://') && (
        <div
          className='relative h-64 bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: `url(${data.images[0].url})` }}
        >
          {data.isPassportStampLocation === '1' && (
            <div className='absolute top-2 right-2 flex h-10 w-10 items-center justify-center rounded-full border border-green-700 bg-white'>
              <PassportImg />
            </div>
          )}
        </div>
      )}
      <div className='flex flex-col gap-2 p-4 md:min-h-48'>
        {/* Title Row w Passport Location */}
        <div className='w-full'>
          {date && <p className='text-sm'>{date}</p>}
          {/* <div className='flex items-center justify-between gap-4'> */}
          <h3
            className='line-clamp-2 text-xl font-black'
            title={data.name || data.title}
          >
            <Link to={href}>{data.name || data.title}</Link>
          </h3>
          {/* </div> */}
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
        <Link className='mt-2 group-hover:underline' to={href}>
          Read more...
        </Link>
      </div>
    </div>
  );
};

const PassportImg = () => (
  <img
    title='Passport Stamp Location'
    src='/passport-book.webp'
    alt='Passport Stamp'
    style={{ height: '24px' }}
  />
);
