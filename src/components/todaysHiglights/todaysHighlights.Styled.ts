import styled from "styled-components";
import { Theme, ThemeType } from "../../theme/theme";
interface StyledInterface {
  themeStyles: Theme;
  themeType: ThemeType;
}

export const TodaysHightlightsContainer = styled.div<StyledInterface>`
  height: 400px;
  border-radius: 30px;
  background: ${({ themeStyles }) => themeStyles.backgroundLinear};
  color: ${({ themeStyles }) => themeStyles.text};
  margin: 15px;
  h1 {
    padding: 10px 0;
    font-size: 35px;
  }
  @media (max-width: 1064px) {
    h1 {
      font-size: 25px;
    }
    @media (max-width: 965px) {
      height: 350px;
    }
    @media (max-width: 526px) {
      height: 500px;
    }
  }
`;

export const TodaysHightlightSet = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-evenly;
  @media (max-width: 526px) {
    flex-direction: column;
  }
`;

export const SunTimeContainer = styled.div`
  @media (max-width: 526px) {
    display: flex;
    margin: 0 auto;
    justify-content: space-evenly;
    width: 100%;
  }
`;

export const SunTimeDiv = styled.div`
  display: flex;
  margin: 50px 0;
  padding: 10px;
  @media (max-width: 526px) {
    margin: 5px;
    padding: 0;
  }
`;
export const SunTimeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  h5 {
    font-size: 15px;
  }
`;
export const TodaysHightlightsIcon = styled.img`
  height: auto;
  width: 75px;
  @media (max-width: 1064px) {
    width: 55px;
  }
`;

export const TemmperatureDiv = styled.div<StyledInterface>`
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 80px;
    background: ${({ themeStyles }) => themeStyles.backgroundTextLinear};
  }
  @media (max-width: 1064px) {
    h3 {
      font-size: 60px;
    }
    @media (max-width: 526px) {
      h3 {
        font-size: 80px;
      }
    }
  }
`;
export const WeatherDetailsSet = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const CoupleWeatherDetailsDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  @media (max-width: 526px) {
    margin: 10px 0;
  }
`;

export const WeatherDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
  h5 {
    font-size: 15px;
    padding: 10px 0;
  }
  @media (max-width: 526px) {
    flex-direction: column;
    margin: 10px 0;
    h5 {
      padding: 0;
    }
  }
`;
export const WeatherDetailsIcon = styled.img`
  height: auto;
  max-width: 60px;
  @media (max-width: 1064px) {
    max--width: 45px;
  }
`;
