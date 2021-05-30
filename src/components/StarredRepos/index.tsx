import { useEffect, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { useRepositories } from '../../hooks/useRepositories';
import { IRepo } from '../../types';
import { Repo } from '../Repo';
import { Search } from '../Search';
import { Container } from './styles';

export function StarredRepos(): JSX.Element {
  const [starredRepos, setStarredRepos] = useState<IRepo[]>([]);
  const { repos, selectedTag, setSelectedTag, searchTag, setSearchTag } =
    useRepositories();

  useEffect(() => {
    if (selectedTag.length) {
      const stateRepos = [...repos];
      const newRepos = stateRepos.filter(repo =>
        repo.tags.includes(selectedTag),
      );
      setStarredRepos(newRepos);
    } else if (!searchTag.length) {
      setStarredRepos(repos);
    }
  }, [selectedTag]);

  useEffect(() => {
    setStarredRepos(repos);
  }, [repos]);

  function handleSearch() {
    setSelectedTag('');

    if (searchTag.length) {
      const stateRepos = [...repos];
      const newRepos = stateRepos.filter(repo =>
        repo.tags.some(tag => tag.includes(searchTag)),
      );
      setStarredRepos(newRepos);
    } else {
      setStarredRepos(repos);
    }
  }

  return (
    <Container>
      <h1>
        <FiStar size="26" />
        Repositórios Salvos
      </h1>

      <Search
        field={searchTag}
        handleField={(search: string) => setSearchTag(search)}
        handleSearch={handleSearch}
      />

      <div className="repos-container">
        {starredRepos.map(repo => (
          <Repo key={repo.id} repo={repo} />
        ))}
      </div>
    </Container>
  );
}
