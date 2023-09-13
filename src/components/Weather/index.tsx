import { useEffect, useState } from "react";
import { FireIcon } from "../../assets/icons";
import { WeatherIcon } from "../../assets/weather-icons";

const todayAlts = ["Tonight", "This Afternoon"];

const reduceForecast = (periods: any[]) => {
    return periods.reduce((acc: any[], forecast: any) => {
        // *** Note for future - There will be 'Today' if not then 'This Afternoon' if not then 'Tonight

        const name = todayAlts.includes(forecast.name) ? "Today" : forecast.name.split(" ")[0]; // Extract the day name
        const isDay = forecast.isDaytime;

        const existingDayEntry = acc.find((item) => item.name === name);

        // Need to give the rest of the day

        if (existingDayEntry) {
            // Update high and low temperatures in the existing entry
            existingDayEntry.high = Math.max(existingDayEntry.high, forecast.temperature);
            existingDayEntry.low = Math.min(existingDayEntry.low, forecast.temperature);

        } else if (isDay || !acc.find((item) => item.name === 'Today')) {
            acc.push({
                ...forecast,
                high: forecast.temperature,
                low: forecast.temperature,
                name: name,
            });
        } else {
            acc.push({
                name: name,
                high: forecast.temperature,
                low: forecast.temperature,
            });
        }

        return acc;
    }, []);
};

const formatHours = (time: string) => {
    const hours = new Date(time).getHours();
    return (hours % 12 === 0 ? 12 : hours % 12) + (hours >= 12 ? "PM" : "AM");
};

const fetchEndpoints = async (lat: string, long: string) => {
    const endpointRes = await fetch(`https://api.weather.gov/points/${lat},${long}`);
    const endpoints = await endpointRes.json();
    const { forecast, forecastHourly } = endpoints.properties;

    const location = endpoints.properties.relativeLocation.properties;

    const sevenDayRes = await fetch(forecast);
    const sevenDay = await sevenDayRes.json();

    const hourlyRes = await fetch(forecastHourly);
    const hourly = await hourlyRes.json();

    // const gridRes = await fetch(endpoints.properties.forecastGridData);
    // const grid = await gridRes.json()
    // console.log('grid', grid)

    // console.log('hourly', hourly)
    // console.log('sevenDay', sevenDay)

    return { location, hourly, sevenDay };
};

interface ILocation {
    city: string;
    state: string;
}

interface IForecast {
    name: string;
    temperature: number;
    high: number;
    low: number;
    temperatureUnit: string;
    windSpeed: string;
    windDirection: string;
    shortForecast: string;
    startTime: string;
    isDaytime: string;
    probabilityOfPrecipitation: {
        value: string;
    };
    relativeHumidity: {
        value: string;
    };
}

