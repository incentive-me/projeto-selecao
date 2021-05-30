import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
  border-radius: ${props => props.theme.borderRadius};

  background-color: ${props => props.theme.palette.cardBackground};

  span {
    font-family: ${props => props.theme.fonts.primary};
  }

  & + & {
    margin-top: 10px;
  }

  ul {
    list-style: none;
    padding: 0;

    display: flex;

    li {
      margin: 0 5px;
    }

    .tag {
      display: flex;
      align-items: center;

      height: 30px;

      background: ${props => props.theme.palette.primary};

      border: 0;
      border-radius: ${props => props.theme.borderRadius};
      color: #fff;

      span {
        padding: 5px 5px;
      }

      button {
        height: 30px;
        width: 30px;
        padding: 5px 5px;

        display: flex;
        align-items: center;
        justify-content: center;

        border: 0;
        border-radius: 0 ${props => props.theme.borderRadius}
          ${props => props.theme.borderRadius} 0;

        background: transparent;
        color: #fff;

        transition: background-color 0.2s;

        &:hover {
          background: ${props => props.theme.palette.danger};

          cursor: pointer;
        }
      }
    }

    .new-tag {
      button {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 30px;
        width: 30px;
        padding: 5px 5px;
        border: 0;
        border-radius: ${props => props.theme.borderRadius};

        background: ${props => props.theme.palette.green};
        color: #fff;

        transition: filter 0.2s;

        &:hover {
          filter: brightness(0.9);
          cursor: pointer;
        }
      }
    }
  }
`;
