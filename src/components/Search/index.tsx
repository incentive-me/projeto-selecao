import { FormEvent } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Container } from './styles';

interface SearchProps {
  field: string;
  handleField: (search: string) => void;
  handleSearch: () => void;
}

export function Search({
  field,
  handleField,
  handleSearch,
}: SearchProps): JSX.Element {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    handleSearch();
  }

  return (
    <Container onSubmit={handleSubmit}>
      <input
        placeholder="ex: react"
        value={field}
        onChange={e => handleField(e.target.value)}
      />
      <button type="submit">
        <FiSearch size="18" />
      </button>
    </Container>
  );
}
