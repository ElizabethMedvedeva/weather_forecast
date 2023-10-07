import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreType } from "../redux/store";
import {
  fetchHourlyForecast,
  CityInterface,
} from "../redux/reducers/APIreducer";

export const HourlyForecast = () => {
  const fiveRelevantHours = useSelector(
    (state: StoreType) => state.daysForecastReducer.fiveRelevantHours
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

  
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        fiveRelevantHours.map((item, index) => (
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
