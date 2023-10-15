import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "usehooks-ts";

import {
  CityInterface,
  fetchSearchLocation,
  fillSelectedCity,
  setSearchLocation,
  setSelectedCity,
} from "../redux/reducers/APIreducer";
import { AppDispatch, StoreType } from "../redux/store";

import { Clock } from "./clock";

export const SearchLocation = () => {
  const searchState: string = useSelector(
    (state: StoreType) => state.daysForecastReducer.search,
  );
  const searchStateDebaunse = useDebounce<string>(searchState, 700);
  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (event: any) => {
    dispatch(setSearchLocation(event.target.value));
  };
  const { loading, error } = useSelector(
    (state: StoreType) => state.daysForecastReducer,
  );
  useEffect(() => {
    if (searchStateDebaunse) {
      dispatch(fetchSearchLocation(searchStateDebaunse));
    }
  }, [searchStateDebaunse]);

  return (
    <div>
      <p>
        {selectedCity.name}, {selectedCity.country}
      </p>

      <Clock />
      <input type="text" onChange={handleInputChange} />
    </div>
  );
};
