import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <div>GitHub Stars</div>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
