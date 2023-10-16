import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CityInterface,
  fetchHourlyForecast,
} from "../../redux/reducers/APIreducer";
import { AppDispatch, StoreType } from "../../redux/store";
import { Weathercode, WeathercodeImg } from "../utility/weathercode.Styled";
import { getImageByWeathercode } from "../utility/weatherImages";

import {
  HourContainer,
  HourlyContainer,
  HourlyForecastDiv,
} from "./hourlyForecastStyled";
import { getWindDirection } from "../utility/windDirection";
import {
  WindDirectionDiv,
  WindDirectionImg,
} from "../utility/windDirectionStyled";
import windDirectionArrow from "../../assets/wind_direction.png";

export const HourlyForecast = (props: any) => {
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
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          fiveRelevantHours.map((item, index) => (
            <HourContainer key={index}>
              <div>
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
                    src={windDirectionArrow}
                    alt="arrow"
                  ></WindDirectionImg>
                  <h4>{getWindDirection(item.windDirection).direction}</h4>
                </WindDirectionDiv>

                <h4> {item.windGusts} km/h</h4>
              </div>
            </HourContainer>
          ))
        )}
      </HourlyContainer>
    </HourlyForecastDiv>
  );
};
