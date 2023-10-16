import styled from "styled-components";

export const HourlyForecastDiv = styled.div`
  height: 450px;
  max-width: 940px;
  border-radius: 30px;
  background: rgba(68, 68, 68, 0.8);
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  h1 {
    padding: 30px 0px;
    font-size: 40px;
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
