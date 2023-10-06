import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fillSelectedCity,
  setSearchLocation,
  setSelectedCity,
} from "../redux/reducers/APIreducer";

export const SearchLocation = () => {
  const searchState: any = useSelector(
    (state: any) => state.daysForecastReducer.search
  );

  const dispatch = useDispatch();

  const handleInputChange = (event: any) => {
    dispatch(setSearchLocation(event.target.value));
  };

  useEffect(() => {
    if (searchState) {
      fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchState}`
      )
        .then((response) => response.json())
        .then((json) => dispatch(setSelectedCity(fillSelectedCity(json))))

        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [searchState]);

  return (
    <div>
      <p>search:{searchState}</p>
      <input type="text" onChange={handleInputChange} />
    </div>
  );
};
