import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import backEndApi from '../../Service/backEndApi';
import * as S from './style';

const Login = () => {
  const history = useHistory();
  const {
    name,
    setName,
    password,
    setPassword,
    isdisabled,
  } = useContext(AppContext);

  const fetch = async () => {
    try {
      const body = { name, password };
      const response = await backEndApi.post('/login', body);
      const data = await response.data;
      console.log(data)
      localStorage.setItem('token', JSON.stringify(data.token));
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      history.push('/main');
    }catch(e){
      console.log(e)
      history.push('/register');
    }
  };

  return (
    <S.Container>
      <S.Title>Login</S.Title>
      <Input
        value={name}
        type="email"
        onChange={({ target }) => setName(target.value)}
        placeholder="digite nome usuário"
        name="Email"
      />
      <Input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        name="Senha"
        placeholder="ex.1234"
        type="password"
      />
      <Button
        onClick={() => fetch()}
        disabled={isdisabled}
      >
        Acessar
      </Button>
      <Button
        onClick={() => history.push('/register')}
      >
        Não tenho registro
      </Button>

    </S.Container>
  );
};

export default Login;
