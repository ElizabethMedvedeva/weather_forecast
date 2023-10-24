import { styled } from "styled-components";
import { Theme, ThemeType } from "../../theme/theme";


interface StyledInterface {
  themeStyles: Theme;
  themeType: ThemeType;
}
export const GeneralContainer = styled.div<StyledInterface>`
  display: flex;
  background-image: ${({ themeStyles }) => themeStyles.backgroundImage};
  
  background-size: cover;
`;
