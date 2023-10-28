import { HourlyForecast } from "../hourlyForecast/hourlyForecast";
import { SearchLocation } from "../searchLocation/searchLocation";
import { TodaysHightlights } from "../todaysHiglights/todaysHighlights";

import {
  ForecastContainer,
  MainContainer,
  SearchContainer,
} from "./mainComponent.Styled";

export const Main = () => {
  return (
    <MainContainer>
      <ForecastContainer>
        <TodaysHightlights />
        <HourlyForecast />
      </ForecastContainer>
      <SearchContainer>
        <SearchLocation />
      </SearchContainer>
    </MainContainer>
  );
};
