export const WeatherSection = ({
  weather,
  children,
}: {
  weather?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      id='weather'
      className='grid items-end gap-8 lg:grid-cols-2 lg:items-center'
    >
      {children}
      {weather && <p className='lg:text-xl'>{weather}</p>}
    </div>
  );
};
