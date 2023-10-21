import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CityInterface,
  fetchHourlyForecast,
} from "../../redux/reducers/APIreducer";
import { AppDispatch, StoreType } from "../../redux/store";
import {
  Weathercode,
  WeathercodeImg,
} from "../utility/weathercode/weathercode.Styled";
import { getImageByWeathercode } from "../utility/weathercode/weatherImages";
import { getWindDirection } from "../utility/windDirection/windDirection";
import {
  WindDirectionDiv,
  WindDirectionImg,
} from "../utility/windDirection/windDirectionStyled";

import {
  HourContainer,
  HourlyContainer,
  HourlyForecastDiv,
} from "./hourlyForecastStyled";
import { CircularProgress } from "@mui/material";
import { useThemeContext } from "../../theme/themeContext";

export const HourlyForecast = () => {
  const themeContext: any = useThemeContext();
  console.log(themeContext, "HOURLY");
  console.log(themeContext, "123123");
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
        timezone: selectedCity.timezone,
      })
    );
  }, [selectedCity]);

  return (
    <HourlyForecastDiv>
      <h1>Hourly forecast</h1>
      <HourlyContainer>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          fiveRelevantHours.map((item, index) => (
            <HourContainer key={index}>
              <h3>{item.time}</h3>
              <Weathercode>
                <WeathercodeImg
                  weathercode={item.weathercode}
                  src={getImageByWeathercode(item.weathercode)}
                  alt="weathercode_img"
                ></WeathercodeImg>
              </Weathercode>

              <h4>{item.temperature}°C</h4>
              <WindDirectionDiv>
                <WindDirectionImg
                  rotate={getWindDirection(item.windDirection).rotate}
                  src={"assets/wind_direction.png"}
                  alt="arrow"
                ></WindDirectionImg>
                <h4>{getWindDirection(item.windDirection).direction}</h4>
              </WindDirectionDiv>
              <h4> {item.windGusts} km/h</h4>
            </HourContainer>
          ))
        )}
      </HourlyContainer>
    </HourlyForecastDiv>
  );
};
