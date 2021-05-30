import { StarredRepos } from '../../components/StarredRepos';
import { Tags } from '../../components/Tags';
import { UserProfile } from '../../components/UserProfile';
import { Container } from './styles';

export function Stars(): JSX.Element {
  return (
    <Container>
      <UserProfile />
      <StarredRepos />
      <Tags />
    </Container>
  );
}
