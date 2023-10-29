import styled from "styled-components";
import { Theme, themetype } from "../../theme/theme";

interface StyledInterface {
  themestyles: Theme;
  themetype: themetype;
}
export const ClockContainer = styled.div<StyledInterface>`
  margin: 30px 0 70px 0;
  h3 {
    font-size: 70px;
    color: ${({ themestyles }) => themestyles.text};
  }
  h4 {
    font-size: 30px;
    color: ${({ themestyles }) => themestyles.text};
  }
  @media (max-width: 1064px) {
    h3 {
      font-size: 50px;
    }
    h4 {
      font-size: 20px;
    }
    @media (max-width: 965px) {
      margin: 0;
    }
  }
`;
