import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "usehooks-ts";

import {
  CityInterface,
  fetchSearchLocation,
  setSearchLocation,
} from "../../redux/reducers/APIreducer";
import { AppDispatch, StoreType } from "../../redux/store";

import { Clock } from "./clock";

export const SearchLocation = () => {
  const searchState: string = useSelector(
    (state: StoreType) => state.daysForecastReducer.search,
  );
  const cityOptions = useSelector((state: StoreType) => state.daysForecastReducer.citiesOptions)
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
      
      <form>
      <select onChange={handleInputChange}>
            <option value="grapefruit">Грейпфрут</option>
            <option value="lime">Лайм</option>
            <option value="coconut">Кокос</option>
            <option value="mango">Манго</option>
          </select>
      <input type="text" onChange={handleInputChange} />
      <div>
        <div className="modal_header"></div>
        <div className="modal_content"></div>
      </div>
      {cityOptions.map((item: any) => (
        <button>{JSON.stringify(item)}</button>
        )
        
        )}
      </form>
    </div>
  );
};
