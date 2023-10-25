import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "usehooks-ts";

import {
  CityInterface,
  fetchSearchLocation,
  setSearchLocation,
  setSelectedCity,
} from "../../redux/reducers/APIreducer";
import { AppDispatch, StoreType } from "../../redux/store";

import { Clock } from "./clock";
import {
  CityNameDiv,
  CurrentWeatherIcon,
  LoadingSearchDiv,

  OptionCitiesDiv,
  SearchLocationContainer,
  SearchLocationInput,
} from "./searchLocation.Styled";
import { getImageByWeathercode } from "../utility/weathercode/weatherImages";
import { CircularProgress } from "@mui/material";
import { useThemeContext } from "../../theme/themeContext";
import { IThemeContext } from "../../theme/theme";
import { getItem, setItem } from "../utility/storeLS/storeLS";
import { OptionCitiesButton } from "./optionCity";

const delay = 700;

export const SearchLocation = () => {
  const themeContextData: IThemeContext = useThemeContext();

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
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
console.log(">>>", showFavorites)

  let favoriteCities = getItem("favoriteCities")
  if (favoriteCities === null) {
    favoriteCities = {};
  }

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
  const { loadingSearch, error } = useSelector(
    (state: StoreType) => state.daysForecastReducer
  );

  useEffect(() => {
    if (searchStateDebaunse.length > 1) {
      setShowFavorites(false)
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
  const handlerAddToLS = (event: any) => {
    const dataset = event.target.dataset;
    for (const city of cityOptions) {
      if (city.id === Number(dataset.id)) {
        let favoriteCities = getItem("favoriteCities")
        if (favoriteCities === null) {
          favoriteCities = {};
        }
        if (city.id in favoriteCities) {
          delete favoriteCities[city.id];
        } else { favoriteCities[city.id] = city; }
        setItem("favoriteCities", favoriteCities);
        break;
      }
    }
  }
  const showFavoritesFunc = (event: any) => {

    if (event.target.value) {
      setShowFavorites(false)
    }
    else {
      setShowFavorites(true)
    }

  }

  return (
    <SearchLocationContainer
      themeStyles={themeContextData.stylesForTheme}
      themeType={themeContextData.currentTheme}
    >
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <SearchLocationInput
            themeStyles={themeContextData.stylesForTheme}
            themeType={themeContextData.currentTheme}
            value={searchState}
            placeholder="Search city"
            type="text"
            onChange={handleInputChange}
            onFocus={showFavoritesFunc}
          
          />
          <LoadingSearchDiv>
            {loadingSearch && <CircularProgress size={"17px"} />}
          </LoadingSearchDiv>

          {showOption ? (
            <OptionCitiesDiv
              themeStyles={themeContextData.stylesForTheme}
              themeType={themeContextData.currentTheme}
            >
              {showFavorites ? (
                Object.values(favoriteCities).map(
                  (item: any) => (
                    <OptionCitiesButton
                      city={item}
                      themeContext={themeContextData}
                      // OTHER CLICK HANDLER NOT CITIES
                      cityInputHanlder={handleInputChangeClick}
                      favoriteInputHanlder={handlerAddToLS}
                    />
                  )
                )
              ) : <></>}
              {cityOptions.map((item: CityInterface) => (
                <OptionCitiesButton
                  city={item}
                  themeContext={themeContextData}
                  cityInputHanlder={handleInputChangeClick}
                  favoriteInputHanlder={handlerAddToLS}
                />
              ))}
            </OptionCitiesDiv>
          ) : (
            <></>
          )}
          <>
            <CityNameDiv
              themeStyles={themeContextData.stylesForTheme}
              themeType={themeContextData.currentTheme}
            >
              <h3>
                {selectedCity.name},
              </h3>
              <h3>{selectedCity.country}</h3>
            </CityNameDiv>
          </>
          <Clock />
          <CurrentWeatherIcon
            src={getImageByWeathercode(currentWeather)}
            alt="weathercode_img"
          />
        </>
      )}
    </SearchLocationContainer>
  );
};
