import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useDebounce } from "usehooks-ts";

import {
  fetchSearchLocation,
  setSelectedCity,
} from "../../redux/reducers/APIreducer";
import { CityInterface } from "../../redux/reducers/reducerTypes";
import { AppDispatch, StoreType } from "../../redux/store";
import { IThemeContext } from "../../theme/theme";
import { useThemeContext } from "../../theme/themeContext";
import { getItem, setItem } from "../utility/storeLS/storeLS";
import { getImageByWeathercode } from "../utility/weathercode/weatherImages";

import { Clock } from "./clock";
import { OptionCitiesButton } from "./optionCity";
import {
  CityNameDiv,
  CurrentWeatherIcon,
  LoadingSearchDiv,
  OptionCitiesDiv,
  SearchLocationContainer,
  SearchLocationInput,
} from "./searchLocation.Styled";

interface IFavoriteCities {
  [id: number]: CityInterface;
}
export const SearchLocation = () => {
  const delay = 700;
  const themeContextData: IThemeContext = useThemeContext();

  const [search, setSearch] = useState<string>("");
  const cityOptions = useSelector(
    (state: StoreType) => state.daysForecastReducer.citiesOptions,
  );
  const searchStateDebounce = useDebounce<string>(search, delay);
  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity,
  );
  const currentWeather = useSelector(
    (state: StoreType) => state.daysForecastReducer.currentWeather,
  );

  const [showOption, setShowOption] = useState<boolean>(false);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const [favoriteCities, setFavoriteCities] = useState<IFavoriteCities>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    (state: StoreType) => state.daysForecastReducer,
  );
  const dispatch = useDispatch<AppDispatch>();

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

  useEffect(() => {
    if (searchStateDebounce.length > 1) {
      setShowFavorites(false);
      dispatch(fetchSearchLocation(searchStateDebounce));
    }
  }, [searchStateDebounce]);

  const searchInput = useRef<HTMLInputElement | null>(null);

  const chooseCity = (city: CityInterface) => {
    dispatch(setSelectedCity(city));
    setSearch("");
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter" && cityOptions.length !== 0) {
      chooseCity(cityOptions[0]);
      searchInput.current?.blur();
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => setShowOption(false), 100);
  };
  const handleInputChangeClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const dataset = target.dataset;
    for (const city of [...cityOptions, ...Object.values(favoriteCities)]) {
      if (city.id === Number(dataset.id)) {
        chooseCity(city);
        break;
      }
    }
  };

  const AddToFavorite = (event: React.MouseEvent<HTMLElement>) => {
    const independentFavoriteCities = { ...favoriteCities };
    const target = event.target as HTMLElement;
    const dataset = target.dataset;
    for (const city of [
      ...cityOptions,
      ...Object.values(independentFavoriteCities),
    ]) {
      if (city.id === Number(dataset.id)) {
        if (city.id in independentFavoriteCities) {
          delete independentFavoriteCities[city.id];
        } else {
          independentFavoriteCities[city.id] = city;
        }
        setFavoriteCities(independentFavoriteCities);
        break;
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (searchInput.current?.value) {
      setShowFavorites(false);
    } else {
      setShowFavorites(true);
    }
    setShowOption(true);
  };

  return (
    <SearchLocationContainer
      themestyles={themeContextData.stylesForTheme}
      themetype={themeContextData.currentTheme}
    >
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <SearchLocationInput
            themestyles={themeContextData.stylesForTheme}
            themetype={themeContextData.currentTheme}
            value={search}
            ref={searchInput}
            placeholder="Search city"
            type="text"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleSearchKeyDown}
            onBlur={handleInputBlur}
          />
          <LoadingSearchDiv>
            {loadingSearch && <CircularProgress size={"17px"} />}
          </LoadingSearchDiv>
          {showOption ? (
            <OptionCitiesDiv
              themestyles={themeContextData.stylesForTheme}
              themetype={themeContextData.currentTheme}
            >
              {showFavorites && cityOptions.length === 0 ? (
                Object.values(favoriteCities)
                  .slice(0, 2)
                  .map((city: CityInterface) => (
                    // eslint-disable-next-line react/jsx-key
                    <OptionCitiesButton
                      city={city}
                      themeContext={themeContextData}
                      cityInputHandler={handleInputChangeClick}
                      favoriteInputHandler={AddToFavorite}
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
                    cityInputHandler={handleInputChangeClick}
                    favoriteInputHandler={AddToFavorite}
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
              themestyles={themeContextData.stylesForTheme}
              themetype={themeContextData.currentTheme}
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
