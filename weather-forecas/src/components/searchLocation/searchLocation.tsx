import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "usehooks-ts";

import {
  CityInterface,
  fetchSearchLocation,
  optionCitySearch,
  setSearchLocation,
  setSelectedCity,
} from "../../redux/reducers/APIreducer";
import { AppDispatch, StoreType } from "../../redux/store";

import { Clock } from "./clock";

export const SearchLocation = () => {
  const searchState: string = useSelector(
    (state: StoreType) => state.daysForecastReducer.search
  );
  const cityOptions = useSelector(
    (state: StoreType) => state.daysForecastReducer.citiesOptions
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
  useEffect(() => {
    if (searchStateDebaunse) {
      dispatch(fetchSearchLocation(searchStateDebaunse));
    }
  }, [searchStateDebaunse]);

  const handleInputChangeClick = (event: any) => {
    const dataset = event.target.dataset;

    for (const city of cityOptions) {
      if (city.name === dataset.name && city.country === dataset.country) {
        dispatch(setSelectedCity(city));
        break;
      }
    }
  };
  return (
    <div>
      <p>
        {selectedCity.name}, {selectedCity.country}
      </p>
      <Clock />

      <input type="text" onChange={handleInputChange} />
      <div>
        <div className="modal_header"></div>
        <div className="modal_content"></div>
      </div>
      {cityOptions.map((item: any) => (
        <button
          data-name={item.name}
          data-country={item.country}
          onClick={handleInputChangeClick}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
