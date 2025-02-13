import { ParkSection } from '../components/section';

export const WeatherSection = ({ weather, children }: any) => {
  return (
    <ParkSection name='Weather'>
      <div>
        <p className='text-xl'>{weather}</p>
      </div>
      {children}
    </ParkSection>
  );
};
