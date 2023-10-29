import moment from "moment";
import { HourlyForecastArray } from "../redux/reducers/reducerTypes";

export const getFiveRelevant = (
  unsortedHourlyForecast: HourlyForecastArray,
  timezone: string
) => {
  const hourlyForecast = unsortedHourlyForecast.slice();
  const filteredHourlyForecast = hourlyForecast.filter(
    (item) => moment(item.date).tz(timezone).hour() % 3 === 0
  );
  const currentCityTime = moment().tz(timezone);
  for (let i = 0; i < filteredHourlyForecast.length; i++) {
    const forecastTime = moment(filteredHourlyForecast[i].date);
    if (forecastTime >= currentCityTime) {
      i -= 1;
      if (filteredHourlyForecast.length - i < 5) {
        i = filteredHourlyForecast.length - 5;
      }
      return filteredHourlyForecast.slice(i, i + 5);
    }
  }
  return filteredHourlyForecast.slice(filteredHourlyForecast.length - 5);
};
