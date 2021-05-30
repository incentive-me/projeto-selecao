import { FiPlus, FiX } from 'react-icons/fi';
import { useRepositories } from '../../hooks/useRepositories';
import { IRepo } from '../../types';
import { Container } from './styles';

interface RepoProps {
  repo: IRepo;
}

export function Repo({ repo }: RepoProps): JSX.Element {
  const { removeTag } = useRepositories();

  return (
    <Container>
      <span>{repo.full_name}</span>
      <h2>{repo.name}</h2>

      <ul>
        {repo.tags.map(tag => (
          <li className="tag" key={tag}>
            <span>{tag}</span>
            <button type="button" onClick={() => removeTag(repo.id, tag)}>
              <FiX size="18" />
            </button>
          </li>
        ))}
        <li className="new-tag">
          <button type="button">
            <FiPlus size="18" />
          </button>
        </li>
      </ul>
    </Container>
  );
}
