export const WeatherSection = ({
  weather,
  img,
  children,
}: {
  weather?: string;
  img?: ImageProps;
  children?: React.ReactNode;
}) => {
  return (
    <div>
      <WaveDivider reverse={false} />
      <div className='bg-primary'>
        <div className='container mx-auto px-4 py-16'>
          <div
            id='weather'
            className='grid items-end gap-8 lg:grid-cols-2 lg:items-center'
          >
            <div>
              {children}
              {weather && (
                <p className='mt-2 border-t pt-2 lg:text-xl'>{weather}</p>
              )}
            </div>
            <div className='flex h-full flex-col gap-2'>
              {img && (
                <div
                  className='relative h-full min-h-[250px] rounded-lg border-2 bg-cover bg-center bg-no-repeat'
                  style={{ backgroundImage: `url(${img.url})` }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <WaveDivider reverse={true} />
    </div>
  );
};

const WaveDivider = ({ reverse }: { reverse?: boolean }) => (
  <div className={'w-full ' + (reverse ? 'rotate-z-180' : '')}>
    <svg
      width='100%'
      height='60' // Reduced height
      viewBox='0 0 1440 120' // Adjusted viewBox to match height
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='none'
      className='text-primary block'
    >
      <path d='M0,96L80,80C160,64,320,32,480,37.3C640,43,800,85,960,90.7C1120,96,1280,64,1360,48L1440,32V120H0Z'></path>
    </svg>
  </div>
);
