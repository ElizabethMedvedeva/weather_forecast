import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWeeklyForecast } from "../../redux/reducers/APIreducer";
import { AppDispatch, StoreType } from "../../redux/store";
import { WeathercodeImgDaily } from "../utility/weathercode/weathercode.Styled";
import { getImageByWeathercode } from "../utility/weathercode/weatherImages";
import {
  AdaptivePhoneDiv,
  DailyTempCardBox,
  DailyTempCardTemperatureBox,
  DailyTempCardTopDiv,
  DailyTempContainer,
  DailyTempDayDiv,
  DailyTempImgDiv,
  DailyTempMainDiv,
  DailyTempMaxTempDiv,
  DailyTempMinTempDiv,
  DailyTempUvDiv,
  DailyTempUvIcon,
  DailyTempWeekDayDiv,
  FourteenDaysButton,
  FourteenDaysDiv,
  SevenDaysButton,
  SevenDaysDiv,
  WeeklyContainer,
} from "./weeklyForecastStyled";
import { useThemeContext } from "../../theme/themeContext";
import { IThemeContext } from "../../theme/theme";
import {
  CityInterface,
  daysForecastType,
} from "../../redux/reducers/reducerTypes";

export type ForecastDayAmount = "Seven" | "Fourteen";

export const WeeklyForecast = () => {
  const themeContextData: IThemeContext = useThemeContext();
  const [dayAmount, setDayAmount] = useState<ForecastDayAmount>("Seven");
  const changeForecastDateAmount = () => {
    const value = dayAmount === "Seven" ? "Fourteen" : "Seven";
    setDayAmount(value);
  };
  const weather: daysForecastType = useSelector(
    (state: StoreType) => state.daysForecastReducer.weeklyForecast
  );
  const weatherSeven = weather.slice(0, 7);

  const weatherFourteen = weather.slice(7, weather.length);

  const weatherPhone = weather.slice(0, weather.length);

  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity
  );

  const { error } = useSelector(
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
      fetchWeeklyForecast({
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
        timezone: selectedCity.timezone,
      })
    );
  }, [selectedCity]);

  return (
    <WeeklyContainer>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <DailyTempMainDiv>
          {" "}
          <SevenDaysDiv>
            {weatherSeven.map((item: any) => (
              <DailyTempContainer key={item.date}>
                <DailyTempCardBox
                  themestyles={themeContextData.stylesForTheme}
                  themetype={themeContextData.currentTheme}
                >
                  <DailyTempCardTopDiv>
                    <DailyTempWeekDayDiv>
                      <h5>{weekDay[item.date.getDay()]}</h5>
                    </DailyTempWeekDayDiv>
                    <DailyTempDayDiv>
                      <h5> {item.date.getDate()}</h5>
                    </DailyTempDayDiv>
                  </DailyTempCardTopDiv>

                  <DailyTempImgDiv>
                    <WeathercodeImgDaily
                      weathercode={item.weathercode}
                      src={getImageByWeathercode(item.weathercode)}
                      alt="weathercode_img"
                    ></WeathercodeImgDaily>
                  </DailyTempImgDiv>

                  <DailyTempCardTemperatureBox>
                    <DailyTempMaxTempDiv>
                      <h4>max: {item.temperatureMax} °C</h4>
                    </DailyTempMaxTempDiv>
                    <DailyTempMinTempDiv>
                      <h4>min: {item.temperatureMin} °C</h4>
                    </DailyTempMinTempDiv>
                  </DailyTempCardTemperatureBox>
                  <DailyTempUvDiv>
                    <DailyTempUvIcon
                      src="assets/uvTH.png"
                      alt="pressure"
                    ></DailyTempUvIcon>
                    <h5>{item.uvIndexMax}</h5>
                  </DailyTempUvDiv>
                </DailyTempCardBox>
              </DailyTempContainer>
            ))}
          </SevenDaysDiv>
          <div>
            <SevenDaysButton
              themestyles={themeContextData.stylesForTheme}
              themetype={themeContextData.currentTheme}
              dayAmount={dayAmount}
              onClick={changeForecastDateAmount}
            >
              Show more
            </SevenDaysButton>
          </div>
          <FourteenDaysDiv dayAmount={dayAmount}>
            {weatherFourteen.map((item: any) => (
              <DailyTempContainer key={item.date}>
                <DailyTempCardBox
                  themestyles={themeContextData.stylesForTheme}
                  themetype={themeContextData.currentTheme}
                >
                  <DailyTempCardTopDiv>
                    <DailyTempWeekDayDiv>
                      <h5>{weekDay[item.date.getDay()]}</h5>
                    </DailyTempWeekDayDiv>
                    <DailyTempDayDiv>
                      <h5> {item.date.getDate()}</h5>
                    </DailyTempDayDiv>
                  </DailyTempCardTopDiv>

                  <DailyTempImgDiv>
                    <WeathercodeImgDaily
                      weathercode={item.weathercode}
                      src={getImageByWeathercode(item.weathercode)}
                      alt="weathercode_img"
                    ></WeathercodeImgDaily>
                  </DailyTempImgDiv>

                  <DailyTempCardTemperatureBox>
                    <DailyTempMaxTempDiv>
                      <h4>max: {item.temperatureMax} °C</h4>
                    </DailyTempMaxTempDiv>
                    <DailyTempMinTempDiv>
                      <h4>min: {item.temperatureMin} °C</h4>
                    </DailyTempMinTempDiv>
                  </DailyTempCardTemperatureBox>
                  <DailyTempUvDiv>
                    <DailyTempUvIcon
                      src="assets/uvTH.png"
                      alt="pressure"
                    ></DailyTempUvIcon>
                    <h5>{item.uvIndexMax}</h5>
                  </DailyTempUvDiv>
                </DailyTempCardBox>
              </DailyTempContainer>
            ))}
          </FourteenDaysDiv>
          <AdaptivePhoneDiv>
            {weatherPhone.map((item: any) => (
              <DailyTempContainer key={item.date}>
                <DailyTempCardBox
                  themestyles={themeContextData.stylesForTheme}
                  themetype={themeContextData.currentTheme}
                >
                  <DailyTempCardTopDiv>
                    <DailyTempWeekDayDiv>
                      <h5>{weekDay[item.date.getDay()]}</h5>
                    </DailyTempWeekDayDiv>
                    <DailyTempDayDiv>
                      <h5> {item.date.getDate()}</h5>
                    </DailyTempDayDiv>
                  </DailyTempCardTopDiv>

                  <DailyTempImgDiv>
                    <WeathercodeImgDaily
                      weathercode={item.weathercode}
                      src={getImageByWeathercode(item.weathercode)}
                      alt="weathercode_img"
                    ></WeathercodeImgDaily>
                  </DailyTempImgDiv>

                  <DailyTempCardTemperatureBox>
                    <DailyTempMaxTempDiv>
                      <h4>max: {item.temperatureMax} °C</h4>
                    </DailyTempMaxTempDiv>
                    <DailyTempMinTempDiv>
                      <h4>min: {item.temperatureMin} °C</h4>
                    </DailyTempMinTempDiv>
                  </DailyTempCardTemperatureBox>
                  <DailyTempUvDiv>
                    <DailyTempUvIcon
                      src="assets/uvTH.png"
                      alt="pressure"
                    ></DailyTempUvIcon>
                    <h5>{item.uvIndexMax}</h5>
                  </DailyTempUvDiv>
                </DailyTempCardBox>
              </DailyTempContainer>
            ))}
          </AdaptivePhoneDiv>
          <FourteenDaysButton
            themestyles={themeContextData.stylesForTheme}
            themetype={themeContextData.currentTheme}
            dayAmount={dayAmount}
            onClick={changeForecastDateAmount}
          >
            Show less
          </FourteenDaysButton>
        </DailyTempMainDiv>
      )}
    </WeeklyContainer>
  );
};
