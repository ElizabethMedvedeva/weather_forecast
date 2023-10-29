import { HourlyForecast } from "../hourlyForecast/hourlyForecast";
import { SearchLocation } from "../searchLocation/searchLocation";
import { TodaysHighlights } from "../todaysHighlights/todaysHighlights";

import {
  ForecastContainer,
  MainContainer,
  SearchContainer,
} from "./mainComponent.Styled";

export const Main = () => {
  return (
    <MainContainer>
      <ForecastContainer>
        <TodaysHighlights />
        <HourlyForecast />
      </ForecastContainer>
      <SearchContainer>
        <SearchLocation />
      </SearchContainer>
    </MainContainer>
  );
};
