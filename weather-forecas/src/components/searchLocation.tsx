import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CityInterface,
  fillSelectedCity,
  setSearchLocation,
  setSelectedCity,
} from "../redux/reducers/APIreducer";
import { useDebounce } from "usehooks-ts";
import { StoreType } from "../redux/store";

export const SearchLocation = () => {
  const searchState: string = useSelector(
    (state: StoreType) => state.daysForecastReducer.search
  );
  const searchStateDebaunse = useDebounce<string>(searchState, 700);
  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity
  );
  const dispatch = useDispatch();

  const handleInputChange = (event: any) => {
    dispatch(setSearchLocation(event.target.value));
  };

  useEffect(() => {
    if (searchStateDebaunse) {
      fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchStateDebaunse}`
      )
        .then((response) => response.json())
        .then((json) => dispatch(setSelectedCity(fillSelectedCity(json))))

        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [searchStateDebaunse]);

  return (
    <div>
      <p>{selectedCity.name}</p>
      <input type="text" onChange={handleInputChange} />
    </div>
  );
};
