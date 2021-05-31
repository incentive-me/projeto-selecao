import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 3rem;
    color: ${props => props.theme.palette.primary};
  }

  p {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
  }

  div {
    display: flex;
    align-items: center;
  }

  .login {
    display: flex;
    width: 300px;

    input {
      height: 40px;
      width: 100%;

      padding: 5px;
      border: 1px solid ${props => props.theme.palette.textSecondary};
      border-radius: ${props => props.theme.borderRadius} 0 0
        ${props => props.theme.borderRadius};
    }

    label {
      display: flex;
    }

    button {
      width: 40px;
      height: 40px;

      display: flex;
      align-items: center;
      justify-content: center;

      border: 0;
      border-radius: 0 ${props => props.theme.borderRadius}
        ${props => props.theme.borderRadius} 0;

      background-color: ${props => props.theme.palette.primary};
      color: #fff;
      /* padding: 5px; */
      font-size: 1.2rem;

      cursor: pointer;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;
