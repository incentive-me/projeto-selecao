import { FormEvent, useState } from 'react';
import { FiArrowRight, FiGithub } from 'react-icons/fi';
import { useHistory } from 'react-router';
import { Container } from './styles';
import logoImg from '../../assets/images/logo.svg';
import { useUser } from '../../hooks/useUser';
import { api } from '../../services/api';

export function Login(): JSX.Element {
  const [userLogin, setUserLogin] = useState('');

  const { setLogin } = useUser();

  const history = useHistory();

  async function getUserData(e: FormEvent) {
    e.preventDefault();

    try {
      await api.get(`users/${userLogin}`);
      setLogin(userLogin);
      history.push('/');
    } catch (err) {
      alert('O usuário não foi encontrado!');
    }
  }

  return (
    <Container>
      <img src={logoImg} alt="Github Stars" />
      <h1>GitHub Stars</h1>

      <p>
        O jeito mais fácil de organizar seus repositórios salvos no GitHub :)
      </p>

      <p style={{ fontSize: '1rem' }}>
        <FiGithub />
        Comece fazendo login no seu Github
      </p>

      <form className="login" onSubmit={getUserData}>
        <input
          placeholder="Digite seu username"
          value={userLogin}
          onChange={e => setUserLogin(e.target.value)}
        />
        <button type="submit">
          <FiArrowRight />
        </button>
      </form>
    </Container>
  );
}
