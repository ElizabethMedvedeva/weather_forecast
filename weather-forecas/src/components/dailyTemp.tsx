import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CityInterface,
  daysForecast,
  fetchDailyForecast,
} from "../redux/reducers/APIreducer";
import { AppDispatch, StoreType } from "../redux/store";

export const ForecastData = () => {
  const weather: daysForecast = useSelector(
    (state: StoreType) => state.daysForecastReducer.dailyForecast
  );

  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity
  );

  console.log("selected", selectedCity);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

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
    dispatch(
      fetchDailyForecast({
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
      })
    );
  }, [selectedCity]);

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
