import { useSelector } from "react-redux";
import moment from "moment-timezone";

import { StoreType } from "../../redux/store";
import { ClockContainer } from "./clock.Styled";
import { IThemeContext } from "../../theme/theme";
import { useThemeContext } from "../../theme/themeContext";

export const Clock = () => {
  const timeZone = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity.timezone
  );
  const themeContextData: IThemeContext = useThemeContext();
  const convertedTime = moment().tz(timeZone).format("HH:mm");
  const convertedDate: any = moment().tz(timeZone).format("DD");
  const convertedMonth: any = moment().tz(timeZone).format("MM");
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
  ];

  const convertedWeekDay = moment().tz(timeZone).weekday();

  return (
    <ClockContainer
      themestyles={themeContextData.stylesForTheme}
      themetype={themeContextData.currentTheme}
    >
      <h3> {convertedTime}</h3>
      <h4>
        {weekDay[convertedWeekDay]}, {convertedDate} {months[convertedMonth]}{" "}
      </h4>
    </ClockContainer>
  );
};
