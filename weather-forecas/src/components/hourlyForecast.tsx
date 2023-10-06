import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../redux/store";
import {
  setHourlyForecast,
  FillHourlyForecast,
} from "../redux/reducers/APIreducer";

export const HourlyForecast = () => {
  const hourlyForecast = useSelector(
    (state: StoreType) => state.daysForecastReducer.hourlyForecast
  );

  const [filtredHourlyForecast, setFiltredHourlyForecast] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=54.6892&longitude=25.2798&hourly=temperature_2m,winddirection_10m,windgusts_10m&daily=weathercode&current_weather=true&timezone=Europe%2FMoscow&forecast_days=1"
    )
      .then((response) => response.json())
      .then((json) => dispatch(setHourlyForecast(FillHourlyForecast(json))))
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const updateFiveRelevant = () => {
    const currentTime = new Date();

    for (let i = 0; i < hourlyForecast.length; i++) {
      if (currentTime <= hourlyForecast[i].date) {
        i -= 1;
        if (hourlyForecast.length - i < 5) {
          i = hourlyForecast.length - 5;
        }
        dispatch(setHourlyForecast(hourlyForecast.slice(i, i + 5)));
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
