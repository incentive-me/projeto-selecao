import { ThemeProvider } from 'styled-components';
import { Routes } from './routes';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
