import blowing_snow from "../../assets/blowing_snow.png";
import clear from "../../assets/clear.png";
import cloudy from "../../assets/cloudy.png";
import fog from "../../assets/fog.png";
import hail from "../../assets/hail.png";
import haze from "../../assets/haze.png";
import heavy_rain from "../../assets/heavy_rain.png";
import heavy_snow from "../../assets/heavy_snow.png";
import heavy_thunderstorm from "../../assets/heavy_thunderstorm.png";
import lightning from "../../assets/lightning.png";
import rain from "../../assets/rain.png";
import sandstorm from "../../assets/sandstorm.png";
import slight_rain from "../../assets/slight_rain.png";
import slight_snow from "../../assets/slight_snow.png";
import slight_thunderstorm from "../../assets/slight_thunderstorm.png";
import slow_rain from "../../assets/slow_rain.png";
import smoke from "../../assets/smoke.png";
import snow_drizzle from "../../assets/snow_drizzle.png";
import snow_grains from "../../assets/snow_grains.png";
import snow_rain from "../../assets/snow_rain.png";
import snowflake from "../../assets/snowflake.png";
import thunderstorm from "../../assets/thunderstorm.png";
import tornado from "../../assets/tornado.png";
import wind from "../../assets/wind.png";

export const getImageByWeathercode = (weathercode: number) => {
  if (
    (10 <= weathercode && weathercode <= 12) ||
    weathercode === 28 ||
    (40 <= weathercode && weathercode <= 49)
  ) {
    return fog;
  }
  if (97 <= weathercode && weathercode <= 99) {
    return heavy_thunderstorm;
  }
  if (0 <= weathercode && weathercode <= 3) {
    return cloudy;
  }
  if (weathercode === 4) {
    return smoke;
  }
  if (weathercode === 5) {
    return haze;
  }
  if (
    (6 <= weathercode && weathercode <= 9) ||
    (30 <= weathercode && weathercode <= 35)
  ) {
    return sandstorm;
  }
  if (weathercode === 13) {
    return lightning;
  }
  if (weathercode === 18 || weathercode === 19) {
    return wind;
  }
  if (14 <= weathercode && weathercode <= 16) {
    return slow_rain;
  }
  if (weathercode === 17 || weathercode === 29) {
    return thunderstorm;
  }
  if (weathercode === 95 || weathercode === 96) {
    return slight_thunderstorm;
  }
  if (weathercode === 20) {
    return tornado;
  }
  if (
    weathercode === 21 ||
    weathercode === 24 ||
    (60 <= weathercode && weathercode <= 66)
  ) {
    return rain;
  }
  if (weathercode === 77) {
    return snow_grains;
  }
  if (weathercode === 78) {
    return snowflake;
  }
  if (36 <= weathercode && weathercode <= 38) {
    return blowing_snow;
  }
  if (50 <= weathercode && weathercode <= 56) {
    return snow_drizzle;
  }
  if (57 <= weathercode && weathercode <= 59) {
    return snow_rain;
  }
  if (
    weathercode === 27 ||
    weathercode === 79 ||
    (89 <= weathercode && weathercode <= 90)
  ) {
    return hail;
  }
  if (weathercode === 91) {
    return slight_rain;
  }
  if (weathercode === 26 || weathercode === 94 || weathercode === 39) {
    return heavy_snow;
  }
  if (
    weathercode === 22 ||
    weathercode === 23 ||
    (70 <= weathercode && weathercode <= 75) ||
    (85 <= weathercode && weathercode <= 88) ||
    weathercode === 93
  ) {
    return slight_snow;
  }
  if (
    weathercode === 25 ||
    (67 <= weathercode && weathercode <= 69) ||
    (80 <= weathercode && weathercode <= 84) ||
    weathercode === 92
  ) {
    return heavy_rain;
  }
  return clear;
};
