import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    palette: {
      textColor: string;
      textSecondary: string;
      purple: string;
      green: string;
    };
  }
}
