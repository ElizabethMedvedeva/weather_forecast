import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CityInterface,
  fetchHourlyForecast,
} from "../../redux/reducers/APIreducer";
import { AppDispatch, StoreType } from "../../redux/store";
import { getImageByWeathercode } from "../utility/weatherImages";

import {
  HourContainer,
  HourlyContainer,
  HourlyForecastDiv,
  Weathercode,
  WeathercodeImg,
} from "./hourlyForecastStyled";

export const HourlyForecast = (props: any) => {
  const fiveRelevantHours = useSelector(
    (state: StoreType) => state.daysForecastReducer.fiveRelevantHours,
  );
  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity,
  );

  const { loading, error } = useSelector(
    (state: StoreType) => state.daysForecastReducer,
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      fetchHourlyForecast({
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
        timezone: selectedCity.timezone,
      }),
    );
  }, [selectedCity]);

  return (
    <HourlyForecastDiv>
      <h1>Hourly forecast</h1>
      <HourlyContainer>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          fiveRelevantHours.map((item, index) => (
            <HourContainer key={index}>
              <h3>time: {item.time}</h3>
              <Weathercode>
                <WeathercodeImg
                  weathercode={item.weathercode}
                  src={getImageByWeathercode(item.weathercode)}
                  alt="weathercode_img"
                ></WeathercodeImg>
              </Weathercode>
              <h3>weathercode: {item.weathercode}</h3>
              <h3>temperature: {item.temperature}</h3>
              <h3>windDirection: {item.windDirection}</h3>
              <h3>wind Gusts: {item.windGusts}</h3>
            </HourContainer>
          ))
        )}
      </HourlyContainer>
    </HourlyForecastDiv>
  );
};
