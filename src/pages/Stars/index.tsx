import { UserProfile } from '../../components/UserProfile';
import { Container } from './styles';

export function Stars(): JSX.Element {
  return (
    <Container>
      <UserProfile />

      <div>
        <h1>Repositórios Salvos</h1>
        <ul>
          <li>Repo</li>
        </ul>
      </div>

      <div>
        <h2>Tags</h2>
        <ul>
          <li>Tag1</li>
        </ul>
      </div>
    </Container>
  );
}
