import { FiTag } from 'react-icons/fi';
import { useRepositories } from '../../hooks/useRepositories';
import { Container } from './styles';

export function Tags(): JSX.Element {
  const { tags, selectedTag, setSelectedTag } = useRepositories();

  function handleSelectTag(tag: string) {
    if (selectedTag === tag) setSelectedTag('');
    else setSelectedTag(tag);
  }

  return (
    <Container>
      <h2>
        <FiTag size="20" />
        Tags
      </h2>

      <ul>
        {tags.map(tag => (
          <li key={tag}>
            <button
              className={selectedTag === tag ? 'active' : ''}
              type="button"
              onClick={() => handleSelectTag(tag)}
            >
              {tag}
            </button>
          </li>
        ))}
        {!tags.length && <p>Você ainda não criou nenhuma tag :)</p>}
      </ul>
    </Container>
  );
}
