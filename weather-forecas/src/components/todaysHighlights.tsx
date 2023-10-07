import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreType } from "../redux/store";
import {
  ITodayHighlight,
  fillHightlightsData,
  setTodaysHightLights,
} from "../redux/reducers/APIreducer";

export const TodaysHightlights = () => {
  const todaysHighlights: ITodayHighlight = useSelector(
    (state: StoreType) => state.daysForecastReducer.todaysHightLights
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=54.6892&longitude=25.2798&hourly=temperature_2m,relativehumidity_2m,surface_pressure,windspeed_10m&daily=sunrise,sunset,uv_index_max&current_weather=true&timezone=Europe%2FMoscow&forecast_days=1"
    )
      .then((response) => response.json())
      .then((json) => dispatch(setTodaysHightLights(fillHightlightsData(json))))
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <p>sunset: {todaysHighlights.sunsetTime}</p>
          <p>sunrise: {todaysHighlights.sunriseTime}</p>
          <p>humidity: {todaysHighlights.humidity}</p>
          <p>pressure: {todaysHighlights.pressure}</p>
          <p>temperature: {todaysHighlights.temperature}</p>
          <p>UV Index: {todaysHighlights.uvIndex}</p>
          <p>wind speed: {todaysHighlights.windSpeed}</p>
        </div>
      )}
    </div>
  );
};
