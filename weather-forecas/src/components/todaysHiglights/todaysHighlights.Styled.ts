import styled from "styled-components";

export const TodaysHightlightsContainer = styled.div`
  height: 410px;
  max-width: 787px;
  border-radius: 30px;
  background: rgba(68, 68, 68, 0.8);
  color: #ffffff;
  h1 {
    padding: 20px 0;
    font-size: 40px;
  }
`;

export const TodaysHightlightSet = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-evenly;
`;

export const SunTimeDiv = styled.div`
  display: flex;
  margin: 50px 0;
  padding: 10px;
`;
export const SunTimeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  h5 {
    font-size: 15px;
  }
`;
export const TodaysHightlightsIcon = styled.img`
  height: auto;
  width: 75px;
`;

export const TemmperatureDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 80px;
    background: -webkit-linear-gradient(76deg, #eee 40%, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
export const WeatherDetailsSet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const CoupleWeatherDetailsDiv = styled.div`
  display: flex;
`;

export const WeatherDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  align-items: center;
  h5 {
    font-size: 15px;
    padding: 10px 0;
  }
`;
export const WeatherDetailsIcon = styled.img`
  height: auto;
  max-width: 60px;
`;
