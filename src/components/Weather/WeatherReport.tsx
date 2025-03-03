import { useEffect, useState } from 'react';
import { WeatherIcon } from '../../assets/weather-icons';
import '../../styles/weather-icons.min.css';
import '../../styles/weather-icons-wind.min.css';
import clsx from 'clsx';
import { Loader } from '../Loader';
import { SevenDayForecast } from './SevenDay';
import { HourlyForecast } from './Hourly';

interface ILocation {
  city: string;
  state: string;
}

interface ILocationInfo {
  forecast: string;
  forecastHourly: string;
  relativeLocation: {
    properties: ILocation;
  };
}

const fetchLocation = async ({ lat, long }: { lat: string; long: string }) => {
  const endpointRes = await fetch(
    `https://api.weather.gov/points/${lat.slice(0, 7)},${long.slice(0, 7)}`,
  );
  const locationData = await endpointRes.json();
  return { ...locationData.properties };
};

const fetchHourly = async (url: string) => {
  const hourlyRes = await fetch(url);
  const hourly = await hourlyRes.json();
  return hourly;
};

export const WeatherDisplay = ({
  lat,
  long,
  weather,
}: {
  lat: string;
  long: string;
  weather?: string;
}) => {
  const [sevenDayUrl, setSevenDayUrl] = useState<string>('');
  const [hourlyUrl, setHourlyUrl] = useState<string>('');
  const [hourly, setHourly] = useState<Forecast[]>([]);
  const [location, setLocation] = useState<ILocation | null>(null);

  useEffect(() => {
    fetchLocation({ lat, long }).then(
      ({ forecast, forecastHourly, relativeLocation }: ILocationInfo) => {
        setLocation(relativeLocation.properties);
        setSevenDayUrl(forecast);
        setHourlyUrl(forecastHourly);
      },
    );
  }, [lat, long]);

  useEffect(() => {
    if (!hourlyUrl) return;
    fetchHourly(hourlyUrl).then((hourlyForecast) =>
      setHourly(hourlyForecast.properties.periods.slice(0, 24)),
    );
  }, [hourlyUrl]);

  if (!location) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <h2 className='mb-2 text-4xl font-black'>
        {location.city}, {location.state}
      </h2>
      <div className='flex flex-col items-center gap-4 md:flex-row'>
        {hourly.length > 0 && <CurrentWeather {...hourly[0]} />}
        {hourly.length > 0 && <HourlyForecast hours={hourly} />}
      </div>
      <SevenDayForecast url={sevenDayUrl} />
      {/* <small>Updated: {view === "24" ? updates.hourly : updates.sevenDay}</small> */}
    </div>
  );
};

const CurrentWeather = (current: Forecast) => (
  <div className='grid w-full grid-cols-2 gap-4 sm:grid-cols-1'>
    <div className='my-4 flex'>
      <WeatherIcon id={current.shortForecast} style={{ fontSize: '48px' }} />
      <p className='text-5xl tracking-tighter'>
        {current.temperature}
        &deg;{current.temperatureUnit}
      </p>
    </div>
    <div className='text-sm'>
      <p className='font-black'>{current.shortForecast}</p>
      <p>Percipitation: {current.probabilityOfPrecipitation.value}%</p>
      <p>Humidity: {current.relativeHumidity.value}%</p>
      <p>Wind: {current.windSpeed}</p>
    </div>
  </div>
);
