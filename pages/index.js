import axios from "axios";
import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [dados, setDados] = React.useState(null);
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState("");

  async function puxarDados(user) {
    try {
      const response = await axios.get(
        `http://api.github.com/users/${user}/starred`
      );
      setDados(response.data);
    } catch (error) {
      if (error.response.status === 404) {
        console.log(error);
        setError("Repositório inexistente");
      }
    }
  }

  function updateValue(e) {
    setInput(e.target.value);
  }

  return (
    <div className={styles.repoContainer}>
      <div className={styles.repoSearch}>
        <label htmlFor="user">Digite o usuário do Github</label>
        <input
          type="text"
          name="user"
          id="user"
          onChange={(e) => updateValue(e)}
        />
        <button onClick={() => puxarDados(input)}>
          Buscar repositórios marcados com estrela
        </button>
      </div>
      {dados ? (
        <div className={styles.repoData}>
          {dados.map((item) => (
            <div key={item.id} className={styles.repoCard}>
              <div>
                <p>Id: {item.id}</p>
                <p>Nome: {item.name}</p>
              </div>
              <p>Descrição: {item.description}</p>
              <p>
                URL:
                <Link href={item.html_url}>
                  <a target="__blank"> {item.html_url}</a>
                </Link>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.repoDataEmpty}>
          <p>Busque por repositórios marcados com estrela pelo usuário.</p>
          <Image src="/github.png" alt="github" width={700} height={400} />
          {error && <span>{error}</span>}
        </div>
      )}
    </div>
  );
}
