import { styled } from "styled-components";

interface IWindDirectionProps {
  rotate: number;
}

export const WindDirectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 5px 0;
`;

export const WindDirectionImg = styled.img<IWindDirectionProps>`
  max-width: 55px;
  height: auto;
  margin: 0 auto;
  transform: rotate(${({ rotate }) => rotate}deg);
`;
