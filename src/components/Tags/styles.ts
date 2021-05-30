import styled from 'styled-components';

export const Container = styled.div`
  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 10px;
      border-radius: ${props => props.theme.borderRadius};

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
        cursor: default;
      }
    }
  }
`;
