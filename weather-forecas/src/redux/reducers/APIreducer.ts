import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

import {
  axiosApiInstanceGeo,
  axiosApiInstanceMeteo,
} from "../../api/axiosConfig";

interface IWeatherDay {
  date: Date;
  temperatureMax: number;
  temperatureMin: number;
  uvIndexMax: number;
  weathercode: number;
}

export type daysForecastType = Array<IWeatherDay>;

const ToWeatherModel = (APIobj: any) => {
  const weatherModel: daysForecastType = [];
  const daily = APIobj.daily;

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

export interface ITodayHighlight {
  sunrise: string;
  sunset: string;
  sunsetTime: string;
  sunriseTime: string;
  uvIndex: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  temperature: number;
}

export const fillHightlightsData = (serverResponse: any, timezone: string) => {
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
    temperature: serverResponse.current_weather.temperature,
    windSpeed: serverResponse.current_weather.windspeed,
  };

  return object;
};

export interface HourInterface {
  temperature: number;
  windDirection: number;
  windGusts: number;
  weathercode: number;
  time: string;
  date: any;
}

export type HourlyForecastArray = Array<HourInterface>;

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
    const checkingTime = moment(hourForecast.date);
    if (checkingTime.tz(timezone).hour() % 3 === 0) {
      hourlyForecast.push(hourForecast);
    }
  }
  return hourlyForecast;
};
const getFiveRelevant = (
  unsortedHourlyForecast: HourlyForecastArray,
  timezone: string,
) => {
  const hourlyForecast = unsortedHourlyForecast.slice();
  const currentCityTime = moment().tz(timezone);

  for (let i = 0; i < hourlyForecast.length; i++) {
    const forecastTime = moment(hourlyForecast[i].date);
    if (forecastTime >= currentCityTime) {
      i -= 1;
      if (hourlyForecast.length - i < 5) {
        i = hourlyForecast.length - 5;
      }
      return hourlyForecast.slice(i, i + 5);
    }
  }

  return hourlyForecast.slice(hourlyForecast.length - 5);
};

export interface CityInterface {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
}
export const fillSelectedCity = (serverResponse: any) => {
  const firstCity = serverResponse.results[0];
  const selectedCity: CityInterface = {
    name: firstCity.name,
    country: firstCity.country,
    latitude: firstCity.latitude,
    longitude: firstCity.longitude,
    timezone: firstCity.timezone,
  };
  return selectedCity;
};

type APIInitialState = {
  dailyForecast: daysForecastType;
  todaysHightLights: ITodayHighlight | null;
  hourlyForecast: HourlyForecastArray;
  fiveRelevantHours: HourlyForecastArray;
  loading: boolean;
  error: any; // TODO vernemsya
  search: string;
  selectedCity: CityInterface;
};

const initialState: APIInitialState = {
  dailyForecast: [],
  todaysHightLights: null,
  hourlyForecast: [],
  fiveRelevantHours: [],
  loading: false,
  error: null,
  search: "",
  selectedCity: {
    timezone: "Europe/Vilnius",
    name: "Vilnius",
    country: "Lithuania",
    longitude: 25.2798,
    latitude: 54.6892,
  },
};
interface IForecastParams {
  latitude: number;
  longitude: number;
  timezone: string;
}
export const fetchDailyForecast = createAsyncThunk(
  "forecastData",
  async (forecastParams: IForecastParams, { rejectWithValue }) => {
    return fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${forecastParams.latitude}&longitude=${forecastParams.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max&current_weather=true&timezone=${forecastParams.timezone}`,
    )
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => rejectWithValue(error.message));
  },
);

export const fetchHourlyForecast = createAsyncThunk(
  "hourlyForecastData",
  async (forecastParams: IForecastParams, { rejectWithValue }) => {
    try {
      const result = await axiosApiInstanceMeteo.get(
        `/v1/forecast?latitude=${forecastParams.latitude}&longitude=${forecastParams.longitude}&hourly=weathercode,temperature_2m,winddirection_10m,windgusts_10m&daily=weathercode&current_weather=true&timezone=${forecastParams.timezone}&forecast_days=1`,
      );
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchTodaysHightlights = createAsyncThunk(
  "todaysHightlights",
  async (forecastParams: IForecastParams, { rejectWithValue }) => {
    try {
      const result = await axiosApiInstanceMeteo.get(
        `/v1/forecast?latitude=${forecastParams.latitude}&longitude=${forecastParams.longitude}&hourly=temperature_2m,relativehumidity_2m,surface_pressure,windspeed_10m&daily=sunrise,sunset,uv_index_max&current_weather=true&timezone=${forecastParams.timezone}&forecast_days=1`,
      );
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSearchLocation = createAsyncThunk(
  "searchLocationData",

  async (searchState: string, { rejectWithValue }) => {
    try {
      const result = await axiosApiInstanceGeo.get(
        `/v1/search?name=${searchState}`,
      );
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const APISlice = createSlice({
  name: "apis",
  initialState,
  reducers: {
    setDailyForecast: (state, action: PayloadAction<daysForecastType>) => {
      state.dailyForecast = action.payload;
    },

    setTodaysHightLights: (state, action: PayloadAction<ITodayHighlight>) => {
      state.todaysHightLights = action.payload;
    },
    setFiveRelevantHours: (
      state,
      action: PayloadAction<HourlyForecastArray>,
    ) => {
      state.fiveRelevantHours = action.payload;
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
        state.dailyForecast = ToWeatherModel(action.payload);

        state.loading = false;
      })
      .addCase(fetchDailyForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchHourlyForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
        state.hourlyForecast = FillHourlyForecast(
          action.payload,
          state.selectedCity.timezone,
        );
        state.fiveRelevantHours = getFiveRelevant(
          state.hourlyForecast,
          state.selectedCity.timezone,
        );
        state.loading = false;
      })
      .addCase(fetchHourlyForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTodaysHightlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodaysHightlights.fulfilled, (state, action) => {
        state.todaysHightLights = fillHightlightsData(
          action.payload,
          state.selectedCity.timezone,
        );
        state.loading = false;
      })
      .addCase(fetchTodaysHightlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSearchLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchLocation.fulfilled, (state, action) => {
        state.selectedCity = fillSelectedCity(action.payload);
        state.loading = false;
      })
      .addCase(fetchSearchLocation.rejected, (state, action) => {
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
