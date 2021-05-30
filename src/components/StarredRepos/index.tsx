import { FiStar } from 'react-icons/fi';
import { Repo } from '../Repo';
import { Search } from '../Search';
import { Container } from './styles';

export function StarredRepos(): JSX.Element {
  return (
    <Container>
      <h1>
        <FiStar size="26" />
        Repositórios Salvos
      </h1>

      <Search />

      <Repo />
    </Container>
  );
}
