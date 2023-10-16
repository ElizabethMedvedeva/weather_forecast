import { HourlyForecast } from "../hourlyForecast/hourlyForecast";
import { SearchLocation } from "../searchLocation/searchLocation";
import { SideHeader } from "../sideHeader/sideHeader";
import { TodaysHightlights } from "../todaysHiglights/todaysHighlights";

export const Main = () => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <SideHeader />
      </div>

      <div>
        <SearchLocation />
        <HourlyForecast />
        <TodaysHightlights />
      </div>
    </div>
  );
};
