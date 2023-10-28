import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "usehooks-ts";

import {
  CityInterface,
  fetchSearchLocation,
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

interface IFavoriteCities {
  [id: number]: CityInterface;
}
export const SearchLocation = () => {
  const delay = 700;
  const themeContextData: IThemeContext = useThemeContext();

  const [search, setSearch] = useState<string>("");
  const cityOptions = useSelector(
    (state: StoreType) => state.daysForecastReducer.citiesOptions
  );
  const searchStateDebaunse = useDebounce<string>(search, delay);
  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity
  );
  const currentWeather = useSelector(
    (state: StoreType) => state.daysForecastReducer.currentWeather
  );

  const [showOption, setShowOption] = useState<boolean>(true);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const [favoriteCities, setFavoriteCities] = useState<IFavoriteCities>({});

  useEffect(() => {
    let favoriteCitiesLS = getItem("favoriteCities");
    if (favoriteCitiesLS === null) {
      favoriteCitiesLS = {};
    }
    setFavoriteCities(favoriteCitiesLS);
  }, []);

  useEffect(() => {
    setItem("favoriteCities", favoriteCities);
  }, [favoriteCities]);

  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (event: any) => {
    setSearch(event.target.value);
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
      setShowFavorites(false);
      dispatch(fetchSearchLocation(searchStateDebaunse));
    }
  }, [searchStateDebaunse]);

  const handleInputChangeClick = (event: any) => {
    const dataset = event.target.dataset;
    console.log("Process click");
    for (const city of [...cityOptions, ...Object.values(favoriteCities)]) {
      if (city.id === Number(dataset.id)) {
        dispatch(setSelectedCity(city));
        setSearch("");
        break;
      }
    }

    setShowOption(false);
  };
  const AddToFavorite = (event: any) => {
    const independFavoriteCities = { ...favoriteCities };
    const dataset = event.target.dataset;
    for (const city of [
      ...cityOptions,
      ...Object.values(independFavoriteCities),
    ]) {
      if (city.id === Number(dataset.id)) {
        if (city.id in independFavoriteCities) {
          delete independFavoriteCities[city.id];
        } else {
          independFavoriteCities[city.id] = city;
        }
        setFavoriteCities(independFavoriteCities);
        break;
      }
    }
  };

  const showFavoritesFunc = (event: any) => {
    console.log("in focus");
    if (event.target.value) {
      setShowFavorites(false);
    } else {
      setShowFavorites(true);
    }
  };

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
            value={search}
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
              {showFavorites && cityOptions.length === 0 ? (
                Object.values(favoriteCities)
                  .slice(0, 2)
                  .map((city: CityInterface) => (
                    <OptionCitiesButton
                      city={city}
                      themeContext={themeContextData}
                      cityInputHanlder={handleInputChangeClick}
                      favoriteInputHanlder={AddToFavorite}
                      marked={city.id in favoriteCities}
                    />
                  ))
              ) : (
                <></>
              )}
              {cityOptions.map((city: CityInterface) => (
                <>
                  <OptionCitiesButton
                    city={city}
                    themeContext={themeContextData}
                    cityInputHanlder={handleInputChangeClick}
                    favoriteInputHanlder={AddToFavorite}
                    marked={city.id in favoriteCities}
                  />
                </>
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
              <h3>{selectedCity.name},</h3>
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
