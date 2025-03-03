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
const reduceForecast = (periods: any[]) => {
  return periods.reduce(
    (acc: any[], { name, isDaytime, ...forecast }: Forecast) => {
      const dayName = getNameOfDay(name);

      // Random edge case where we get a random value: Washington's Birthday
      if (dayName !== 'Today' && !daysOfWeek.includes(dayName.toLowerCase())) {
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
      }
      // Add daytime forecast to weather
      // Special case if afternoon or tonight and today doesnt exist
      else if (isDaytime || !acc.find((item) => item.name === 'Today')) {
        acc.push({
          ...forecast,
          high: forecast.temperature,
          low: forecast.temperature,
          name: dayName,
        });
      } else {
        acc.push({
          name: dayName,
          high: forecast.temperature,
          low: forecast.temperature,
        });
      }

      return acc;
    },
    [],
  );
};

export const SevenDayForecast = ({ url }: { url: string }) => {
  const [sevenDay, setSevenDay] = useState<Forecast[]>([]);

  useEffect(() => {
    fetchSevenDay(url).then((forecast: any) => {
      setSevenDay(reduceForecast(forecast.properties.periods));
    });
  }, [url]);

  if (sevenDay.length === 0) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div
      className='mt-4 grid grid-cols-7'
      style={{
        gridTemplateColumns: `repeat(${sevenDay.length}, minmax(0, 1fr))`,
      }}
    >
      {sevenDay.map((ww: any) => (
        <WeatherDayItem key={ww.name} {...ww} />
      ))}
    </div>
  );
};

const WeatherDayItem = (ww: any) => {
  return (
    <div className='flex flex-col gap-2 p-1 text-center text-sm'>
      <p>{ww.name !== 'Today' ? ww.name.slice(0, 3) : ww.name}</p>
      <WeatherIcon id={ww.shortForecast} style={{ fontSize: '2.5em' }} />
      <p>
        {ww.high}&deg; {ww.low}&deg;
      </p>
    </div>
  );
};
