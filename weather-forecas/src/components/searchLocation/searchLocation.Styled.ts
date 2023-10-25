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
`;
export const SearchLocationInput = styled.input<StyledInterface>`
  background: ${({ themeStyles }) => themeStyles.backgroundLinear};
  border: 1px solid #1d1d1d;
  border-radius: 30px;
  color: ${({ themeStyles }) => themeStyles.text};
  text-align: center;
  width: 180px;
  margin-top: 40px;
  &::placeholder {
    color: ${({ themeStyles }) => themeStyles.text};
  }
`;
export const OptionCitiesDiv = styled.div<StyledInterface>`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  color: ${({ themeStyles }) => themeStyles.text};
  width: 180px;
`;

export const OptionCitiesButton = styled.button<StyledInterface>`
  background: ${({ themeStyles }) => themeStyles.backgroundLinear};
  border: 1px solid #1d1d1d;
  border-radius: 30px;
  color: ${({ themeStyles }) => themeStyles.text};
  margin: 5px 0;
`;
export const CityNameDiv = styled.div<StyledInterface>`
  margin-top: 120px;
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
