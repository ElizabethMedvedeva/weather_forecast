export const getWindDirection = (windDirection: number) => {
  if (
    (337.5 <= windDirection && windDirection <= 360) ||
    (0 <= windDirection && windDirection <= 22.5)
  ) {
    return { direction: "N", rotate: 0 };
  }
  if (22.5 < windDirection && windDirection <= 67.5)
    return { direction: "NE", rotate: 45 };
  if (67.5 < windDirection && windDirection <= 112.5)
    return { direction: "E", rotate: 90 };
  if (112.5 < windDirection && windDirection <= 157.5)
    return { direction: "SE", rotate: 135 };
  if (157.5 < windDirection && windDirection <= 202.5)
    return { direction: "S", rotate: 180 };
  if (202.5 < windDirection && windDirection <= 247.5)
    return { direction: "SW", rotate: 225 };
  if (247.5 < windDirection && windDirection <= 295.5)
    return { direction: "W", rotate: 270 };
  if (295.5 < windDirection && windDirection < 337.5)
    return { direction: "NW", rotate: 315 };
  throw new Error(
    `Unexpected wind direction, it must be from 0 to 359 degrees.,
        ${windDirection}`
  );
};
