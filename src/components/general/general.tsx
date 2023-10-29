import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import { StoreType } from "../../redux/store";
import { IThemeContext } from "../../theme/theme";
import { useThemeContext } from "../../theme/themeContext";
import { WeeklyForecast } from "../dailyTemperature/weeklyForecast";
import { NotFoundComponent } from "../empty/empty";
import { Main } from "../main/mainComponent";
import { SideHeader } from "../sideHeader/sideHeader";

import { GeneralContainer, LoaderDiv } from "./generalStyled";

export const General = () => {
  const themeContextData: IThemeContext = useThemeContext();
  const { loading } = useSelector(
    (state: StoreType) => state.daysForecastReducer,
  );
  return (
    <GeneralContainer
      themestyles={themeContextData.stylesForTheme}
      themetype={themeContextData.currentTheme}
    >
      <LoaderDiv>{loading && <CircularProgress size={"150px"} />}</LoaderDiv>
      <Router basename="/weather_forecast/">
        <SideHeader />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/weeklyForecast/" element={<WeeklyForecast />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </Router>
    </GeneralContainer>
  );
};
