interface IWeatherIcons {
  [key: string]: { day: string; night: string };
}

interface IWeatherProps extends React.HTMLProps<HTMLElement> {
  id: string;
  isDay?: boolean;
}

// Centralized Mapping with Both Day and Night Variants
const weatherIconMap: IWeatherIcons = {
  // Definitely used icons
  umbrella: { day: 'umbrella', night: 'umbrella' },
  humidity: { day: 'humidity', night: 'humidity' },

  // Personally generated
  'chance light snow': { day: 'day-snow', night: 'night-alt-snow' },
  'light snow likely': { day: 'day-snow', night: 'night-alt-snow' },
  'light snow': { day: 'day-snow', night: 'night-alt-snow' },
  'snow likely': { day: 'snow', night: 'night-alt-snow' },
  'heavy snow': { day: 'snow', night: 'night-alt-snow' },
  'chance light rain': { day: 'day-rain', night: 'night-alt-rain' },
  'isolated rain showers': {
    day: 'day-storm-showers',
    night: 'night-alt-storm-showers',
  },
  'chance rain showers': {
    day: 'day-storm-showers',
    night: 'night-alt-storm-showers',
  },
  'chance showers and thunderstorms': {
    day: 'day-thunderstorm',
    night: 'night-alt-thunderstorm',
  },
  'chance rain and snow': { day: 'day-sleet', night: 'night-alt-sleet' },
  cloudy: { day: 'cloudy', night: 'night-alt-cloudy' },
  'mostly clear': { day: 'day-sunny', night: 'night-clear' },
  'mostly cloudy': { day: 'day-cloudy', night: 'night-alt-cloudy' },
  'mostly sunny': { day: 'day-sunny', night: 'night-clear' },
  'partly cloudy': { day: 'day-cloudy', night: 'night-alt-cloudy' },
  'patchy fog': { day: 'day-fog', night: 'night-fog' },
  'rain showers likely': { day: 'showers', night: 'night-alt-showers' },
  'showers and thunderstorms': {
    day: 'storm-showers',
    night: 'night-alt-thunderstorm',
  },
  'slight chance showers and thunderstorms': {
    day: 'day-storm-showers',
    night: 'night-alt-storm-showers',
  },
  'slight chance rain showers': {
    day: 'day-showers',
    night: 'night-alt-showers',
  },
  sunny: { day: 'day-sunny', night: 'night-clear' },
  windy: { day: 'strong-wind', night: 'strong-wind' },

  // Chatgpt generated
  clear: { day: 'day-sunny', night: 'night-clear' },
  hot: { day: 'hot', night: 'hot' },
  cold: { day: 'snowflake-cold', night: 'snowflake-cold' },
  blizzard: { day: 'snow-wind', night: 'snow-wind' },
  hail: { day: 'hail', night: 'night-alt-hail' },
  sleet: { day: 'sleet', night: 'night-alt-sleet' },
  'freezing rain': { day: 'rain-mix', night: 'night-alt-rain-mix' },
  'areas of fog': { day: 'fog', night: 'fog' },
  'scattered showers': { day: 'day-showers', night: 'night-alt-showers' },
  'isolated thunderstorms': {
    day: 'day-thunderstorm',
    night: 'night-alt-thunderstorm',
  },
  'heavy rain': { day: 'rain', night: 'night-alt-rain' },
  'partly sunny': { day: 'day-cloudy', night: 'night-alt-cloudy' },
  'thunderstorms likely': {
    day: 'thunderstorm',
    night: 'night-alt-thunderstorm',
  },
  'chance of precipitation': { day: 'day-rain', night: 'night-alt-rain' },
  breezy: { day: 'day-windy', night: 'night-alt-cloudy-windy' },
  hazy: { day: 'day-haze', night: 'night-fog' },
  smoke: { day: 'smoke', night: 'smoke' },
  dust: { day: 'dust', night: 'dust' },
  sand: { day: 'sandstorm', night: 'sandstorm' },
  tornado: { day: 'tornado', night: 'tornado' },
  'hurricane conditions': { day: 'hurricane', night: 'hurricane' },
  'tropical storm conditions': {
    day: 'storm-showers',
    night: 'night-alt-storm-showers',
  },
  drizzle: { day: 'sprinkle', night: 'night-alt-sprinkle' },
  frigid: { day: 'thermometer-exterior', night: 'thermometer-exterior' },
  overcast: { day: 'cloudy', night: 'night-alt-cloudy' },
  'scattered snow showers': { day: 'day-snow', night: 'night-alt-snow' },
  'scattered thunderstorms': {
    day: 'day-thunderstorm',
    night: 'night-alt-thunderstorm',
  },
  thunderstorms: { day: 'thunderstorm', night: 'night-alt-thunderstorm' },
  'rain and snow': { day: 'rain-mix', night: 'night-alt-rain-mix' },
  'snow and sleet': { day: 'sleet', night: 'night-alt-sleet' },
  'freezing drizzle': { day: 'rain-mix', night: 'night-alt-rain-mix' },
  'blowing snow': { day: 'snow-wind', night: 'snow-wind' },
  'blowing dust': { day: 'dust', night: 'dust' },
  'blowing sand': { day: 'sandstorm', night: 'sandstorm' },
  frost: { day: 'snowflake-cold', night: 'snowflake-cold' },
  'ice pellets': { day: 'hail', night: 'night-alt-hail' },
  'volcanic ash': { day: 'volcano', night: 'volcano' },
};

// Function to Normalize Forecast Strings
const normalizeForecast = (forecast: string): string => {
  return forecast.toLowerCase().trim();
};

// Weather Icon Component
export const WeatherIcon = ({ id, isDay = true, ...rest }: IWeatherProps) => {
  const normalizedId = normalizeForecast(id);

  if (weatherIconMap[normalizedId]) {
    return (
      <i
        title={id}
        className={`wi wi-${isDay ? weatherIconMap[normalizedId].day : weatherIconMap[normalizedId].night}`}
        // style={{ fontSize: '2em', padding: '0.25em 0' }}
        {...rest}
      />
    );
  }

  // Handle Wind Directions (e.g., "wind-nw", "wind-se")
  if (normalizedId.startsWith('wind-')) {
    const direction = normalizedId.split('-')[1];
    return (
      <i
        title={id}
        className={`wi wi-wind wi-towards-${direction.toLowerCase()}`}
        {...rest}
      />
    );
  }
  console.log('id', id);
  // Fallback Icon
  return <i className='wi wi-na' {...rest} />;
};
