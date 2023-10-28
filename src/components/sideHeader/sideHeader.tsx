import { NavLink } from "react-router-dom";

import {
  SideHeaderDiv,
  SideHeaderIcon,
  SideHeaderIconDiv,
} from "./sideHeaderStyled";

import { useThemeContext } from "../../theme/themeContext";
import Switch from "@mui/material/Switch";

export const SideHeader = () => {
  const themeContext: any = useThemeContext();

  return (
    <SideHeaderDiv>
      <SideHeaderIconDiv>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "")}
          to="/"
        >
          <img src={"assets/weatherIcon.png"}></img>
        </NavLink>
      </SideHeaderIconDiv>
      <SideHeaderIconDiv>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "")}
          to="/weeeklyForecast"
        >
          <SideHeaderIcon src={"assets/calendarIcon.png"} />
        </NavLink>
      </SideHeaderIconDiv>
      <Switch onClick={themeContext.changeTheme} />
    </SideHeaderDiv>
  );
};
