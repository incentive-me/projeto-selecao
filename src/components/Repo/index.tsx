import { FiPlus, FiX } from 'react-icons/fi';
import { IRepo } from '../../types';
import { Container } from './styles';

interface RepoProps {
  repo: IRepo;
}

export function Repo({ repo }: RepoProps): JSX.Element {
  return (
    <Container>
      <span>{repo.full_name}</span>
      <h2>{repo.name}</h2>

      <ul>
        <li className="tag">
          <span>tag1</span>
          <button type="button">
            <FiX size="18" />
          </button>
        </li>
        <li className="new-tag">
          <button type="button">
            <FiPlus size="18" />
          </button>
        </li>
      </ul>
    </Container>
  );
}
