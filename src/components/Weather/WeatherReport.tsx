import { useEffect, useState } from 'react';
import { WeatherIcon } from '../../assets/weather-icons';
import '../../styles/weather-icons-wind.min.css';
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

export const WeatherDisplay = (latLong: { lat: string; long: string }) => {
  const [sevenDayUrl, setSevenDayUrl] = useState<string>('');
  const [hourlyUrl, setHourlyUrl] = useState<string>('');
  const [hourly, setHourly] = useState<IForecast[]>([]);
  const [location, setLocation] = useState<ILocation | null>(null);
  const [dayView, setDayView] = useState(true);

  useEffect(() => {
    fetchLocation(latLong).then(
      ({ forecast, forecastHourly, relativeLocation }: ILocationInfo) => {
        setLocation(relativeLocation.properties);
        setSevenDayUrl(forecast);
        setHourlyUrl(forecastHourly);
      },
    );
  }, [latLong]);

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
    <div className='grid grid-cols-2 gap-4'>
      <div className='grid gap-2'>
        <h4 className='text-2xl'>
          {location.city}, {location.state}
        </h4>
        {hourly.length > 0 && <CurrentWeather {...hourly[0]} />}
      </div>
      <div className='flex flex-col'>
        <div className='flex text-center'>
          <ToggleButton
            title={'24 hours'}
            onClick={() => {
              setDayView(true);
            }}
            active={dayView}
          />
          <ToggleButton
            title={'7 day'}
            onClick={() => {
              setDayView(false);
            }}
            active={!dayView}
          />
        </div>
        <div className='grid h-[250px] grow-1 divide-y overflow-scroll rounded-b-xl border'>
          {dayView && <HourlyForecast hours={hourly} />}
          {!dayView && <SevenDayForecast url={sevenDayUrl} />}
        </div>
      </div>

      {/* <small>Updated: {view === "24" ? updates.hourly : updates.sevenDay}</small> */}
    </div>
  );
};

const ToggleButton = ({
  title,
  onClick,
  active,
}: {
  title: string;
  onClick: () => void;
  active: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full rounded-xl rounded-b-none border border-b-0 px-2 py-1',
        active && 'bg-green-400',
      )}
    >
      {title}
    </button>
  );
};

const CurrentWeather = (current: Forecast) => (
  <>
    <p className='text-5xl' style={{ fontSize: '3em' }}>
      <WeatherIcon id={current.shortForecast} style={{ fontSize: '42px' }} />{' '}
      {current.temperature}
      &deg;{current.temperatureUnit}
    </p>
    <div>
      <p>{current.shortForecast}</p>
      {/* <p>
            <b>H:</b>
            {sevenDay[0].high}&deg;{sevenDay[0].temperatureUnit} <b>L:</b>
            {sevenDay[0].low}&deg;{sevenDay[0].temperatureUnit}
          </p> */}
    </div>
    <hr />
    <div>
      <p>
        <WeatherIcon id={'umbrella'} /> Percipitation{' '}
        {current.probabilityOfPrecipitation.value}%
      </p>
      <p>
        <WeatherIcon id={'humidity'} /> Humidity{' '}
        {current.relativeHumidity.value}%
      </p>
      <p>
        <WeatherIcon id={'wind-' + current.windDirection} /> Wind{' '}
        {current.windSpeed} {current.windDirection}
      </p>
    </div>
  </>
);
