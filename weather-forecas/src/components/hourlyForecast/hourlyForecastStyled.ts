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
export const Weathercode = styled.div`
  background-color: pink;
`;

export const WeathercodeImg = styled.img<IWeathercode>`
  width: 40px;
  height: auto;
`;
