import styled from "styled-components";

interface IWeathercode {
  weathercode: number;
}
export const Weathercode = styled.div``;

export const WeathercodeImg = styled.img<IWeathercode>`
  width: 40px;
  height: auto;
`;
