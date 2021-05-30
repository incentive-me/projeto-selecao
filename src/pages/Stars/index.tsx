import { StarredRepos } from '../../components/StarredRepos';
import { UserProfile } from '../../components/UserProfile';
import { Container } from './styles';

export function Stars(): JSX.Element {
  return (
    <Container>
      <UserProfile />
      <StarredRepos />

      <div>
        <h2>Tags</h2>
        <ul>
          <li>Tag1</li>
        </ul>
      </div>
    </Container>
  );
}
