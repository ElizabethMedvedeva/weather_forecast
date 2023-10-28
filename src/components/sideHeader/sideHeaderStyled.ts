import { styled } from "styled-components";

export const SideHeaderDiv = styled.div`
  padding-top: 60px;
  width: 100px;
  background: #292727;
  background-size: cover;
  @media (max-width: 656px) {
    width: 100%;
    padding-top: 10px;
    display: flex;
    justify-content: space-evenly;
    align-content: ;
    align-items: center;
  }
`;

export const SideHeaderIconDiv = styled.div`
  padding: 50px 10px;
  @media (max-width: 656px) {
    padding: 10px;
  }
`;

export const SideHeaderIcon = styled.img`
  max-width: 84px;
  height: auto;
  @media (max-width: 656px) {
    max-width: 44px;
  }
`;
