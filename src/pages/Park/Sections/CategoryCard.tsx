import { Link, useNavigate } from 'react-router';

export const CategoryCard = ({
  data,
  name,
  path,
}: {
  data: IThingToDo | ITour | NPSEvent | ICampground | IVisitorCenter;
  name?: string;
  path?: string;
}) => {
  const navigate = useNavigate();
  const href = `./${!path ? '' : path.replace(/ /g, '-').toLowerCase() + '/'}${data.id}${!name ? '' : '/' + name.replace(/ /g, '-').toLowerCase()}`;
  const title = (
    'name' in data ? data.name : 'title' in data ? data.title : ''
  ) as string;
  const date =
    'date' in data && typeof data.date === 'string'
      ? new Date(data.date.replace(/-/g, '/')).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : undefined;

  return (
    <div
      onClick={() => navigate(href)}
      className='border-secondary relative h-64 cursor-pointer overflow-hidden rounded-lg border-2 shadow-md transition-transform hover:scale-[101%] hover:shadow'
    >
      {/* Image */}
      {data?.images[0]?.url && data.images[0]?.url.startsWith('https://') && (
        <div
          className='relative h-full bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: `url(${data.images[0].url})` }}
        >
          {'isPassportStampLocation' in data &&
            data.isPassportStampLocation === '1' && (
              <div className='border-secondary absolute top-2 right-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white'>
                <PassportImg />
              </div>
            )}
        </div>
      )}
      <div className='absolute inset-0 flex flex-col justify-end gap-2 bg-gradient-to-b from-transparent via-transparent to-black p-4'>
        {/* Title Row w Passport Location */}
        <div className='w-full text-white'>
          {date && <p className='text-sm'>{date}</p>}
          {name && <p className='text-sm'>{name}</p>}
          {/* <div className='flex items-center justify-between gap-4'> */}
          <h3 className='line-clamp-2 text-xl font-black' title={title}>
            <Link to={href}>{title}</Link>
          </h3>
          {/* </div> */}
        </div>
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
