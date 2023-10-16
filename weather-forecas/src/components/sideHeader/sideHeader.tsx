import { NavLink } from "react-router-dom";
import favoriteIcon from "../../assets/favoriteIcon.png";
import weatherIcon from "../../assets/weatherIcon.png";
import calendarIcon from "../../assets/calendarIcon.png";
import { SideHeaderDiv, SideHeaderIconDiv } from "./sideHeaderStyled";

export const SideHeader = () => {
  return (
    <SideHeaderDiv>
      <SideHeaderIconDiv>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "")}
          to="/forecast"
        >
          <img src={calendarIcon}></img>
        </NavLink>
      </SideHeaderIconDiv>

      <SideHeaderIconDiv>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "")}
          to="/forecast"
        >
          <img src={weatherIcon}></img>
        </NavLink>
      </SideHeaderIconDiv>

      <SideHeaderIconDiv>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "")}
          to="/forecast"
        >
          <img src={favoriteIcon}></img>
        </NavLink>
      </SideHeaderIconDiv>
    </SideHeaderDiv>
  );
};
