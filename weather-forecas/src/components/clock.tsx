import { useSelector } from "react-redux";
import moment from "moment-timezone";

import { StoreType } from "../redux/store";

export const Clock = () => {
  const timeZone = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity.timezone,
  );
  const currentTime = new Date();

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
    <div>
      <p> {convertedTime}</p>
      <p>
        {weekDay[convertedWeekDay]}, {convertedDate} {months[convertedMonth]}{" "}
      </p>
    </div>
  );
};
