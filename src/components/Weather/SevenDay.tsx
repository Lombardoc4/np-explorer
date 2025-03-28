import { Loader } from 'lucide-react';
import { useState, useEffect } from 'react';
import { WeatherIcon } from '../../assets/weather-icons';
import { daysOfWeek } from '../../utils/helper';

const todayAlts = ['Today', 'Tonight', 'This Afternoon'];
const fetchSevenDay = async (url: string) => {
  const sevenDayRes = await fetch(url);
  const sevenDay = await sevenDayRes.json();
  return sevenDay;
};

// latest forecast for today can be Today, This Afternoon or Tonight
// The data is returned in a day and night fashion
// the first word in name is the day
const getNameOfDay = (name: string) => {
  return todayAlts.includes(name) ? 'Today' : name.split(' ')[0];
};

// This is used to create a list of all the weather results
const reduceForecast = (periods: WeatherPeriod[]) => {
  return periods.reduce(
    (acc: Forecast[], { name, ...forecast }: WeatherPeriod) => {
      const dayName = getNameOfDay(name);

      // Random edge case where we get a random value: Washington's Birthday
      if (
        dayName !== 'Today' &&
        !daysOfWeek.includes(
          dayName.toLowerCase() as (typeof daysOfWeek)[number],
        )
      ) {
        return acc;
      }

      const existingDayEntry = acc.find((item) => item.name === dayName);

      // Update high and low temperatures in the existing entry
      if (existingDayEntry) {
        existingDayEntry.high = Math.max(
          existingDayEntry.high,
          forecast.temperature,
        );
        existingDayEntry.low = Math.min(
          existingDayEntry.low,
          forecast.temperature,
        );

        return acc;
      }
      acc.push({
        ...forecast,
        name: dayName,
        high: forecast.temperature,
        low: forecast.temperature,
      });

      return acc;
    },
    [],
  );
};

export const SevenDayForecast = ({ url }: { url: string }) => {
  const [sevenDay, setSevenDay] = useState<Forecast[]>([]);

  useEffect(() => {
    fetchSevenDay(url).then(
      (forecast: { properties: { periods: WeatherPeriod[] } }) => {
        setSevenDay(reduceForecast(forecast.properties.periods));
      },
    );
  }, [url]);

  if (sevenDay.length === 0) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='mt-4 flex w-full justify-between'>
      {sevenDay.map((ww: Forecast) => (
        <WeatherDayItem key={ww.name} {...ww} />
      ))}
    </div>
  );
};

const WeatherDayItem = (ww: Forecast) => {
  return (
    <div className='flex w-fit flex-col gap-2 text-center text-sm sm:p-1'>
      <p>{ww.name !== 'Today' ? ww.name.slice(0, 3) : ww.name}</p>
      <WeatherIcon id={ww.shortForecast} className='text-xl sm:text-4xl' />
      <p className='text-xs sm:text-base'>
        {ww.high}&deg; {ww.low}&deg;
      </p>
    </div>
  );
};
