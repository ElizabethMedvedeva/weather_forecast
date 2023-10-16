import styled from "styled-components";

interface IWeathercode {
  weathercode: number;
}
export const Weathercode = styled.div``;

export const WeathercodeImg = styled.img<IWeathercode>`
  max-width: 80px;
  height: auto;
`;
