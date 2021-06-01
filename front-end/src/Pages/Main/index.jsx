import React,{ useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import gitHubApi from '../../Service/gitHubApi';
import backEndApi from '../../Service/backEndApi';
import ReposityCard from '../../Components/CardRepo';
import * as S from './style';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

const Main = () => {
  const history = useHistory();
  const [repo, setRepo] = useState('');
  const [user,setUser] = useState('');
  const [response, setResponse] = useState([]);
  const [tag, setTag] = useState('');
 
  const fetchRepository = async () => {
    const {data} = await gitHubApi.get(`/users/${user}/repos`, {headers:{"Accept": "application/vnd.github.v3+json"}});
    setResponse(data);
  };

  const userByRepository = async () => {
    const {data} = await gitHubApi.get(`/repos/${user}/${repo}`, {headers:{"Accept": "application/vnd.github.v3+json"}});
    const respArray = [];
    respArray.push(data)
    setResponse(respArray)
  };

  const inputTag = async () =>{
    const arrayBody = [];
    const getUser = JSON.parse(localStorage.getItem('usuario'))
    arrayBody.push({ 
      repoId: response[0].id,
      name: response[0].name,
      description: response[0].description,
      tag: tag,
      url: response[0].html_url,
      userName: getUser
    });
   await backEndApi.post('/tag', arrayBody[0]);
  };

  const searchTag = async () => {
    const {data}= await backEndApi.get(`/tag/${tag}`);
    console.log(data.user)
    const respArray = [];
    respArray.push(data.user)
    setResponse(respArray)
  };

  useEffect(() => {
    if (!window.localStorage.token) {
      history.push('/login');
    }
  },[])
  console.log(response)
  return (
    <div>
      <Input
        value={user}
        onChange={({ target }) => setUser(target.value)}
        placeholder="nome do usuário"
        name="Usuário"
      />
      <Button
        onClick={() => fetchRepository()}
      >
        Buscar
      </Button>
      <Input
        value={repo}
        onChange={({ target }) => setRepo(target.value)}
        placeholder="nome repositorio"
        name="Repositorio"
      />
      <Button
        onClick={() => userByRepository()}
      >
        Buscar repositório
      </Button>
      <Input
        value={tag}
        onChange={({ target }) => setTag(target.value)}
        placeholder="nome da tag"
        name="Tag Repositorio"
      />
      <Button
        onClick={() => inputTag()}
      >
        adicionar Tag
      </Button>
      <Input
        value={tag}
        onChange={({ target }) => setTag(target.value)}
        placeholder="tag a ser procurada"
        name="Tag pesquisa"
      />
      <Button
        onClick={() => searchTag()}
      >
        buscar Tag
      </Button>
      <S.Container>
        {response?
        <ReposityCard props={response}/> : null
      }
      </S.Container>
      
    </div>
  );
}
export default Main;