import { FiStar } from 'react-icons/fi';
import { IRepo } from '../../types';
import { Repo } from '../Repo';
import { Search } from '../Search';
import { Container } from './styles';

interface StarredReposProps {
  repos: IRepo[];
}

export function StarredRepos({ repos }: StarredReposProps): JSX.Element {
  return (
    <Container>
      <h1>
        <FiStar size="26" />
        Repositórios Salvos
      </h1>

      <Search />

      {repos.map(repo => (
        <Repo key={repo.id} repo={repo} />
      ))}
    </Container>
  );
}
