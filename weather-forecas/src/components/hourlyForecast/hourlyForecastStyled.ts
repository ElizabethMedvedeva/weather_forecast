import styled from "styled-components";
import { Theme, ThemeType } from "../../theme/theme";

export const HourlyForecastDiv = styled.div<any>`
  height: 370px;
  max-width: 940px;
  border-radius: 30px;
  background: ${(props) => (props.theme === "light" ? "pink" : "green")};
  color: #ffffff;
  margin: 15px;
  h1 {
    padding: 15px 0px;
    font-size: 35px;
  }
`;
export const HourlyContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  h3 {
    font-size: 20px;
  }
  h4 {
    font-size: 15px;
    padding: 2px 0;
  }
`;
export const HourContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(68, 68, 68, 0.8);
  padding: 10px 20px;
  margin: 0px 20px;
  border-radius: 40px;
  height: 270px;
`;
