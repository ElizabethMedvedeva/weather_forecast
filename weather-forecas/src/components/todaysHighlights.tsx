import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreType } from "../redux/store";
import {
  CityInterface,
  ITodayHighlight,
  fetchTodaysHightlights,
} from "../redux/reducers/APIreducer";

export const TodaysHightlights = () => {
  const todaysHighlights: ITodayHighlight | null = useSelector(
    (state: StoreType) => state.daysForecastReducer.todaysHightLights
  );

  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity
  );

  const { loading, error } = useSelector(
    (state: StoreType) => state.daysForecastReducer
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      fetchTodaysHightlights({
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
        timezone: selectedCity.timezone,
      })
    );
  }, [selectedCity]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <p>sunset: {todaysHighlights?.sunsetTime}</p>
          <p>sunrise: {todaysHighlights?.sunriseTime}</p>
          <p>humidity: {todaysHighlights?.humidity}</p>
          <p>pressure: {todaysHighlights?.pressure}</p>
          <p>temperature: {todaysHighlights?.temperature}</p>
          <p>UV Index: {todaysHighlights?.uvIndex}</p>
          <p>wind speed: {todaysHighlights?.windSpeed}</p>
        </div>
      )}
    </div>
  );
};
