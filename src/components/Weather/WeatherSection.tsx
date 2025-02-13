import { ParkSection } from '../../pages/Park/Sections';

export const WeatherSection = ({ weather, children }: any) => {
  return (
    <ParkSection name='Weather'>
      {weather && (
        <div>
          <p className='text-xl'>{weather}</p>
        </div>
      )}
      {children}
    </ParkSection>
  );
};
