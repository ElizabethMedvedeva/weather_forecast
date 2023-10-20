import { useSelector } from "react-redux";
import { HourlyForecast } from "../hourlyForecast/hourlyForecast";
import { SearchLocation } from "../searchLocation/searchLocation";
import { TodaysHightlights } from "../todaysHiglights/todaysHighlights";

import { MainContainer } from "./mainComponent.Styled";
import { CircularProgress } from "@mui/material";
import { StoreType } from "../../redux/store";

export const Main = () => {
  const { loading, error } = useSelector(
    (state: StoreType) => state.daysForecastReducer
  );
  return (
    <>
      {
        loading ? (
          <CircularProgress />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (<MainContainer>
          <div>
            <TodaysHightlights />
            <HourlyForecast />
          </div>
          <div>
            <SearchLocation />
          </div>
        </MainContainer>)
      }
    </>
  );
};
