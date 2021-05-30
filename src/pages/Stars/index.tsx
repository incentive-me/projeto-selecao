import { useEffect, useState } from 'react';
import { StarredRepos } from '../../components/StarredRepos';
import { Tags } from '../../components/Tags';
import { UserProfile } from '../../components/UserProfile';
import { api } from '../../services/api';
import { IRepo } from '../../types';
import { Container } from './styles';

export function Stars(): JSX.Element {
  const [repos, setRepos] = useState<IRepo[]>([]);

  async function loadReposData(): Promise<void> {
    const response = await api.get<IRepo[]>('users/gustavocrvls/starred');

    setRepos(response.data);
  }

  useEffect(() => {
    loadReposData();
  }, []);

  return (
    <Container>
      <UserProfile starredRepos={repos.length} />
      <StarredRepos repos={repos} />
      <Tags />
    </Container>
  );
}
