import axios from 'axios';
import { useEffect } from 'react';
import { FiGithub } from 'react-icons/fi';
import { useUser } from '../../hooks/useUser';
import { api } from '../../services/api';

export function Login(): JSX.Element {
  const { setToken } = useUser();

  async function getUserData(code: string) {
    const data = new FormData();
    data.append('client_id', process.env.REACT_APP_CLIENT_ID || '');
    data.append('client_secret', process.env.REACT_APP_CLIENT_SECRET || '');
    data.append('code', code);
    data.append('redirect_uri', process.env.REACT_APP_REDIRECT_URI || '');

    axios.post(`https://github.com/login/oauth/access_token`, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
      },
    });
  }

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes('?code=');

    if (hasCode) {
      const newUrl = url.split('?code=');
      getUserData(newUrl[1]);
    }
  }, []);

  return (
    <div>
      <a
        className="login-link"
        href="https://github.com/login/oauth/authorize?scope=read:user&client_id=75243641631ce00663ff&redirect_uri=http://localhost:3000/login"
        onClick={() => {
          // setData({ ...data, errorMessage: '' });
        }}
      >
        <FiGithub />
        <span>Login with GitHub</span>
      </a>
    </div>
  );
}
