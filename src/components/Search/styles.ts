import styled from 'styled-components';

export const Container = styled.form`
  display: flex;

  width: 100%;

  input {
    width: 100%;
    height: 30px;

    padding: 5px;
    border: 1px solid ${props => props.theme.palette.textSecondary};
    border-radius: ${props => props.theme.borderRadius};
    margin: 5px 0;
  }

  button {
    height: 30px;
    width: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 5px;
    border: 0;
    border-radius: ${props => props.theme.borderRadius};
    margin: 5px 0 0 5px;
    background-color: ${props => props.theme.palette.primary};
    color: #fff;

    cursor: pointer;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
