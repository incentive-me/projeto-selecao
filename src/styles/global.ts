import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    font-family: 'Rambla', sans-serif;
    font-weight: 400;
    color: ${props => props.theme.palette.textColor}
  }

  h1, h2, h3, h4, h5, h6, input, textarea, button {
    font-family: 'Metrophobic', sans-serif;
    font-weight: 400;
  }

  *::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #F5F5F5;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #c9c9c9;
  }
`;
