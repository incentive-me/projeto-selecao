import styled from 'styled-components';

export const Container = styled.div`
margin-left:15%;
margin-top:5%;
display:flex;
flex-wrap: wrap;
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