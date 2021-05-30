import { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { useRepositories } from '../../hooks/useRepositories';
import { IRepo } from '../../types';
import { Container, NewTag } from './styles';

interface RepoProps {
  repo: IRepo;
}

export function Repo({ repo }: RepoProps): JSX.Element {
  const [newTag, setNewTag] = useState('');
  const { removeTag, createTag } = useRepositories();

  function handleNewTag() {
    if (newTag.length) createTag(repo.id, newTag);
    setNewTag('');
  }

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
        <NewTag>
          <input
            placeholder="new tag"
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
          />
          <button type="button" onClick={() => handleNewTag()}>
            <FiPlus size="18" />
          </button>
        </NewTag>
      </ul>
    </Container>
  );
}
