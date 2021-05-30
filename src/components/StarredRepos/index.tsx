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

      <div className="repos-container">
        {repos.map(repo => (
          <Repo key={repo.id} repo={repo} />
        ))}
      </div>
    </Container>
  );
}
