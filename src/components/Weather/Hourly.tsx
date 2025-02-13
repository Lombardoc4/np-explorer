import { WeatherIcon } from '../../assets/weather-icons';

export const HourlyForecast = ({ hours }: { hours: IForecast[] }) =>
  hours.map((forecast: IForecast) => (
    <WeatherHourItem key={forecast.startTime} {...forecast} />
  ));

const formatHours = (time: string) => {
  const hours = new Date(time).getHours();
  return (hours % 12 ? hours % 12 : 12) + (hours >= 12 ? 'PM' : 'AM');
};
const WeatherHourItem = (forecast: IForecast) => {
  return (
    <div className='grid grid-cols-4 items-center p-2'>
      <p className=''>{formatHours(forecast.startTime)}</p>
      <WeatherIcon
        id={forecast.shortForecast}
        isDay={forecast.isDaytime}
        style={{ fontSize: '1.5em' }}
      />
      <p>
        {forecast.temperature}&deg;
        {forecast.temperatureUnit}
      </p>
      <p>
        {forecast.probabilityOfPrecipitation.value}%
        <WeatherIcon id={'umbrella'} />{' '}
      </p>
    </div>
  );
};
