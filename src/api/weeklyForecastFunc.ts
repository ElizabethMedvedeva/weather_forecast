import { daysForecastType, IWeatherDay } from "../redux/reducers/reducerTypes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FillWeeklyForecast = (serverResponse: any) => {
  const weatherModel: daysForecastType = [];
  const daily = serverResponse.daily;

  for (let i = 0; i < daily.time.length; i++) {
    const day: IWeatherDay = {
      date: new Date(daily.time[i]),
      temperatureMax: daily.temperature_2m_max[i],
      temperatureMin: daily.temperature_2m_min[i],
      uvIndexMax: daily.uv_index_max[i],
      weathercode: daily.weathercode[i],
    };
    weatherModel.push(day);
  }
  return weatherModel;
};
