export interface IWeatherDay {
  date: Date;
  temperatureMax: number;
  temperatureMin: number;
  uvIndexMax: number;
  weathercode: number;
}

export type daysForecastType = Array<IWeatherDay>;

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

export interface HourInterface {
  temperature: number;
  windDirection: number;
  windGusts: number;
  weathercode: number;
  time: string;
  date: string;
}

export type HourlyForecastArray = Array<HourInterface>;

export interface CityInterface {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
  id: number;
}

export type OptionCities = Array<CityInterface>;

export type APIInitialState = {
  weeklyForecast: daysForecastType;
  todaysHighlights: ITodayHighlight | null;
  hourlyForecast: HourlyForecastArray;
  fiveRelevantHours: HourlyForecastArray;
  loading: boolean;
  loadingSearch: boolean;
  error: any;
  search: string;
  selectedCity: CityInterface;
  citiesOptions: OptionCities;
  currentWeather: number;
};

export interface IForecastParams {
  latitude: number;
  longitude: number;
  timezone: string;
}
