import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { IThemeContext } from "../../theme/theme";
import { useThemeContext } from "../../theme/themeContext";
import { GeneralContainer, LoaderDiv } from "./generalStyled";
import { SideHeader } from "../sideHeader/sideHeader";
import { Main } from "../main/mainComponent";
import { WeeklyForecast } from "../dailyTemperature/dailyTemp";
import { NotFoundComponent } from "../empty/empty";
import { useSelector } from "react-redux";
import { StoreType } from "../../redux/store";
import { CircularProgress } from "@mui/material";

export const General = () => {
  const themeContextData: IThemeContext = useThemeContext();
  const { loading } = useSelector(
    (state: StoreType) => state.daysForecastReducer
  );
  return (
    <GeneralContainer
      themestyles={themeContextData.stylesForTheme}
      themetype={themeContextData.currentTheme}
    >
      <LoaderDiv>{loading && <CircularProgress size={"150px"} />}</LoaderDiv>
      <Router>
        <SideHeader />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/weeeklyForecast" element={<WeeklyForecast />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </Router>
    </GeneralContainer>
  );
};
