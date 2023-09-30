import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { daysForecast, setDailyForecast } from "../redux/reducers/APIreducer";
import { StoreType } from "../redux/store";

export const ForecastData = () => {
  const weather: daysForecast = useSelector(
    (state: StoreType) => state.daysForecastReducer.dailyForecast
  );

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=54.6892&longitude=25.2798&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max&current_weather=true&timezone=Europe%2FMoscow"
    )
      .then((response) => response.json())
      .then((json) => dispatch(setDailyForecast(json)))
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        weather.map((item: any) => (
          <div
            key={item.date}
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "pink",
              margin: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "red",
                margin: "10px",
              }}
            >
              <p>weekDay: {weekDay[item.date.getDay()]}</p>
              <p>date: {item.date.getDate()}</p>
              <p>Max temperature: {item.temperatureMax}</p>
              <p>Min temperature: {item.temperatureMin}</p>
              <p>UV Index Max: {item.uvIndexMax}</p>
              <p>Weathercode: {item.weathercode}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
