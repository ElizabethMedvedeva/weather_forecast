import { styled } from "styled-components";
import { Theme, themetype } from "../../theme/theme";

interface StyledInterface {
  themestyles: Theme;
  themetype: themetype;
}
export const GeneralContainer = styled.div<StyledInterface>`
  display: flex;
  background-image: ${({ themestyles }) => themestyles.backgroundImage};
  background-size: cover;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  @media (max-width: 656px) {
    display: block;
  }
`;

export const LoaderDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 40%;
`;
