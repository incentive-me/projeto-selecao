import React, { useEffect, useState } from "react";
import CardFilterTag from "../CardFilterTag";
import { Div, AddTagForm, AddTagButton, CardRepo, Tags } from "./style";

const CardStarredRepo = ({ starredRepo }) => {
  const [tags, setTags] = useState(false);
  const [inputTag, setInputTag] = useState("");
  const [addTag, setAddTag] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [idRepo, setIdRepo] = useState("");
  const [inputSearch, setInputSearch] = useState(null);

  useEffect(() => {}, [isRemoved, tags]);

  const handleTag = (e) => {
    setInputTag(e.target.value);
  };

  const getIdAndSetAddTag = (id) => {
    setIdRepo(id);
    setAddTag(!addTag);
  };

  const createTagSubmit = (e) => {
    e.preventDefault();

    starredRepo.forEach((item) => {
      if (item.id === idRepo && item.tagUser.includes(inputTag)) {
        alert("Tag já está em uso! Informe uma outra tag.");
        return;
      } else {
        if (item.id === idRepo) {
          item.tagUser.push(inputTag);
          setTags(!tags);
          setAddTag(false);
          alert("Tag adicionada com sucesso!");
        }
      }
    });
  };

  const removeTagSubmit = (id, tag) => {
    starredRepo.forEach((item) => {
      if (item.id === id) {
        item.tagUser.forEach((tagMap, index) => {
          if (tagMap === tag) {
            item.tagUser.splice(index, 1);
          }
        });
        setIsRemoved(!isRemoved);
        alert("Tag removida do repositório!");
      }
    });
  };

  const starredFiltred = starredRepo?.filter(item => inputSearch ?
    item.tagUser?.some(e => e.includes(inputSearch)) : true
  );

  return (
    <>
      <Div>
        {addTag && (
          <AddTagForm>
            <div>
              <form onSubmit={createTagSubmit}>
                <input
                  required
                  placeholder="Digite um nome para tag"
                  onChange={handleTag}
                  autoFocus={true}
                />
                <div>
                  <button type="submit">adicionar</button>
                  <button onClick={() => setAddTag(!addTag)}>cancelar</button>
                </div>
              </form>
            </div>
          </AddTagForm>
        )}
        {!addTag && (
          <>
            <CardFilterTag setInputSearch={setInputSearch} />
            {starredFiltred.map((data) => (
              <CardRepo key={data.id}>
                <div>
                  <p>
                    <strong>id:</strong> {data.id}
                  </p>
                  <p>
                    <strong>repositório:</strong> {data.name}
                  </p>
                  <p>
                    <strong>descrição:</strong> {data.description}
                  </p>
                  <p>
                    <a href={data.html_url} target="_blank" rel="noreferrer">
                      ir para repositório
                    </a>
                  </p>
                </div>
                <Tags>
                  <strong>tags:</strong>
                  {data.tagUser?.map((tag) => (
                    <p>
                      {tag}{" "}
                      <button
                        onClick={() => removeTagSubmit(data.id, tag)}
                        title="remover tag"
                      >
                        X
                      </button>{" "}
                      |
                    </p>
                  ))}

                  <AddTagButton
                    title="adicionar tag"
                    onClick={() => getIdAndSetAddTag(data.id)}
                  >
                    + tag
                  </AddTagButton>
                </Tags>
              </CardRepo>
            ))}
          </>
        )}
      </Div>
    </>
  );
};

export default CardStarredRepo;
