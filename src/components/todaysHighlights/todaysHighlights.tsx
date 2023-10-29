import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTodaysHighlights } from "../../redux/reducers/APIreducer";
import {
  CityInterface,
  ITodayHighlight,
} from "../../redux/reducers/reducerTypes";
import { AppDispatch, StoreType } from "../../redux/store";
import { IThemeContext } from "../../theme/theme";
import { useThemeContext } from "../../theme/themeContext";

import {
  CoupleWeatherDetailsDiv,
  SunTimeContainer,
  SunTimeDiv,
  SunTimeInfo,
  TemperatureDiv,
  TodaysHighlightsContainer,
  TodaysHighlightSet,
  TodaysHighlightsIcon,
  WeatherDetailsDiv,
  WeatherDetailsIcon,
  WeatherDetailsSet,
} from "./todaysHighlights.Styled";

export const TodaysHighlights = () => {
  const themeContextData: IThemeContext = useThemeContext();

  const todaysHighlights: ITodayHighlight | null = useSelector(
    (state: StoreType) => state.daysForecastReducer.todaysHighlights,
  );

  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity,
  );

  const { error } = useSelector(
    (state: StoreType) => state.daysForecastReducer,
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      fetchTodaysHighlights({
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
        timezone: selectedCity.timezone,
      }),
    );
  }, [selectedCity]);

  return (
    <TodaysHighlightsContainer
      themestyles={themeContextData.stylesForTheme}
      themetype={themeContextData.currentTheme}
    >
      <h1>{"Today's highlights"}</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <TodaysHighlightSet>
          <SunTimeContainer>
            <SunTimeDiv>
              <TodaysHighlightsIcon src="assets/sunriseTH.png" alt="sunrise" />
              <SunTimeInfo>
                <h5>Sunrise</h5>
                <h5>{todaysHighlights?.sunriseTime}</h5>
              </SunTimeInfo>
            </SunTimeDiv>
            <SunTimeDiv>
              <TodaysHighlightsIcon src="assets/sunsetTH.png" alt="sunset" />
              <SunTimeInfo>
                <h5>Sunset</h5>
                <h5>{todaysHighlights?.sunsetTime}</h5>
              </SunTimeInfo>
            </SunTimeDiv>
          </SunTimeContainer>
          <TemperatureDiv
            themestyles={themeContextData.stylesForTheme}
            themetype={themeContextData.currentTheme}
          >
            <h3>{todaysHighlights?.temperature}°C</h3>
          </TemperatureDiv>
          <WeatherDetailsSet>
            <CoupleWeatherDetailsDiv>
              <WeatherDetailsDiv>
                <WeatherDetailsIcon
                  src="assets/humidityTH.png"
                  alt="humidity"
                />
                <h5>{todaysHighlights?.humidity}%</h5>
                <h5>Humidity</h5>
              </WeatherDetailsDiv>
              <WeatherDetailsDiv>
                {" "}
                <WeatherDetailsIcon src="assets/windTH.png" alt="pressure" />
                <h5>{todaysHighlights?.windSpeed}km/h</h5>
                <h5>Wind Speed</h5>
              </WeatherDetailsDiv>
            </CoupleWeatherDetailsDiv>
            <CoupleWeatherDetailsDiv>
              <WeatherDetailsDiv>
                <WeatherDetailsIcon
                  src="assets/pressureTH.png"
                  alt="pressure"
                />
                <h5>{todaysHighlights?.pressure}hPa</h5>
                <h5>Pressure</h5>
              </WeatherDetailsDiv>
              <WeatherDetailsDiv>
                <WeatherDetailsIcon src="assets/uvTH.png" alt="pressure" />
                <h5>{todaysHighlights?.uvIndex}</h5>
                <h5>UV</h5>
              </WeatherDetailsDiv>
            </CoupleWeatherDetailsDiv>
          </WeatherDetailsSet>
        </TodaysHighlightSet>
      )}
    </TodaysHighlightsContainer>
  );
};
