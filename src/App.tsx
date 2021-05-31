import { ThemeProvider } from 'styled-components';
import { UserProvider } from './hooks/useUser';
import { Routes } from './routes';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Routes />
        <GlobalStyle />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
