import { useRepositories } from '../../hooks/useRepositories';
import { Container } from './styles';

export function Tags(): JSX.Element {
  const { tags } = useRepositories();

  console.log(tags);

  return (
    <Container>
      <h2>Tags</h2>

      <ul>
        {tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </Container>
  );
}
