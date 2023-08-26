interface IWeatherIcons {
	[key: string]: string
}

interface IWeatherProps extends React.HTMLProps<HTMLElement> {
    id: string,
    isDay?: boolean
}

const icons: IWeatherIcons = {
    "Chance Rain Showers": 'day-storm-showers',
    "Chance Showers And Thunderstorms": 'day-thunderstorm',
    "Chance Showers And Thunderstorms then Partly Cloudy": 'day-showers',
    "Chance Rain Showers then Slight Chance Showers And Thunderstorms": 'rain',
    "Chance Rain Showers then Chance Showers And Thunderstorms": 'rain',
    "Cloudy": 'cloudy',
    "Isolated Showers And Thunderstorms": 'storm-showers',
    "Mostly Clear": 'day-sunny',
    "Mostly Cloudy": 'day-cloudy',
    "Mostly Sunny then Chance Showers And Thunderstorms": 'day-storm-showers',
    "Mostly Sunny then Slight Chance Showers And Thunderstorms": 'day-showers',
    "Mostly Sunny": 'day-sunny',
    "Partly Sunny": 'day-cloudy',
    "Partly Cloudy": 'day-cloudy',
    "Scattered Rain Showers": 'day-showers',
    "Slight Chance Showers And Thunderstorms": 'day-storm-showers',
    "Slight Chance Showers And Thunderstorms then Partly Sunny": 'day-shower',
    "Slight Chance Rain Showers then Slight Chance Showers And Thunderstorms": 'rain',
    "Slight Chance Rain Showers then Chance Showers And Thunderstorms": 'showers',
    "Slight Chance Showers And Thunderstorms then Showers And Thunderstorms Likely": 'storm-showers',
    "Sunny": 'day-sunny',
    "Sunny then Slight Chance Showers And Thunderstorms": 'day-showers',
    "Sunny then Chance Showers And Thunderstorms": 'day-storm-showers',
    "Sunny then Isolated Showers And Thunderstorms": 'day-storm-showers',
    "Scattered Showers And Thunderstorms": 'thunderstorm'
}

const nightIcons: IWeatherIcons = {
    "Chance Rain Showers": 'night-alt-storm-showers',
    "Chance Showers And Thunderstorms": 'night-alt-thunderstorm',
    "Chance Showers And Thunderstorms then Partly Cloudy": 'night-alt-showers',
    "Mostly Clear": 'night-clear',
    "Mostly Cloudy": 'night-alt-cloudy',
    "Mostly Sunny then Chance Showers And Thunderstorms": 'night-alt-storm-showers',
    "Mostly Sunny then Slight Chance Showers And Thunderstorms": 'night-alt-showers',
    "Mostly Sunny": 'night-clear',
    "Partly Sunny": 'night-alt-cloudy',
    "Partly Cloudy": 'night-alt-cloudy',
    "Scattered Rain Showers": 'night-alt-showers',
    "Slight Chance Showers And Thunderstorms": 'night-alt-storm-showers',
    "Slight Chance Showers And Thunderstorms then Partly Sunny": 'night-alt-shower',
    "Sunny": 'night-clear',
    "Sunny then Slight Chance Showers And Thunderstorms": 'night-alt-showers',
    "Sunny then Chance Showers And Thunderstorms": 'night-alt-storm-showers',
    "Sunny then Isolated Showers And Thunderstorms": 'night-alt-storm-showers',
}


export const WeatherIcon = ({id, isDay = true, ...rest }: IWeatherProps) => {

    if (!isDay) {
        return <i className={`wi wi-${nightIcons[id]}`}  style={{fontSize: '2em', padding: '0.25em 0'}} {...rest}/>
    }

    if (icons[id]) {
        return <i className={`wi wi-${icons[id]}`}  style={{fontSize: '2em', padding: '0.25em 0'}} {...rest}/>
        // console.log('icon', isDay, icon)
    }

    if (id.includes('wind-')) {
        const dir = id.split('-');
        return <i className={"wi wi-wind wi-towards-" + dir[1].toLocaleLowerCase()} {...rest}/>
    }

    return <i className={`wi wi-${id.toLowerCase()}`} {...rest}/>

}