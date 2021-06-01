import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import backEndApi from '../../Service/backEndApi';
import AppContext from '../../Context/AppContext';
import * as S from './style';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

const Register = () => {
  const {
    name,
    setName,
    password,
    setPassword,
    isdisabled,
  } = useContext(AppContext);

  const history = useHistory();
 

  const fetch = async () => {
    const body = { name, password };
    await backEndApi.post('/register', body);
    setTimeout(() => history.push('/login'), 1800);
  };

  return (
    <S.Container>
      <S.Title>Registre-se</S.Title>
      <Input
        value={name}
        type="email"
        onChange={({ target }) => setName(target.value)}
        placeholder="ex.Antônio"
        name="Email"
      />
      <Input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        name="Senha"
        placeholder="no minimo 4 digitos"
        type="password"
      />
      <Button
        disabled={isdisabled}
        onClick={() => fetch()}
      >
        Registrar
      </Button>
    </S.Container>
  );
};

export default Register;
