import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  padding: 2%;
  flex-direction: column;
  background-image: url(${''}});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 60%;
  align-items: center;
  justify-content: center;

`;

export const Title = styled.h1`
  margin: 20px 0;
  font-size: 30pt;
  color: ${({ color }) => color};
`;

export const Buttons = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
`;
