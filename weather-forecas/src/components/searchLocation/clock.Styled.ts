import styled from "styled-components"
import { Theme, ThemeType } from "../../theme/theme";

interface StyledInterface {
    themeStyles: Theme;
    themeType: ThemeType;
  }
export const ClockContainer = styled.div<StyledInterface>`
margin: 30px 0 70px 0;
h3{
    font-size: 70px;
    color: ${({ themeStyles }) => themeStyles.text};
}
h4{
    font-size: 30px;
    color: ${({ themeStyles }) => themeStyles.text};   
}
`