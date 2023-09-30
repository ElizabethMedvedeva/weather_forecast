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

export interface ITodayHighlight {
  sunrise?: Date;
  sunset?: Date;
  sunsetTime?: string;
  sunriseTime?: string;
  uvIndex?: number;
  humidity?: number;
  pressure?: number;
  windSpeed?: number;
  temperature?: number;
}
const fillHightlightsData = (serverResponse: any) => {
  const formatHours = (hours: number) => {
    if (hours > 9) {
      return `${hours}`;
    }
    return `0${hours}`;
  };
  const formatMinutes = (minutes: number) => {
    if (minutes > 9) {
      return `${minutes}`;
    }
    return `0${minutes}`;
  };
  const object: ITodayHighlight = {};
  object.sunrise = new Date(serverResponse.daily.sunrise[0]);
  object.sunset = new Date(serverResponse.daily.sunset[0]);
  object.uvIndex = serverResponse.daily.uv_index_max[0];
  object.sunriseTime = `${formatHours(
    object.sunrise.getHours()
  )}:${formatMinutes(object.sunrise.getMinutes())}`;
  object.sunsetTime = `${formatHours(object.sunset.getHours())}:${formatMinutes(
    object.sunset.getMinutes()
  )}`;
  object.humidity = serverResponse.hourly.relativehumidity_2m[0];
  object.pressure = serverResponse.hourly.surface_pressure[0];
  object.temperature = serverResponse.hourly.temperature_2m[0];
  object.windSpeed = serverResponse.hourly.windspeed_10m[0];
  console.log(object);
  console.log(serverResponse);

  return object;
};

type APIInitialState = {
  dailyForecast: daysForecast;
  todaysHightLights: ITodayHighlight;
};

const initialState: APIInitialState = {
  dailyForecast: [],
  todaysHightLights: {},
};

export const APISlice = createSlice({
  name: "apis",
  initialState,
  reducers: {
    setDailyForecast: (state, action: PayloadAction<any>) => {
      state.dailyForecast = ToWeatherModel(action.payload);
    },
    setTodaysHightLights: (state, action: PayloadAction<any>) => {
      state.todaysHightLights = fillHightlightsData(action.payload);
    },
  },
});

export const { setDailyForecast, setTodaysHightLights } = APISlice.actions;

export const daysForecastReducer = APISlice.reducer;
