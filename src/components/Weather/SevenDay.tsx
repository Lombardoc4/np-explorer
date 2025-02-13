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
    (acc: any[], { name, isDaytime, ...forecast }: IForecast) => {
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
  const [sevenDay, setSevenDay] = useState<IForecast[]>([]);

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

  return sevenDay.map((ww: any) => <WeatherDayItem key={ww.name} {...ww} />);
};

const WeatherDayItem = (ww: any) => {
  return (
    <div className='grid grid-cols-4 items-center p-2'>
      <p>{ww.name !== 'Today' ? ww.name.slice(0, 3) : ww.name}</p>
      <WeatherIcon id={ww.shortForecast ?? ''} style={{ fontSize: '1.5em' }} />
      <p className='col-span-2'>
        {ww.low}&deg;{ww.temperatureUnit} - {ww.high}&deg;
        {ww.temperatureUnit}
      </p>
    </div>
  );
};
