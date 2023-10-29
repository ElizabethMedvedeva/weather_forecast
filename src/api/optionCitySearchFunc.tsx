import { OptionCities } from "../redux/reducers/reducerTypes";

export const optionCitySearch = (serverResponse: any): OptionCities => {
  if (!serverResponse || !serverResponse.results) {
    return [];
  }
  const optionCitySearch = [];
  const optionCity = serverResponse.results;
  const iterationCount = Math.min(3, optionCity.length);
  for (let i = 0; i < iterationCount; i++) {
    const allCityOptions = {
      name: optionCity[i].name,
      country: optionCity[i].country,
      latitude: optionCity[i].latitude,
      longitude: optionCity[i].longitude,
      timezone: optionCity[i].timezone,
      id: optionCity[i].id,
    };
    optionCitySearch.push(allCityOptions);
  }
  return optionCitySearch;
};
