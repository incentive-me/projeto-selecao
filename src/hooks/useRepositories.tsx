import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';
import { db } from '../services/firebase';
import { IRepo } from '../types';
import { useUser } from './useUser';

interface RepositoriesProviderProps {
  children: ReactNode;
}

interface RepositoriesContextData {
  repos: IRepo[];
  starreds: number;

  removeTag: (repoId: number, tag: string) => void;
  createTag: (repoId: number, tag: string) => void;
}

export const RepositoriesContext = createContext<RepositoriesContextData>(
  {} as RepositoriesContextData,
);

export function RepositoriesProvider({
  children,
}: RepositoriesProviderProps): JSX.Element {
  const [repos, setRepos] = useState<IRepo[]>([]);

  const { login } = useUser();

  function removeTag(repoId: number, tag: string): void {
    let newRepos = [...repos];

    newRepos = newRepos.map(repo => {
      if (repo.id === repoId) {
        return {
          ...repo,
          tags: repo.tags.filter(t => t !== tag),
        };
      }
      return repo;
    });

    setRepos(newRepos);
  }

  function createTag(repoId: number, tag: string): void {
    let newRepos = [...repos];

    newRepos = newRepos.map(repo => {
      if (repo.id === repoId) {
        return {
          ...repo,
          tags: [...repo.tags, tag],
        };
      }
      return repo;
    });
    console.log(db.app);
    db.collection('users')
      .doc(login)
      .set({
        tags: ['aa', 'c'],
      });

    setRepos(newRepos);
  }

  async function loadReposData(): Promise<void> {
    const response = await api.get<IRepo[]>(`users/${login}/starred`);

    const rRepos = response.data.map(repo => ({
      ...repo,
      tags: ['tag1', 'aaa', 'react'],
    }));

    setRepos(rRepos);
  }

  useEffect(() => {
    loadReposData();
  }, []);

  return (
    <RepositoriesContext.Provider
      value={{ repos, starreds: repos.length, removeTag, createTag }}
    >
      {children}
    </RepositoriesContext.Provider>
  );
}

export function useRepositories(): RepositoriesContextData {
  const context = useContext(RepositoriesContext);

  return context;
}
