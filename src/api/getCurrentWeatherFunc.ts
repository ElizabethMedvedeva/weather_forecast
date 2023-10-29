import moment from "moment";

import { HourlyForecastArray } from "../redux/reducers/reducerTypes";

export const getCurrentWeather = (
  unsortedHourlyForecast: HourlyForecastArray,
  timezone: string,
) => {
  const currentCityTime = moment().tz(timezone);

  const hourlyForecast = unsortedHourlyForecast.slice();

  for (let i = 0; i < hourlyForecast.length; i++) {
    const forecastTime = moment(hourlyForecast[i].date);
    if (forecastTime.hour() === currentCityTime.hour()) {
      return hourlyForecast[i].weathercode;
    }
  }
  throw new Error("Unexpected time");
};
