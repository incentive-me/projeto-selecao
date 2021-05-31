import React, { useState, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { goToHome, goToLogin } from "../../router/coordinator";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useLayoutEffect(() => {
    if (window.localStorage.getItem("token")) {
      goToHome(history);
    }
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleUser = (e) => {
    setUser(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const localEmail = window.localStorage.getItem("email");
  const localpassword = window.localStorage.getItem("password");

  const signUp = (e) => {
    e.preventDefault()

    if (email === localEmail) {
      alert("E-mail já cadastrado. Utilize outro.")
    } 

    window.localStorage.setItem("email", email);
    window.localStorage.setItem("user", user);
    window.localStorage.setItem("password", password);
    window.localStorage.setItem("token", String(Date.now()));
    alert("Cadastro realizado com sucesso!");
    goToHome(history);
  };

  const login = (e) => {
    e.preventDefault();

    if (!localEmail || email !== localEmail) {
      alert('E-mail não cadastrado. Realize seu cadastro para fazer login.')
      return
    }

    if (email === localEmail && password === localpassword) {
      window.localStorage.setItem("token", String(Date.now()));
      goToHome(history);
    } else {
      alert("E-mail/senha incorretos");
    }
  };

  return (
    <MainArea>
      {isSignUp ? (
        <LoginForm onSubmit={signUp}>
          <h1>GitHubs TAGS - Cadastro</h1>
          <input
            required
            type="email"
            value={email}
            onChange={handleEmail}
            placeholder="informe seu email"
          />
          <input
            required
            type="text"
            value={user}
            onChange={handleUser}
            placeholder="como gostaria de ser chamado?"
          />
          <input
            required
            type="password"
            onChange={handlePassword}
            placeholder="informe sua senha"
          />
          <button type="submit">fazer cadastro</button>
          <span>
            já é cadastrado?{" "}
            <p onClick={() => setIsSignUp(!isSignUp)}>clique aqui</p>
          </span>
        </LoginForm>
      ) : (
        <LoginForm onSubmit={login}>
          <h1>GitHubs TAGS - Login</h1>
          <input
            required
            type="text"
            onChange={handleEmail}
            placeholder="informe seu email"
          />
          <input
            required
            type="password"
            onChange={handlePassword}
            placeholder="informe sua senha"
          />
          <button type="submit">fazer login</button>
          <span>
            ainda não é cadastrado?{" "}
            <p onClick={() => setIsSignUp(!isSignUp)}>clique aqui</p>
          </span>
        </LoginForm>
      )}
    </MainArea>
  );
};

export default LoginPage;

const MainArea = styled.main`
  height: 100vh;
  background-color: #203354;
  display: grid;
  place-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 50%;
  min-width: 340px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.42);

  h1 {
    @media (max-width: 710px) {
      font-size: 28px;
    }
  }

  p {
    display: inline-block;
    cursor: pointer;
    font-weight: 500;
    transition: 0.3s;

    :hover {
      color: #0088ff;
    }
  }

  input {
    height: 40px;
    width: 60%;
    margin: 8px 0%;
    padding: 8px;
  }

  button {
    background: #223354;
    border: 0;
    color: #fff;
    font-weight: 500;
    padding: 8px 16px;
    margin: 4px 0 8px 0;
    font-size: 22px;
    transition: 0.3s;
    cursor: pointer;

    :hover {
      filter: opacity(0.85);
    }
  }
`;
