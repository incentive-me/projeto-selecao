import { useEffect, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { useRepositories } from '../../hooks/useRepositories';
import { IRepo } from '../../types';
import { Repo } from '../Repo';
import { Search } from '../Search';
import { Container } from './styles';

export function StarredRepos(): JSX.Element {
  const [starredRepos, setStarredRepos] = useState<IRepo[]>([]);
  const { repos, selectedTag } = useRepositories();

  useEffect(() => {
    if (selectedTag.length) {
      const stateRepos = [...repos];
      const newRepos = stateRepos.filter(repo =>
        repo.tags.includes(selectedTag),
      );
      setStarredRepos(newRepos);
    } else {
      setStarredRepos(repos);
    }
  }, [selectedTag]);

  useEffect(() => {
    setStarredRepos(repos);
  }, [repos]);

  return (
    <Container>
      <h1>
        <FiStar size="26" />
        Repositórios Salvos
      </h1>

      <Search />

      <div className="repos-container">
        {starredRepos.map(repo => (
          <Repo key={repo.id} repo={repo} />
        ))}
      </div>
    </Container>
  );
}
