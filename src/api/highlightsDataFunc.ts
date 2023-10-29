import moment from "moment";

import { ITodayHighlight } from "../redux/reducers/reducerTypes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fillHighlightsData = (serverResponse: any, timezone: string) => {
  const currentCityTime = moment().tz(timezone);
  let timeIndex = serverResponse.hourly.time.length;
  for (let i = 0; i < serverResponse.hourly.time.length; i++) {
    const time = moment.tz(serverResponse.hourly.time[i], timezone);
    if (time >= currentCityTime) {
      timeIndex = i;
      break;
    }
  }
  const object: ITodayHighlight = {
    sunrise: moment(serverResponse.daily.sunrise[0]).toString(),
    sunset: moment(serverResponse.daily.sunset[0]).toString(),
    uvIndex: serverResponse.daily.uv_index_max[0],
    sunriseTime: moment(serverResponse.daily.sunrise[0]).format("HH:mm"),
    sunsetTime: moment(serverResponse.daily.sunset[0]).format("HH:mm"),
    humidity: serverResponse.hourly.relativehumidity_2m[timeIndex],
    pressure: serverResponse.hourly.surface_pressure[timeIndex],
    temperature: Math.round(serverResponse.current_weather.temperature),
    windSpeed: serverResponse.current_weather.windspeed,
  };

  return object;
};
