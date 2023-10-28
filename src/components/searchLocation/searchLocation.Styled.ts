import styled from "styled-components";
import { Theme, ThemeType } from "../../theme/theme";

interface StyledInterface {
  themeStyles: Theme;
  themeType: ThemeType;
}
export const SearchLocationContainer = styled.div<StyledInterface>`
  background: ${({ themeStyles }) => themeStyles.backgroundLinear};
  color: ${({ themeStyles }) => themeStyles.text};
  margin: 0 auto;
  height: 800px;
  border-radius: 30px;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  width: 100%;
`;
export const LoadingSearchDiv = styled.div`
  position: absolute;
  top: 46px;
  left: 31%;
`;
export const SearchLocationInput = styled.input<StyledInterface>`
  background: ${({ themeStyles }) => themeStyles.backgroundLinear};
  position: absolute;
  left: 27%;
  top: 0;

  border: 1px solid #1d1d1d;
  border-radius: 30px;
  color: ${({ themeStyles }) => themeStyles.text};
  text-align: center;
  width: 180px;
  margin-top: 40px;
  posi &::placeholder {
    color: ${({ themeStyles }) => themeStyles.text};
  }
`;
export const OptionCitiesDiv = styled.div<StyledInterface>`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  color: ${({ themeStyles }) => themeStyles.text};
  width: 180px;
  position: absolute;
  left: 27%;
  top: 68px;
`;

export const StyledOptionCitiesButton = styled.button<StyledInterface>`
  background: ${({ themeStyles }) => themeStyles.backgroundLinear};
  border: 1px solid #1d1d1d;
  border-radius: 30px;
  width: 180px;
  padding-right: 70px;

  color: ${({ themeStyles }) => themeStyles.text};
`;
export const CityNameDiv = styled.div<StyledInterface>`
  margin-top: 225px;
  h3 {
    font-size: 30px;
    background: ${({ themeStyles }) => themeStyles.cityText};
  }
`;
export const CurrentWeatherIcon = styled.img`
  margin: 0 auto;
  max-width: 180px;
  height: auto;
`;
