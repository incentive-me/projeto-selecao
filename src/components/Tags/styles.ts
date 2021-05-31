import styled from 'styled-components';

export const Container = styled.div`
  h2 {
    display: flex;
    align-items: center;
  }

  ul {
    list-style: none;
    padding: 0;

    button {
      padding: 10px;
      border: 0;
      width: 100%;
      border-radius: ${props => props.theme.borderRadius};
      background: transparent;
      text-align: left;
      font-size: 1rem;

      cursor: pointer;

      &:hover {
        background: ${props => props.theme.palette.cardBackground};
      }
    }

    .active {
      background: ${props => props.theme.palette.primary};
      color: #fff;

      &:hover {
        background: ${props => props.theme.palette.primary};
      }
    }
  }
`;
