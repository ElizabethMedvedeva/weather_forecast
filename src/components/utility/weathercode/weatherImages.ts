export const getImageByWeathercode = (weathercode: number) => {
  if (
    (10 <= weathercode && weathercode <= 12) ||
    weathercode === 28 ||
    (40 <= weathercode && weathercode <= 49)
  ) {
    return "assets/fog.png";
  }
  if (97 <= weathercode && weathercode <= 99) {
    return "assets/heavy_thunderstorm.png";
  }
  if (0 <= weathercode && weathercode <= 3) {
    return "assets/cloudy.png";
  }
  if (weathercode === 4) {
    return "assets/smoke.png";
  }
  if (weathercode === 5) {
    return "assets/haze.png";
  }
  if (
    (6 <= weathercode && weathercode <= 9) ||
    (30 <= weathercode && weathercode <= 35)
  ) {
    return "assets/sandstorm.png";
  }
  if (weathercode === 13) {
    return "assets/lightning.png";
  }
  if (weathercode === 18 || weathercode === 19) {
    return "assets/wind.png";
  }
  if (14 <= weathercode && weathercode <= 16) {
    return "assets/slow_rain.png";
  }
  if (weathercode === 17 || weathercode === 29) {
    return "assets/thunderstorm.png";
  }
  if (weathercode === 95 || weathercode === 96) {
    return "assets/slight_thunderstorm.png";
  }
  if (weathercode === 20) {
    return "assets/tornado.png";
  }
  if (
    weathercode === 21 ||
    weathercode === 24 ||
    (60 <= weathercode && weathercode <= 66)
  ) {
    return "assets/rain.png";
  }
  if (weathercode === 77) {
    return "assets/snow_grains.png";
  }
  if (weathercode === 78) {
    return "assets/snowflake.png";
  }
  if (36 <= weathercode && weathercode <= 38) {
    return "assets/blowing_snow.png";
  }
  if (50 <= weathercode && weathercode <= 56) {
    return "assets/snow_drizzle.png";
  }
  if (57 <= weathercode && weathercode <= 59) {
    return "assets/snow_rain.png";
  }
  if (
    weathercode === 27 ||
    weathercode === 79 ||
    (89 <= weathercode && weathercode <= 90)
  ) {
    return "assets/hail.png";
  }
  if (weathercode === 91) {
    return "assets/slight_rain.png";
  }
  if (weathercode === 26 || weathercode === 94 || weathercode === 39) {
    return "assets/heavy_snow.png";
  }
  if (
    weathercode === 22 ||
    weathercode === 23 ||
    (70 <= weathercode && weathercode <= 75) ||
    (85 <= weathercode && weathercode <= 88) ||
    weathercode === 93
  ) {
    return "assets/slight_snow.png";
  }
  if (
    weathercode === 25 ||
    (67 <= weathercode && weathercode <= 69) ||
    (80 <= weathercode && weathercode <= 84) ||
    weathercode === 92
  ) {
    return "assets/heavy_rain.png";
  }
  return "assets/clear.png";
};
