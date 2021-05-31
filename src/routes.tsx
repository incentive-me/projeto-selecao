import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Stars } from './pages/Stars';

export function Routes(): JSX.Element {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Stars} />
      <Route exact path="/login" component={Login} />
    </BrowserRouter>
  );
}
