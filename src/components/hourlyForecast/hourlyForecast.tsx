import { useEffect } from "react";
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
  HourDataDiv,
  HourlyContainer,
  HourlyForecastDiv,
  HourWeatherDiv,
} from "./hourlyForecastStyled";
import { useThemeContext } from "../../theme/themeContext";
import { IThemeContext } from "../../theme/theme";

export const HourlyForecast = () => {
  const themeContextData: IThemeContext = useThemeContext();

  const fiveRelevantHours = useSelector(
    (state: StoreType) => state.daysForecastReducer.fiveRelevantHours
  );
  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity
  );

  const { error } = useSelector(
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
    <HourlyForecastDiv
      themeStyles={themeContextData.stylesForTheme}
      themeType={themeContextData.currentTheme}
    >
      <h1>Hourly forecast</h1>
      <HourlyContainer>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          fiveRelevantHours.map((item, index) => (
            <HourContainer
              themeStyles={themeContextData.stylesForTheme}
              themeType={themeContextData.currentTheme}
              key={index}
            >
              <h3>{item.time}</h3>
              <HourDataDiv>
                <HourWeatherDiv>
                  <Weathercode>
                    <WeathercodeImg
                      weathercode={item.weathercode}
                      src={getImageByWeathercode(item.weathercode)}
                      alt="weathercode_img"
                    ></WeathercodeImg>
                  </Weathercode>

                  <h4>{item.temperature}°C</h4>
                </HourWeatherDiv>
                <div>
                  <WindDirectionDiv>
                    <WindDirectionImg
                      rotate={getWindDirection(item.windDirection).rotate}
                      src={"assets/wind_direction.png"}
                      alt="arrow"
                    ></WindDirectionImg>
                    <h4>{getWindDirection(item.windDirection).direction}</h4>
                  </WindDirectionDiv>
                  <h4> {item.windGusts} km/h</h4>
                </div>
              </HourDataDiv>
            </HourContainer>
          ))
        )}
      </HourlyContainer>
    </HourlyForecastDiv>
  );
};
