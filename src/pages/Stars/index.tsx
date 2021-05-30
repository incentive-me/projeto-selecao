import { StarredRepos } from '../../components/StarredRepos';
import { Tags } from '../../components/Tags';
import { UserProfile } from '../../components/UserProfile';
import { RepositoriesProvider } from '../../hooks/useRepositories';
import { Container } from './styles';

export function Stars(): JSX.Element {
  return (
    <Container>
      <RepositoriesProvider>
        <UserProfile />
        <StarredRepos />
        <Tags />
      </RepositoriesProvider>
    </Container>
  );
}
