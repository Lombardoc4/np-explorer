import { ParkSection } from '../../pages/Park/Sections';

export const WeatherSection = ({
  weather,
  children,
}: {
  weather?: string;
  children?: React.ReactNode;
}) => {
  return (
    <ParkSection name='Weather'>
      {children}
      {weather && <p className='text-xl'>{weather}</p>}
    </ParkSection>
  );
};
