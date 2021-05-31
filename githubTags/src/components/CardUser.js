import React from "react";
import styled from "styled-components";
import User from "../images/user.svg";
import Repo from "../images/folder.svg";
import Star from "../images/star.svg";

const CardUser = ({ avatar, username, repos, name, starredTotal, teste }) => {
  return (
    <>
      <Div>
        <div>
          <Avatar src={avatar} alt="Avatar" />
          <div>
            <p>{name}</p>
            <span>
              <img src={User} alt="User" /> {username}
            </span>
            <p>
              <img src={Repo} alt="Folder" /> {repos} repositórios públicos 
            </p>
            <p>
              <img src={Star} alt="Star" /> {starredTotal} repositórios com
              estrelas
            </p>
          </div>
        </div>
      </Div>
    </>
  );
};

export default CardUser;

const Div = styled.div`
  padding: 20px;
  height: 100%;
  min-width: 300px;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.42);

  div {
    display: flex;
    flex-direction: column;
  }

  div > div {
    img {
      width: 20px;
    }

    p {
      :first-child {
        font-size: 32px;
        font-weight: 500;
        align-self: center;
      }
      
      margin: 8px 0;
      font-size: 18px;
    }

    span {
      font-size: 18px;
      color: grey;
      margin-bottom: 8px;
    }
  }
`;

const Avatar = styled.img`
  border-radius: 30%;
  width: 200px;
  align-self: center;
`;
