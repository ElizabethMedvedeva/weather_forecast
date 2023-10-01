import { useEffect, useState } from "react";

export interface HourInterface {
  temperature: number;
  windDirection: number;
  windGusts: number;
  weathercode: number;
  time: string;
  date: Date;
}

export type HourlyForecastArray = Array<HourInterface>;

const FillHourlyForecast = (serverResponse: any) => {
  const formatHours = (hours: number) => {
    if (hours > 9) {
      return `${hours}`;
    }
    return `0${hours}`;
  };
  const formatMinutes = (minutes: number) => {
    if (minutes > 9) {
      return `${minutes}`;
    }
    return `0${minutes}`;
  };
  const hourlyForecast: HourlyForecastArray = [];
  const hourly = serverResponse.hourly;
  for (let i = 0; i < hourly.time.length; i++) {
    const date = new Date(serverResponse.hourly.time[i]);
    const hourForecast: HourInterface = {
      date: date,
      time: `${formatHours(date.getHours())}:${formatMinutes(
        date.getMinutes()
      )}`,
      windDirection: serverResponse.hourly.winddirection_10m[0],
      windGusts: serverResponse.hourly.windgusts_10m[0],
      temperature: serverResponse.hourly.temperature_2m[0],
      weathercode: serverResponse.daily.weathercode[0],
    };
    if (hourForecast.date.getHours() % 3 === 0) {
      hourlyForecast.push(hourForecast);
    }
  }
  return hourlyForecast;
};

export const HourlyForecast = () => {
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastArray>([]);
  const [filtredHourlyForecast, setFiltredHourlyForecast] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=54.6892&longitude=25.2798&hourly=temperature_2m,winddirection_10m,windgusts_10m&daily=weathercode&current_weather=true&timezone=Europe%2FMoscow&forecast_days=1"
    )
      .then((response) => response.json())
      .then((json) => setHourlyForecast(FillHourlyForecast(json)))
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const updateFiveRelevant = () => {
    console.log("gerre", hourlyForecast);
    const currentTime = new Date();
    for (let i = 0; i < hourlyForecast.length; i++) {
      if (currentTime <= hourlyForecast[i].date) {
        i -= 1;
        if (hourlyForecast.length - i < 5) {
          i = hourlyForecast.length - 5;
        }
        setHourlyForecast(hourlyForecast.slice(i, i + 5));
        break;
      }
    }
  };
  if (!filtredHourlyForecast && hourlyForecast.length > 0) {
    updateFiveRelevant();
    setFiltredHourlyForecast(true);
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        hourlyForecast.map((item, index) => (
          <div key={index}>
            <h1>Hourly forecast</h1>
            <div>
              <p>time: {item.time}</p>
              <p>weathercode: {item.weathercode}</p>
              <p>temperature: {item.temperature}</p>
              <p>windDirection: {item.windDirection}</p>
              <p>wind Gusts: {item.windGusts}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
