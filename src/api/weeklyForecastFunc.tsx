import { IWeatherDay, daysForecastType } from "../redux/reducers/reducerTypes";

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
