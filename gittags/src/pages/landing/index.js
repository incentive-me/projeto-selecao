import { useState } from "react";
import { useDataContext } from "../../context/dataContext";
import { Input } from "../../components/input";
import "./style.css";

export function Landing() {
  const { dataUserContext } = useDataContext();
  const [data, setData] = useState(dataUserContext);
  const [show, setShow] = useState(false);
  const [tags, setTags] = useState("");

  function handleClick() {}
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
            <button onClick={handleClick}>Add Tag</button>
          </div>
        ))}
      </div>
      <div className={show === true ? "show" : "hidden"}>
        <Input />
      </div>
    </div>
  );
}
