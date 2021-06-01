import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isdisabled, setIsdisabled] = useState(true);

  useEffect(() => {
    const checkPassword = /^(?=.*?[0-9]).{4,}$/i.test(password);
    if (checkPassword === true) {
      setIsdisabled(false);
    } else {
      setIsdisabled(true);
    }
  }, [password]);
  const contextValue = {
    id,
    setId,
    name,
    setName,
    password,
    setPassword,
    isdisabled,
    setIsdisabled,
  };

  return (
    <AppContext.Provider value={contextValue}>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
};

export default Provider;