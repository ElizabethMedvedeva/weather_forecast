import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

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
const fillHightlightsData = (serverResponse: any) => {
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

  return object;
};
export interface HourInterface {
  temperature: number;
  windDirection: number;
  windGusts: number;
  weathercode: number;
  time: string;
  date: Date;
}

export type HourlyForecastArray = Array<HourInterface>;

export const FillHourlyForecast = (serverResponse: any) => {
  const hourlyForecast: HourlyForecastArray = [];
  const hourly = serverResponse.hourly;
  for (let i = 0; i < hourly.time.length; i++) {
    const date = new Date(serverResponse.hourly.time[i]);
    const hourForecast: HourInterface = {
      date: date,
      time: `${formatHours(date.getHours())}:${formatMinutes(
        date.getMinutes()
      )}`,
      windDirection: serverResponse.hourly.winddirection_10m[0],
      windGusts: serverResponse.hourly.windgusts_10m[0],
      temperature: serverResponse.hourly.temperature_2m[0],
      weathercode: serverResponse.daily.weathercode[0],
    };
    if (hourForecast.date.getHours() % 3 === 0) {
      hourlyForecast.push(hourForecast);
    }
  }
  return hourlyForecast;
};

export interface CityInterface {
  name: string;
  latitude: number;
  longitude: number;
}
export const fillSelectedCity = (serverResponse: any) => {
  const firstCity = serverResponse.results[0];
  const selectedCity: CityInterface = {
    name: firstCity.name,
    latitude: firstCity.latitude,
    longitude: firstCity.longitude,
  };
  return selectedCity;
};

type APIInitialState = {
  dailyForecast: daysForecast;
  todaysHightLights: ITodayHighlight;
  hourlyForecast: HourlyForecastArray;
  loading: boolean;
  error: string | null | unknown;
  search: string;
  selectedCity: CityInterface;
};

const initialState: APIInitialState = {
  dailyForecast: [],
  todaysHightLights: {},
  hourlyForecast: [],
  loading: false,
  error: null,
  search: "",
  selectedCity: {
    name: "Vilnius",
    longitude: 25.2798,
    latitude: 54.6892,
  },
};
interface Coordinate {
  latitude: number;
  longitude: number;
}
export const fetchDailyForecast = createAsyncThunk(
  "forecastData",
  async (cordinate: Coordinate, { dispatch }) => {
    try {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${cordinate.latitude}&longitude=${cordinate.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max&current_weather=true&timezone=Europe%2FMoscow`
      )
        .then((response) => response.json())
        .then((response) => dispatch(setDailyForecast(response)));
    } catch (error) {
      console.log(error);
    }
  }
);

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

    setHourlyForecast: (state, action: PayloadAction<HourlyForecastArray>) => {
      state.hourlyForecast = action.payload;
    },
    setSearchLocation: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSelectedCity: (state, action: PayloadAction<CityInterface>) => {
      state.selectedCity = action.payload;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchDailyForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyForecast.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchDailyForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const {
  setDailyForecast,
  setTodaysHightLights,
  setHourlyForecast,
  setSearchLocation,
  setSelectedCity,
} = APISlice.actions;

export const daysForecastReducer = APISlice.reducer;
