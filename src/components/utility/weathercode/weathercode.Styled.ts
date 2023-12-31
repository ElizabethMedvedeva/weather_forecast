import styled from "styled-components";

interface IWeathercode {
  weathercode: number;
}
export const Weathercode = styled.div``;

export const WeathercodeImg = styled.img<IWeathercode>`
  max-width: 80px;
  height: auto;
  @media (max-width: 1064px) {
    max-width: 65px;
  }
`;

export const WeathercodeImgDaily = styled.img<IWeathercode>`
  max-width: 120px;
  height: auto;
  @media (max-width: 1690px) {
    max-width: 100px;
  }
  @media (max-width: 1350px) {
    max-width: 85px;
  }
  @media (max-width: 960px) {
    max-width: 110px;
  }
`;
