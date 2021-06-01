import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Provider from './Context/Provider';

import Routes from './Routes';

const App = () => {
 
  return (
    <Provider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;