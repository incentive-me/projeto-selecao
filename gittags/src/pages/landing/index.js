import { useState } from "react";
import { useDataContext } from "../../context/dataContext";
import { Input } from "../../components/input";
import "./style.css";

export function Landing() {
  const { dataUserContext } = useDataContext();
  const [data, setData] = useState(dataUserContext);
  const [show, setShow] = useState(false);
  const [tags, setTags] = useState("");
  const [idEscolhido, setIdEscolhido] = useState();

  function handleClick(item) {
    setShow(true);
    setIdEscolhido(item);
  }
  function handleClickAddTags() {
    let escolhido = {};
    let index;
    setShow(false);
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.id === idEscolhido) {
        escolhido = {
          ...element,
          tags: [tags],
        };
      }
    }
  }
  function handleChange(e) {
    const value = e.target.value;
    setTags(value);
  }
  return (
    <div>
      <div className="conteudo">
        {data.map((item, index) => (
          <div key={item.id} className="repositorios">
            <div>
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.html_url}</p>
              <p>{item.tags[index]}</p>
            </div>
            <button onClick={() => handleClick(item.id)}>Add Tag</button>
          </div>
        ))}
      </div>
      <div className={show === true ? "show" : "hidden"}>
        <input onChange={handleChange} />
        <button onClick={handleClickAddTags}>ADD TAGS</button>
      </div>
    </div>
  );
}
