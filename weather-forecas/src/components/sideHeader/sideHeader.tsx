import { NavLink } from "react-router-dom";

import {
  SideHeaderDiv,
  SideHeaderIcon,
  SideHeaderIconDiv,
} from "./sideHeaderStyled";

export const SideHeader = () => {
  return (
    <SideHeaderDiv>
      <SideHeaderIconDiv><NavLink
        className={({ isActive }) => (isActive ? "active-link" : "")}
        to="/"
      >
        <img src={"assets/weatherIcon.png"}></img>
      </NavLink>

      </SideHeaderIconDiv>
      <SideHeaderIconDiv>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "")}
          to="/forecast"
        >
          <SideHeaderIcon src={"assets/calendarIcon.png"} />
        </NavLink>
      </SideHeaderIconDiv>

      <SideHeaderIconDiv>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "")}
          to="/forecast"
        >
          <img src={"/assets/favoriteIcon.png"}></img>
        </NavLink>
      </SideHeaderIconDiv>
    </SideHeaderDiv>
  );
};
