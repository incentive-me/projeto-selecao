import { useEffect, useState } from "react";
import { useDataContext } from "../../context/dataContext";
import "./style.css";

export function Landing() {
  const { dataUserContext } = useDataContext();
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [tags, setTags] = useState("");
  const [idEscolhido, setIdEscolhido] = useState();
  useEffect(() => {
    setData(dataUserContext);
  }, [dataUserContext]);

  function handleClick(item) {
    setShow(true);
    setIdEscolhido(item);
  }
  function handleClickAddTags() {
    let escolhido;
    let copia = data;
    setShow(false);
    for (let i = 0; i < copia.length; i++) {
      const element = copia[i];
      if (element.id === idEscolhido) {
        if (element.tags.length > 0) {
          let copiarTags = element.tags.slice();
          console.log(copiarTags);
          escolhido = {
            ...element,
            tags: [...copiarTags, tags],
          };
        }
        if (element.tags.length === 0) {
          escolhido = {
            ...element,
            tags: [tags],
          };
        }

        copia.splice(i, 1, escolhido);
      }
    }
    setData(copia);
  }
  function handleChange(e) {
    const value = e.target.value;
    setTags(value);
  }

  return (
    <div>
      <div className="conteudo">
        {data
          ? data.map((item) => (
              <div key={item.id} className="repositorios">
                <div>
                  <p>{item.name}</p>
                  <p>{item.description}</p>
                  <p>{item.html_url}</p>
                  <p>
                    {item.tags.map((item, index) => (
                      <div key={item} className="tags">
                        <span>
                          <button className="removebtn"> {item}</button>
                        </span>
                      </div>
                    ))}
                  </p>
                </div>
                <button
                  className="addTags"
                  onClick={() => handleClick(item.id)}
                >
                  Add Tag
                </button>
              </div>
            ))
          : null}
      </div>
      <div className={show === true ? "show" : "hidden"}>
        <input onChange={handleChange} />
        <button onClick={handleClickAddTags}>ADD TAGS</button>
      </div>
    </div>
  );
}
