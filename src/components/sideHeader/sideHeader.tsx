import { NavLink } from "react-router-dom";
import Switch from "@mui/material/Switch";

import { IThemeContext } from "../../theme/theme";
import { useThemeContext } from "../../theme/themeContext";

import {
  SideHeaderDiv,
  SideHeaderIcon,
  SideHeaderIconDiv,
} from "./sideHeaderStyled";

export const SideHeader = () => {
  const themeContext: IThemeContext = useThemeContext();

  return (
    <SideHeaderDiv>
      <SideHeaderIconDiv>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "")}
          to="/"
        >
          <SideHeaderIcon src={"assets/weatherIcon.png"} />
        </NavLink>
      </SideHeaderIconDiv>
      <SideHeaderIconDiv>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "")}
          to="/weeklyForecast"
        >
          <SideHeaderIcon width="80%" src={"assets/calendarIcon.png"} />
        </NavLink>
      </SideHeaderIconDiv>
      <Switch onClick={themeContext.changeTheme} />
    </SideHeaderDiv>
  );
};
