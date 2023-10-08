import { useSelector } from "react-redux";
import { StoreType } from "../redux/store";
import moment from "moment-timezone";

export const Clock = () => {
  const timeZone = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity.timezone
  );
  const currentTime = new Date();

  const convertedTime = moment().tz(timeZone).format("HH:mm");
  return (
    <div>
      <p>time : {currentTime.toString()}</p>
      <p>timeZone : {timeZone.toString()}</p>
      <p>converted Time: {convertedTime}</p>
    </div>
  );
};
