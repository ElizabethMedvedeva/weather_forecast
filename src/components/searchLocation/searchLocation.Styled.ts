import styled from "styled-components";

import { Theme, themetype } from "../../theme/theme";

interface StyledInterface {
  themestyles: Theme;
  themetype: themetype;
}

export const SearchLocationContainer = styled.div<StyledInterface>`
  background: ${({ themestyles }) => themestyles.backgroundLinear};
  color: ${({ themestyles }) => themestyles.text};
  margin: 0 auto;
  height: 800px;
  border-radius: 30px;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media (max-width: 965px) {
    height: 300px;
    margin: 20px;
  }
`;

export const LoadingSearchDiv = styled.div`
  position: absolute;
  top: 46px;
  left: 31%;
`;

export const SearchLocationInput = styled.input<StyledInterface>`
  background: ${({ themestyles }) => themestyles.backgroundLinear};
  position: absolute;
  top: 0;
  border: 1px solid #1d1d1d;
  border-radius: 30px;
  color: ${({ themestyles }) => themestyles.text};
  text-align: center;
  width: 180px;
  margin-top: 40px;
  &::placeholder {
    color: ${({ themestyles }) => themestyles.text};
  }
`;

export const OptionCitiesDiv = styled.div<StyledInterface>`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  color: ${({ themestyles }) => themestyles.text};
  width: 180px;
  position: absolute;
  top: 68px;
`;

export const StyledOptionCitiesButton = styled.button<StyledInterface>`
  background: ${({ themestyles }) => themestyles.backgroundLinear};
  border: 1px solid #1d1d1d;
  border-radius: 30px;
  width: 180px;
  padding-right: 70px;
  color: ${({ themestyles }) => themestyles.text};
  @media (max-width: 1064px) {
    font-size: 15px;
  }
`;

export const CityNameDiv = styled.div<StyledInterface>`
  margin-top: 225px;
  h3 {
    font-size: 30px;
    background: ${({ themestyles }) => themestyles.cityText};
  }
  @media (max-width: 1064px) {
    margin-top: 225px;
    h3 {
      font-size: 25px;
    }
    @media (max-width: 965px) {
      margin-top: 80px;
    }
  }
`;

export const CurrentWeatherIcon = styled.img`
  margin: 0 auto;
  max-width: 180px;
  height: auto;
  @media (max-width: 1064px) {
    max-width: 140px;
  }
  @media (max-width: 965px) {
    display: none;
  }
`;

export const FavoriteBtn = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  top: 20%;
  right: 15%;
  fontsize: 24px;
  @media (max-width: 1064px) {
    font-size: 15px;
  }
`;
