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
    <div
      id='weather'
      className='grid items-end gap-8 lg:grid-cols-2 lg:items-center'
    >
      {children}
      <div className='flex h-full flex-col gap-2'>
        {img && (
          <div
            className='relative hidden h-full rounded-lg border-2 bg-cover bg-center bg-no-repeat xl:block'
            style={{ backgroundImage: `url(${img.url})` }}
          />
        )}
        {weather && <p className='lg:text-xl'>{weather}</p>}
      </div>
    </div>
  );
};
