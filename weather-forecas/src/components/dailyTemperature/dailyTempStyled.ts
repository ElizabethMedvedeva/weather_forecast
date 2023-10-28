import { styled } from "styled-components";
import { ForecastDayAmount } from "./dailyTemp";
import { Theme, ThemeType } from "../../theme/theme";
interface IDayAmount {
  dayAmount: ForecastDayAmount;
}
interface StyledInterface {
  themeStyles: Theme;
  themeType: ThemeType;
}
export const SevenDaysDiv = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 1590px) {
  }
`;

export const DailyTempContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flexdirection: column;
  margin: 10px;
  @media (max-width: 1200px) {
    margin: 6px;
  }
`;
export const DailyTempCardBox = styled.div<StyledInterface>`
  position: relative;
  min-height: 300px;
  width: 280px;
  display: flex;
  border-radius: 30px;
  justify-content: center;
  flex-direction: column;
  margin: 10px auto;
  background: ${({ themeStyles }) => themeStyles.backgroundLinear};
  color: ${({ themeStyles }) => themeStyles.text};
  height: auto;
  max-width: 100%;
  @media (max-width: 2180px) {
    width: 240px;
  }
  @media (max-width: 1890px) {
    width: 210px;
  }
  @media (max-width: 1690px) {
    width: 190px;
  }
  @media (max-width: 1540px) {
    width: 160px;
  }
  @media (max-width: 1350px) {
    width: 140px;
  }
  @media (max-width: 1150px) {
    width: 110px;
  }

  h5 {
    font-size: 30px;
    @media (max-width: 1890px) {
      font-size: 25px;
    }
    @media (max-width: 1690px) {
      font-size: 22px;
    }
    @media (max-width: 1540px) {
      font-size: 20px;
    }
    @media (max-width: 1350px) {
      font-size: 17px;
    }
    @media (max-width: 1150px) {
      font-size: 14px;
    }
  }
  h4 {
    font-size: 20px;
    padding-right: 10px;
    @media (max-width: 1690px) {
      font-size: 18px;
  }
  @media (max-width: 1540px) {
    font-size: 16px;
  }
  @media (max-width: 1350px) {
    font-size: 14px;
    padding-right: 7px;
  }
  @media (max-width: 1150px) {
    font-size: 13px;
}
`;
export const DailyTempDayDiv = styled.div`
  margin-left: 10px;
  @media (max-width: 1350px) {
    margin-left: 5px;
  }
`;
export const DailyTempWeekDayDiv = styled.div`
  margin-right: 10px;
  @media (max-width: 1350px) {
    margin-right: 5px;
  }
`;

export const DailyTempCardTopDiv = styled.div`
  display: flex;
  margin: 0 auto;
  padding-top: 30px;
`;

export const DailyTempCardTemperatureBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
`;
export const DailyTempMaxTempDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DailyTempMinTempDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
`;
export const DailyTempUvDiv = styled.div`
  margin: 0 auto;
  padding: 20px 0;
`;
export const DailyTempImgDiv = styled.div`
  margin: 0 auto;
  padding: 20px 0;
`;
export const DailyTempUvIcon = styled.img`
  height: auto;
  max-width: 60px;
`;

export const FourteenDaysDiv = styled.div<IDayAmount>`
  display: ${(props) => (props.dayAmount === "Seven" ? "none" : "flex")};

  margin: 0 auto;
`;

export const FourteenDaysButton = styled.button<IDayAmount & StyledInterface>`
  display: ${(props) => (props.dayAmount === "Seven" ? "none" : "")};
  background: ${({ themeStyles }) => themeStyles.backgroundButtonLinear};
  color: ${({ themeStyles }) => themeStyles.text};

  width: 70%;
  border: none;
  font-size: 40px;
  opacity: 0.2;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
  &:not(:hover) {
    opacity: transition: opacity 0.3s;
  }
`;

export const SevenDaysButton = styled.button<IDayAmount & StyledInterface>`
  display: ${(props) => (props.dayAmount === "Fourteen" ? "none" : "")};
  background: ${({ themeStyles }) => themeStyles.backgroundButtonLinear};
  color: ${({ themeStyles }) => themeStyles.text}; 
  width: 70%;
  border: none;
  font-size: 40px;
  opacity: 0.2;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
  &:not(:hover) {
    opacity: transition: opacity 0.3s;
  }
`;

export const DailyTempMainDiv = styled.div``;
