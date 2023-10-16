import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CityInterface,
  daysForecastType,
  fetchDailyForecast,
} from "../../redux/reducers/APIreducer";
import { AppDispatch, StoreType } from "../../redux/store";
import { Weathercode, WeathercodeImg } from "../shared/weathercode.Styled";
import { getImageByWeathercode } from "../utility/weatherImages";

export const ForecastData = () => {
  const weather: daysForecastType = useSelector(
    (state: StoreType) => state.daysForecastReducer.dailyForecast,
  );

  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity,
  );

  const { loading, error } = useSelector(
    (state: StoreType) => state.daysForecastReducer,
  );

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
        timezone: selectedCity.timezone,
      }),
    );
  }, [selectedCity]);

  return (
    <div style={{ display: "flex" }}>
      {loading ? (
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
              <Weathercode>
                <WeathercodeImg
                  weathercode={item.weathercode}
                  src={getImageByWeathercode(item.weathercode)}
                  alt="weathercode_img"
                ></WeathercodeImg>
              </Weathercode>
              <p>Weathercode: {item.weathercode}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
