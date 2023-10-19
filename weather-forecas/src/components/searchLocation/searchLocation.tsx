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
import {
  CityNameDiv,
  CurrentWeatherIcon,
  OptionCitiesButton,
  OptionCitiesDiv,
  SearchLocationContainer,
  SearchLocationInput,
} from "./searchLocation.Styled";
import { getImageByWeathercode } from "../utility/weatherImages";

const delay = 700;

export const SearchLocation = () => {
  const searchState: string = useSelector(
    (state: StoreType) => state.daysForecastReducer.search
  );
  const cityOptions = useSelector(
    (state: StoreType) => state.daysForecastReducer.citiesOptions
  );
  const searchStateDebaunse = useDebounce<string>(searchState, delay);
  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity
  );
  const currentWeather = useSelector(
    (state: StoreType) => state.daysForecastReducer.currentWeather
  );

  const [showOption, setShowOption] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (event: any) => {
    dispatch(setSearchLocation(event.target.value));
    setTimeout(() => {
      if (event.target.value) {
        setShowOption(true);
      } else {
        setShowOption(false);
      }
    }, delay);
  };
  const { loading, error } = useSelector(
    (state: StoreType) => state.daysForecastReducer
  );

  useEffect(() => {
    if (searchStateDebaunse) {
      // вернуть searchStateDebaunse.length > 1
      dispatch(fetchSearchLocation(searchStateDebaunse));
    }
  }, [searchStateDebaunse]);

  const handleInputChangeClick = (event: any) => {
    const dataset = event.target.dataset;
    for (const city of cityOptions) {
      if (city.id === Number(dataset.id)) {
        dispatch(setSelectedCity(city));
        dispatch(setSearchLocation(""));
        break;
      }
    }

    setShowOption(false);
  };
  return (
    <SearchLocationContainer>
      <SearchLocationInput
        placeholder="Search city"
        type="text"
        onChange={handleInputChange}
      />
      {showOption ? (
        <OptionCitiesDiv>
          {cityOptions.map((item: any) => (
            <OptionCitiesButton
              key={item.id}
              data-id={item.id}
              onClick={handleInputChangeClick}
            >
              {item.name} / {item.country}
            </OptionCitiesButton>
          ))}
        </OptionCitiesDiv>
      ) : (
        <></>
      )}

      <CityNameDiv>
        <h3>
          {selectedCity.name}, {selectedCity.country}
        </h3>
      </CityNameDiv>
      <Clock />
      <CurrentWeatherIcon
        src={getImageByWeathercode(currentWeather)}
        alt="weathercode_img"
      ></CurrentWeatherIcon>
    </SearchLocationContainer>
  );
};
