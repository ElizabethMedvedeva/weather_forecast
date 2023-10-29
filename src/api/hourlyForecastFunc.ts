import moment from "moment";
import {
  HourInterface,
  HourlyForecastArray,
} from "../redux/reducers/reducerTypes";

export const FillHourlyForecast = (serverResponse: any, timezone: string) => {
  const hourlyForecast: HourlyForecastArray = [];
  const hourly = serverResponse.hourly;
  for (let i = 0; i < hourly.time.length; i++) {
    const date = moment.tz(serverResponse.hourly.time[i], timezone);
    const hourForecast: HourInterface = {
      date: date.toString(),
      time: date.format("HH:mm"),
      windDirection: serverResponse.hourly.winddirection_10m[i],
      windGusts: serverResponse.hourly.windgusts_10m[i],
      temperature: serverResponse.hourly.temperature_2m[i],
      weathercode: serverResponse.hourly.weathercode[i],
    };

    hourlyForecast.push(hourForecast);
  }
  return hourlyForecast;
};
