import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
const SButton = styled.button`
  padding: 15px;
  width: 100%;
  max-width: 250px;
  background-color: ${({ disabled }) => (disabled ? '#C2CDFF' : '#0A37FF')};
  transition: 650ms;
  border: none;
  outline: none;
  cursor: ${({ disabled }) => (!disabled ? 'pointer' : 'default')};
  color: #000000;
  border-radius: 8px;
  text-align: center;
  font-weight: bolder;
  font-size: 16px;
  margin: 2% 0;
  &:hover {
    filter: grayscale(40%);
  }
`;

export default SButton;
