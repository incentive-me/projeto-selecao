import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Stars } from './pages/Stars';

export function Routes(): JSX.Element {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/stars" component={Stars} />
    </BrowserRouter>
  );
}
