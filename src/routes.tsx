import { BrowserRouter, Route } from 'react-router-dom';
import { Stars } from './pages/Stars';

export function Routes(): JSX.Element {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Stars} />
    </BrowserRouter>
  );
}
