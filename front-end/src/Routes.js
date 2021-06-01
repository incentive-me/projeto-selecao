import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Main from './Pages/Main';

const Routes = () => (

  <Switch>
    <Route
      exact
      path="/"
      component={ () => <Redirect to="/login" /> }
    />
    <Route path="/login" component={ Login } /> 
    <Route path="/register" component={ Register } />
    <Route path="/main" component={ Main } />
  </Switch>
);

export default Routes;
