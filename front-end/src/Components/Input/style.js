import styled from 'styled-components';

export const Container = styled.div`
display: inline-block;
padding: 2%;
width: 100%;
max-width: 600px;

`;

export const Input = styled.input`
width: 100%;
min-height: 50px;
border-radius: 3px;
outline: none;
border: 2px solid ${(props) => props.color};
transition: 300ms;
padding-left: 5px;
font-size: 16px;
color: #6665DD;
&:focus {
  border-color: #6665DD;
  transition: 300ms;

}
`;

export const Text = styled.p`
color: Black;
font-size: 20px;
font-weight:bolder;
margin-bottom: 8px;
`
;
