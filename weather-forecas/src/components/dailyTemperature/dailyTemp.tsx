import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CityInterface,
  daysForecastType,
  fetchDailyForecast,
} from "../../redux/reducers/APIreducer";
import { AppDispatch, StoreType } from "../../redux/store";
import {
  Weathercode,
  WeathercodeImg,
} from "../utility/weathercode/weathercode.Styled";
import { getImageByWeathercode } from "../utility/weathercode/weatherImages";
import { CircularProgress } from "@mui/material";

export const ForecastData = () => {
  const weather: daysForecastType = useSelector(
    (state: StoreType) => state.daysForecastReducer.dailyForecast
  );
  const weatherSeven = weather.slice(0, 7);
  console.log(weatherSeven, "WEATHER");
  const weatherFourteen = weather.slice(9, weather.length);
  console.log(weatherFourteen, "WEATHER14");

  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity
  );

  const { loading, error } = useSelector(
    (state: StoreType) => state.daysForecastReducer
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
      })
    );
  }, [selectedCity]);

  return (
    <div style={{ display: "flex" }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {weatherSeven.map((item: any) => (
            <div
              key={item.date}
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "pink",
                margin: "10px",
                height: "30vh",
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
              </div>
            </div>
          ))}
          {weatherFourteen.map((item: any) => (
            <div
              key={item.date}
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "pink",
                margin: "10px",
                height: "30vh",
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
