import styled from "styled-components";
import { Theme, ThemeType } from "../../theme/theme";

interface StyledInterface {
  themeStyles: Theme;
  themeType: ThemeType;
}
export const HourlyForecastDiv = styled.div<StyledInterface>`
  height: 370px;
  border-radius: 30px;
  background: ${({ themeStyles }) => themeStyles.backgroundLinear};
  color: ${({ themeStyles }) => themeStyles.text};
  margin: 15px;
  h1 {
    padding: 15px 0px;
    font-size: 35px;
  }
  @media (max-width: 1064px) {
    h1 {
      font-size: 25px;
    }
    @media (max-width: 965px) {
      height: 340px;
    }
    @media (max-width: 584px) {
      height: 870px;
    }
  }
`;
export const HourlyContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 0 10px;
  h3 {
    font-size: 20px;
  }
  h4 {
    font-size: 15px;
    padding: 2px 0;
  }
  @media (max-width: 1064px) {
    h3 {
      font-size: 15px;
    }
    @media (max-width: 733px) {
      h4 {
        font-size: 12px;
      }
    }
    @media (max-width: 584px) {
      flex-direction: column;
    }
  }
`;
export const HourContainer = styled.div<StyledInterface>`
  display: flex;
  flex-direction: column;
  background: ${({ themeStyles }) => themeStyles.backgroundLinear};
  padding: 10px 20px;
  border-radius: 40px;
  height: 270px;
  margin: 0 5px;
  @media (max-width: 1064px) {
    height: 250px;
    border-radius: 35px;
    padding: 10px 15px;
  }
  @media (max-width: 584px) {
    height: 140px;
    margin: 10px;
  }
`;

export const HourDataDiv = styled.div`
  @media (max-width: 584px) {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
`;
export const HourWeatherDiv = styled.div`
  @media (max-width: 584px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    h4 {
      margin-top: 10px;
    }
  }
`;
