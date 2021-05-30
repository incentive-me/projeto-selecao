import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    palette: {
      textColor: string;
      textSecondary: string;
      primary: string;
      danger: string;
      green: string;
      cardBackground: string;
    };
    fonts: {
      primary: string;
      secondary: string;
    };
  }
}
