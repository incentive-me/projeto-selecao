import { FiStar } from 'react-icons/fi';
import { useRepositories } from '../../hooks/useRepositories';
import { Repo } from '../Repo';
import { Search } from '../Search';
import { Container } from './styles';

export function StarredRepos(): JSX.Element {
  const { repos } = useRepositories();

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
