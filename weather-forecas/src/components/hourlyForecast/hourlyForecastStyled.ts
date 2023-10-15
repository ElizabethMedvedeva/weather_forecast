import styled from "styled-components";

interface IWeathercode {
  weathercode: number;
}
export const HourlyForecastDiv = styled.div`
  background-color: pink;
  margin: 0 auto;
`;
export const HourlyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;
export const HourContainer = styled.div`
  background-color: pink;
  display: flex;
  flex-direction: column;
`;
export const Weathercode = styled.div<IWeathercode>`
  image: ${(props) =>
    props.weathercode === 2 ? "/weather-forecas/src/assets/fog.png" : "yellow"};
`;