export const WeatherDisplay = ({ lat, long }: { lat: string; long: string }) => {
    // const [updates, setUpdates] = useState({ sevenDay: "", hourly: "" });
    const [sevenDay, setSevenDay] = useState<IForecast[]>([]);
    const [hourly, setHourly] = useState<IForecast[]>([]);
    const [location, setLocation] = useState<ILocation>({ city: "", state: "" });
    const [view, setView] = useState<"24" | "7">("24");

    const current = hourly[0];

    useEffect(() => {
        fetchEndpoints(lat, long).then(({ location, hourly, sevenDay }) => {
            setLocation(location);
            setHourly(hourly.properties.periods.slice(0, 24));
            setSevenDay(reduceForecast(sevenDay.properties.periods));
            // setUpdates({
            //     hourly: new Date(hourly.properties.updateTime).toLocaleString(),
            //     sevenDay: new Date(sevenDay.properties.updateTime).toLocaleString(),
            // });
        });
    }, [lat, long]);

    // console.log("updates", updates);
    // console.log("hourly", hourly);
    // console.log("seven", sevenDay);

    // console.log("seven", sevenDay.map(d => ([d.startTime, d.shortForecast])));
    // console.log("hourly", hourly.map(d => ([d.name, d.shortForecast])));

    if (hourly.length <= 0 || sevenDay.length <= 0 || location.city.length <= 0) return <div className="weather-display">Loading Weather</div>;

    return (
        <div className='weather-display'>
            <div style={{ borderBottom: "1px solid #000", paddingBottom: "0.5em", marginBottom: '0.5em' }}>
                <h4 style={{ fontSize: "2em", textAlign: "center" }}>
                    {location.city}, {location.state}
                </h4>

                <div style={{ display: "grid", alignItems: "center", textAlign: "center", gap: "0.25em" }}>
                    <p style={{ fontSize: "3em" }}>
                        <WeatherIcon id={current.shortForecast} style={{fontSize: 'inherit'}} /> {current.temperature}&deg;{current.temperatureUnit}
                    </p>
                    <p>{current.shortForecast}</p>
                    <p>
                        <b>H:</b>
                        {sevenDay[0].low}&deg;{sevenDay[0].temperatureUnit} <b>L:</b>
                        {sevenDay[0].high}&deg;{sevenDay[0].temperatureUnit}
                    </p>
                    <div style={{display: 'flex', gap: '1em', margin: 'auto'}}>
                        <p>
                            <WeatherIcon id={"umbrella"} /> {current.probabilityOfPrecipitation.value}% Percipitation
                        </p>
                        <p>
                            <WeatherIcon id={"humidity"} /> {current.relativeHumidity.value}% Humidity
                        </p>
                        <p>
                            <WeatherIcon id={"wind-" + current.windDirection} /> {current.windSpeed} {current.windDirection}
                        </p>
                    </div>
                </div>
            </div>

                <div>
                    <a
                        onClick={() => {
                            setView("24");
                        }}
                        className={(view === "24" ? "bold " : "") + "btn"}
                    >
                        24 Hour Forecast
                    </a>
                    <a
                        onClick={() => {
                            setView("7");
                        }}
                        className={(view === "7" ? "bold " : "") + "btn"}
                    >
                        7 Day Forecast
                    </a>
                </div>
                <div
                    style={{
                        marginTop: "0.5em",
                        display: "grid",
                        gridTemplateColumns: `repeat(${view==='24' ? hourly.length : sevenDay.length}, ${view === '24' ? '90px' : '120px'})`,
                        overflow: "scroll",
                        paddingBottom: "0.5em",
                        // gridColumn: "1 / -1",
                    }}
                >
                    {view === "24" &&
                        hourly.map((forecast: any) => (
                            <div
                                key={forecast.startTime}
                                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                            >
                                {formatHours(forecast.startTime)}
                                <WeatherIcon
                                    id={forecast.shortForecast}
                                    isDay={forecast.isDaytime}
                                    style={{ fontSize: "2em", padding: "0.25em 0" }}
                                />
                                <p>
                                    {forecast.temperature}&deg;
                                    {forecast.temperatureUnit}
                                </p>
                                <p>
                                    <WeatherIcon id={"umbrella"} /> {forecast.probabilityOfPrecipitation.value}%
                                </p>
                            </div>
                        ))}
                    {view === "7" &&
                        sevenDay.map((ww: any) => (
                            <div
                                key={ww.name}
                                className='week-item'
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    alignItems: "center",
                                }}
                            >
                                <p>{ww.name !== "Today" ? ww.name.slice(0, 3) : ww.name}</p>
                                {/* <p>{ww.name}</p> */}
                                <WeatherIcon id={ww.shortForecast} style={{ fontSize: "2em", padding: "0.25em 0" }} />
                                <p>
                                    {ww.low}&deg;{ww.temperatureUnit} - {ww.high}&deg;{ww.temperatureUnit}
                                </p>
                                {/* <p>
                                    <WeatherIcon id={"umbrella"} /> {ww.probabilityOfPrecipitation.value}%
                                </p> */}
                            </div>
                        ))}
                </div>
                {/* <small>Updated: {view === "24" ? updates.hourly : updates.sevenDay}</small> */}
        </div>
    );
};
