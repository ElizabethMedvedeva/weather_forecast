import { useEffect, useState } from "react";
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
import { CityNameDiv, OptionCitiesButton, OptionCitiesDiv, SearchLocationContainer, SearchLocationInput } from "./searchLocation.Styled";
import { getImageByWeathercode } from "../utility/weatherImages";

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
  const currentWeather = useSelector((state: StoreType) => state.daysForecastReducer.currentWeather)

  const [showOption, setShowOption] = useState<boolean>(true);

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
    setShowOption(false);
    for (const city of cityOptions) {
      if (city.name === dataset.name && city.country === dataset.country) {
        dispatch(setSelectedCity(city));
        break;
      }
    }
  };
  return (
    <SearchLocationContainer>
      <SearchLocationInput placeholder="Search city" type="text" onChange={handleInputChange} />
      {showOption ? <OptionCitiesDiv>
        {cityOptions.map((item: any) => (
          <OptionCitiesButton
            data-name={item.name}
            data-country={item.country}
            onClick={handleInputChangeClick}
          >
            {item.name} / {item.country}
          </OptionCitiesButton>
        ))}
      </OptionCitiesDiv> : <></>}

      <CityNameDiv>
        <h3>
          {selectedCity.name}, {selectedCity.country}
        </h3>
      </CityNameDiv>
      <Clock />
      <img
        src={getImageByWeathercode(currentWeather)}
        alt="weathercode_img"></img>
    </SearchLocationContainer>
  );
};
