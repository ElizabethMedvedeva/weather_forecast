import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const formatHours = (hours: number) => {
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
export const fillHightlightsData = (serverResponse: any) => {
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
  console.log(serverResponse, "server response");
  const hourlyForecast: HourlyForecastArray = [];
  const hourly = serverResponse.hourly;
  for (let i = 0; i < hourly.time.length; i++) {
    const date = new Date(serverResponse.hourly.time[i]);
    const hourForecast: HourInterface = {
      date: date,
      time: `${formatHours(date.getHours())}:${formatMinutes(
        date.getMinutes()
      )}`,
      windDirection: serverResponse.hourly.winddirection_10m[i],
      windGusts: serverResponse.hourly.windgusts_10m[i],
      temperature: serverResponse.hourly.temperature_2m[i],
      weathercode: serverResponse.hourly.weathercode[i],
    };
    if (hourForecast.date.getHours() % 3 === 0) {
      console.log(hourForecast, "1 hour");
      hourlyForecast.push(hourForecast);
    }
  }
  console.log(hourlyForecast, "data from hourly forecast");
  return hourlyForecast;
};
const getFiveRelevant = (unsortedHourlyForecast: HourlyForecastArray) => {
  const hourlyForecast = unsortedHourlyForecast.slice();
  const currentTime = new Date();

  for (let i = 0; i < hourlyForecast.length; i++) {
    if (currentTime <= hourlyForecast[i].date) {
      i -= 1;
      if (hourlyForecast.length - i < 5) {
        i = hourlyForecast.length - 5;
      }
      return hourlyForecast.slice(i, i + 5);
    }
  }
  return hourlyForecast;
};

export interface CityInterface {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}
export const fillSelectedCity = (serverResponse: any) => {
  const firstCity = serverResponse.results[0];
  const selectedCity: CityInterface = {
    name: firstCity.name,
    latitude: firstCity.latitude,
    longitude: firstCity.longitude,
    timezone: firstCity.timezone,
  };
  return selectedCity;
};

type APIInitialState = {
  dailyForecast: daysForecastType;
  todaysHightLights: ITodayHighlight;
  hourlyForecast: HourlyForecastArray;
  fiveRelevantHours: HourlyForecastArray;
  loading: boolean;
  error: any; // TODO vernemsya
  search: string;
  selectedCity: CityInterface;
};

const initialState: APIInitialState = {
  dailyForecast: [],
  todaysHightLights: {},
  hourlyForecast: [],
  fiveRelevantHours: [],
  loading: false,
  error: null,
  search: "",
  selectedCity: {
    timezone: "Europe/Vilnius",
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
  async (cordinate: Coordinate, { rejectWithValue }) => {
    return fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${cordinate.latitude}&longitude=${cordinate.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max&current_weather=true&timezone=Europe%2FMoscow`
    )
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => rejectWithValue(error.message));
  }
);

export const fetchHourlyForecast = createAsyncThunk(
  "hourlyForecastData",
  async (cordinate: Coordinate, { rejectWithValue }) => {
    return fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${cordinate.latitude}&longitude=${cordinate.longitude}&hourly=weathercode,temperature_2m,winddirection_10m,windgusts_10m&daily=weathercode&current_weather=true&timezone=Europe%2FMoscow&forecast_days=1`
    )
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => rejectWithValue(error.message));
  }
);

export const fetchTodaysHightlights = createAsyncThunk(
  "todaysHightlights",
  async (cordinate: Coordinate, { rejectWithValue }) => {
    return fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${cordinate.latitude}&longitude=${cordinate.longitude}&hourly=temperature_2m,relativehumidity_2m,surface_pressure,windspeed_10m&daily=sunrise,sunset,uv_index_max&current_weather=true&timezone=Europe%2FMoscow&forecast_days=1`
    )
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => rejectWithValue(error.message));
  }
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
      action: PayloadAction<HourlyForecastArray>
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

      //

      .addCase(fetchHourlyForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
        state.hourlyForecast = FillHourlyForecast(action.payload);
        state.fiveRelevantHours = getFiveRelevant(state.hourlyForecast);
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
        state.todaysHightLights = fillHightlightsData(action.payload);
        state.loading = false;
      })
      .addCase(fetchTodaysHightlights.rejected, (state, action) => {
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
