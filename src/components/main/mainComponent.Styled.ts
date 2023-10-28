import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: space-evenly;
  align-items: center;
  max-width: 1170px;
  padding: 0 10px;
  @media (max-width: 965px) {
    flex-direction: column-reverse;
    justify-content: start;
`;

export const ForecastContainer = styled.div`
  flex-grow: 1;
  @media (max-width: 965px) {
    flex-grow: 0;
    width: 100%;
  }
`;
export const SearchContainer = styled.div`
  @media (max-width: 965px) {
    width: 100%;
  }
`;
