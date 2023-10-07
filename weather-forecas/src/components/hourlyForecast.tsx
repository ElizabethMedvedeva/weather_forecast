import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreType } from "../redux/store";
import {
  setHourlyForecast,
  FillHourlyForecast,
  fetchHourlyForecast,
  CityInterface,
} from "../redux/reducers/APIreducer";

export const HourlyForecast = () => {
  const hourlyForecast = useSelector(
    (state: StoreType) => state.daysForecastReducer.hourlyForecast
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
      fetchHourlyForecast({
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
      })
    );
  }, [selectedCity]);

  // useEffect(() => {
  //   updateFiveRelevant();
  // }, [hourlyForecast]);

  const updateFiveRelevant = () => {
    console.log("five");
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

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        hourlyForecast.map((item, index) => (
          <div key={index}>
            <h1>Hourly forecast</h1>
            <div>
              <h3>time: {item.time}</h3>
              <h3>weathercode: {item.weathercode}</h3>
              <h3>temperature: {item.temperature}</h3>
              <h3>windDirection: {item.windDirection}</h3>
              <h3>wind Gusts: {item.windGusts}</h3>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
