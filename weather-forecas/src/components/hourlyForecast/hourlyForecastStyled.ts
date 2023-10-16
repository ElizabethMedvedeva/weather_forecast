import styled from "styled-components";

export const HourlyForecastDiv = styled.div`
  height: 700px;
  border-radius: 30px;
  background: rgba(68, 68, 68, 0.8);
  margin: 0 auto;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  h1 {
    padding: 40px 0px 0px 0px;
    font-size: 40px;
  }
`;
export const HourlyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  h3 {
    font-size: 24px;
  }
  h4 {
    font-size: 20px;
  }
`;
export const HourContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(68, 68, 68, 0.8);
  padding: 10px 30px 10px 30px;
  margin: 0px 20px;
  border-radius: 40px;
  height: 470px;
`;
