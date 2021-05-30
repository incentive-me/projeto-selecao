import { FiSearch } from 'react-icons/fi';
import { Container } from './styles';

export function Search(): JSX.Element {
  return (
    <Container>
      <input placeholder="ex: react" />
      <button type="button">
        <FiSearch size="18" />
      </button>
    </Container>
  );
}
