import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import CardStarredRepo from "../../components/CardStarredRepo/CardStarredRepo";
import CardUser from "../../components/CardUser";
import HeaderPage from "../../components/Header";
import { useHistory } from "react-router-dom";
import { goToLogin } from "../../router/coordinator";

const HomePage = () => {
  const [data, setData] = useState("");
  const [userInput, setUserInput] = useState("");
  const [notFound, setNotFound] = useState(null);
  const [starredData, setStarredData] = useState([]);
  const history = useHistory();

   useLayoutEffect(() => {
    if (!window.localStorage.getItem("token")) {
      goToLogin(history);
    }
  }, []);

  useEffect(() => {
    for (let item of starredData) {
      {
        item.tagUser = [];
      }
    }
  }, [starredData]);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setNotFound(data.message);
        } else {
          setData(data);
          setNotFound(null);
          getStarredRepo();
        }
      });
    
  };

  const getStarredRepo = () => {
    fetch(`https://api.github.com/users/${userInput}/starred`)
      .then((res) => res.json())
      .then((data) => setStarredData(data));
  };

  return (
    <>
      <HeaderPage handleUserSubmit={handleUserSubmit} handleUserInput={handleUserInput} />
      <MainArea>
        {notFound ? (
          <h1>{notFound}</h1>
        ) : (
          <CardsArea>
            {data &&
            <>
            <CardUser
              avatar={data.avatar_url}
              name={data.name}
              repos={data.public_repos}
              username={data.login}
              starredTotal={starredData.length}
            />

            <CardStarredRepo starredRepo={starredData} />
            </>}
          </CardsArea>
        )}
      </MainArea>
    </>
  );
};

export default HomePage;

const MainArea = styled.main`
  height: calc(100vh - 80px);
  background-color: #e6e6e6;
  overflow: hidden;

  @media(max-width: 700px) {
    min-height: 100vh;
    height: 100%;
    overflow: visible;
  }

  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
  }
`;

const CardsArea = styled.section`
  display: flex;
  height: 100%;
  padding: 24px 0 24px 24px;
  transition: .2s;

  @media(max-width: 700px) {
    flex-direction: column;
    padding: 24px;
  }
`;
