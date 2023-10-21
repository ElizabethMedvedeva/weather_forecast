import { useEffect, useState } from "react";
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
import {
  FourteenDaysButton,
  FourteenDaysDiv,
  SevenDaysButton,
} from "./dailyTempStyled";
export type ForecastDayAmount = "Seven" | "Fourteen";

export const ForecastData = () => {
  const [dayAmount, setDayAmount] = useState<ForecastDayAmount>("Seven");
  const changeForecastDateAmount = () => {
    if (dayAmount === "Seven") {
      setDayAmount("Fourteen");
    }
    if (dayAmount === "Fourteen") {
      setDayAmount("Seven");
    }
  };
  const weather: daysForecastType = useSelector(
    (state: StoreType) => state.daysForecastReducer.dailyForecast
  );
  const weatherSeven = weather.slice(0, 7);
  console.log(weatherSeven, "WEATHER");
  const weatherFourteen = weather.slice(7, weather.length);
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
  console.log("forecastData", dayAmount);
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SevenDaysButton
            dayAmount={dayAmount}
            onClick={changeForecastDateAmount}
          >
            14days
          </SevenDaysButton>
          <FourteenDaysButton
            dayAmount={dayAmount}
            onClick={changeForecastDateAmount}
          >
            7days
          </FourteenDaysButton>
          <div style={{ display: "flex", flexDirection: "row" }}>
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
                  <h5>weekDay: {weekDay[item.date.getDay()]}</h5>
                  <h5>date: {item.date.getDate()}</h5>
                  <h5>Max temperature: {item.temperatureMax}</h5>
                  <h5>Min temperature: {item.temperatureMin}</h5>
                  <h5>UV Index Max: {item.uvIndexMax}</h5>
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

          <FourteenDaysDiv
            dayAmount={dayAmount}
            style={{
              flexDirection: "row",
            }}
          >
            {weatherFourteen.map((item: any) => (
              <div
                key={item.date}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "green",
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
                  <h5>weekDay: {weekDay[item.date.getDay()]}</h5>
                  <h5>date: {item.date.getDate()}</h5>
                  <h5>Max temperature: {item.temperatureMax}</h5>
                  <h5>Min temperature: {item.temperatureMin}</h5>
                  <h5>UV Index Max: {item.uvIndexMax}</h5>
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
          </FourteenDaysDiv>
        </div>
      )}
    </div>
  );
};
