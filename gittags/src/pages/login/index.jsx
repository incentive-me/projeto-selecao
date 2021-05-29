import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useDataContext } from "../../context/dataContext";
import { Input } from "../../components/input";

import { app } from "../../utils/axios";

export function Login() {
  const history = useHistory();
  const { setDataUserContext } = useDataContext();

  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    var str = name.replace(/\s/g, "");
    app.get(`${str}/starred`).then(({ data }) => {
      setData(data);
    });
  }, [name]);

  useEffect(() => {
    setDataUserContext(normalizeResponse(data));
  }, [data]);

  function handleChanger(e) {
    const value = e.target.value;

    setName(value);
  }
  function handleClick() {
    if (name) {
      history.push("/landing");
    }
  }

  return (
    <div>
      <Input
        name="name"
        id="name"
        type="text"
        placeholder="Entre com seu Usuário do GitHub"
        handleChanger={handleChanger}
        value={name}
      />
      <button type="button" onClick={handleClick}>
        ENTRAR
      </button>
    </div>
  );
}

function normalizeResponse(data) {
  const res = data.map((e) => ({
    id: e.id,
    name: e.name,
    html_url: e.html_url,
    description: e.description,
    tags: [],
  }));
  return res;
}
