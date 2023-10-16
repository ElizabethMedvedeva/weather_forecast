import { HourlyForecast } from "../hourlyForecast/hourlyForecast";
import { SearchLocation } from "../searchLocation/searchLocation";
import { TodaysHightlights } from "../todaysHiglights/todaysHighlights";

export const Main = () => {
  return (
    <div>
      <SearchLocation />
      <HourlyForecast />
      <TodaysHightlights />
    </div>
  );
};
