import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface weatherDay {
  date: Date;
  temperatureMax: number;
  temperatureMin: number;
  uvIndexMax: number;
  weathercode: number;
}

export type daysForecast = Array<weatherDay>;

const ToWeatherModel = (APIobj: any) => {
  const weatherModel: daysForecast = [];
  const daily = APIobj.daily;

  for (let i = 0; i < daily.time.length; i++) {
    const day: weatherDay = {
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

type APIInitialState = {
  dailyForecast: daysForecast;
};

const initialState: APIInitialState = {
  dailyForecast: [],
};

export const APISlice = createSlice({
  name: "apis",
  initialState,
  reducers: {
    setDailyForecast: (state, action: PayloadAction<any>) => {
      state.dailyForecast = ToWeatherModel(action.payload);
    },
  },
});

export const { setDailyForecast } = APISlice.actions;

export const daysForecastReducer = APISlice.reducer;
