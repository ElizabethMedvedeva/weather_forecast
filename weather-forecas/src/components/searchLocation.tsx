import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CityInterface,
  fetchSearchLocation,
  fillSelectedCity,
  setSearchLocation,
  setSelectedCity,
} from "../redux/reducers/APIreducer";
import { useDebounce } from "usehooks-ts";
import { AppDispatch, StoreType } from "../redux/store";

export const SearchLocation = () => {
  const searchState: string = useSelector(
    (state: StoreType) => state.daysForecastReducer.search
  );
  const searchStateDebaunse = useDebounce<string>(searchState, 700);
  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (event: any) => {
    dispatch(setSearchLocation(event.target.value));
  };
  const { loading, error } = useSelector(
    (state: StoreType) => state.daysForecastReducer
  );
  console.log(searchStateDebaunse, "llll");
  useEffect(() => {
    if (searchStateDebaunse) {
      dispatch(fetchSearchLocation(searchStateDebaunse));
    }
  }, [searchStateDebaunse]);

  return (
    <div>
      <p>{selectedCity.name}</p>
      <input type="text" onChange={handleInputChange} />
    </div>
  );
};
