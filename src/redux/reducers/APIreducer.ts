import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  axiosApiInstanceGeo,
  axiosApiInstanceMeteo,
} from "../../api/axiosConfig";
import { getCurrentWeather } from "../../api/getCurrentWeatherFunc";
import { getFiveRelevant } from "../../api/getFiveRelevantFunc";
import { fillHighlightsData } from "../../api/highlightsDataFunc";
import { FillHourlyForecast } from "../../api/hourlyForecastFunc";
import { optionCitySearch } from "../../api/optionCitySearchFunc";
import { FillWeeklyForecast } from "../../api/weeklyForecastFunc";

import {
  APIInitialState,
  CityInterface,
  daysForecastType,
  HourlyForecastArray,
  IForecastParams,
  ITodayHighlight,
  OptionCities,
} from "./reducerTypes";

const initialState: APIInitialState = {
  weeklyForecast: [],
  todaysHighlights: null,
  hourlyForecast: [],
  fiveRelevantHours: [],
  loading: false,
  loadingSearch: false,
  error: null,
  search: "",
  selectedCity: {
    timezone: "Europe/Vilnius",
    name: "Vilnius",
    country: "Lithuania",
    longitude: 25.2798,
    latitude: 54.6892,
    id: 593116,
  },
  citiesOptions: [],
  currentWeather: 0,
};

export const fetchWeeklyForecast = createAsyncThunk(
  "weeklyForecastData",

  async (forecastParams: IForecastParams, { rejectWithValue }) => {
    try {
      const result = await axiosApiInstanceMeteo.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${forecastParams.latitude}&longitude=${forecastParams.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max&current_weather=true&timezone=${forecastParams.timezone}&forecast_days=14`,
      );
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
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

export const fetchTodaysHighlights = createAsyncThunk(
  "todaysHighlights",
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
    setWeeklyForecast: (state, action: PayloadAction<daysForecastType>) => {
      state.weeklyForecast = action.payload;
    },
    setTodaysHighlights: (state, action: PayloadAction<ITodayHighlight>) => {
      state.todaysHighlights = action.payload;
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
    setSelectedCity: (state, action: PayloadAction<CityInterface>) => {
      state.selectedCity = action.payload;
    },
    setOptionCitySearch: (state, action: PayloadAction<OptionCities>) => {
      state.citiesOptions = action.payload;
    },
    setCurrentWeather: (state, action: PayloadAction<number>) => {
      state.currentWeather = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchWeeklyForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeeklyForecast.fulfilled, (state, action) => {
        state.weeklyForecast = FillWeeklyForecast(action.payload);

        state.loading = false;
      })
      .addCase(fetchWeeklyForecast.rejected, (state, action) => {
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
        state.currentWeather = getCurrentWeather(
          state.hourlyForecast,
          state.selectedCity.timezone,
        );
        state.loading = false;
      })
      .addCase(fetchHourlyForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTodaysHighlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodaysHighlights.fulfilled, (state, action) => {
        state.todaysHighlights = fillHighlightsData(
          action.payload,
          state.selectedCity.timezone,
        );
        state.loading = false;
      })
      .addCase(fetchTodaysHighlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSearchLocation.pending, (state) => {
        state.loadingSearch = true;
        state.error = null;
      })
      .addCase(fetchSearchLocation.fulfilled, (state, action) => {
        state.citiesOptions = optionCitySearch(action.payload);
        state.loadingSearch = false;
      })
      .addCase(fetchSearchLocation.rejected, (state, action) => {
        state.loadingSearch = false;
        state.error = action.payload;
      }),
});

export const {
  setWeeklyForecast,
  setTodaysHighlights,
  setHourlyForecast,
  setSelectedCity,
} = APISlice.actions;

export const daysForecastReducer = APISlice.reducer;
