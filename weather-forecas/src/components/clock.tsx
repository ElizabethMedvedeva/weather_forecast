import { useSelector } from "react-redux";
import { StoreType } from "../redux/store";

export const Clock = () => {
  const selectedCity = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity.timezone
  );

  const currentTime = new Date();

  return (
    <div>
      <p>time : {currentTime.toString()}</p>
      <p>timeZone : {selectedCity.toString()}</p>
    </div>
  );
};
