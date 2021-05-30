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

interface IRepoTags {
  tags: string[];
}

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
        const newTags = repo.tags.filter(t => t !== tag);

        db.collection('users')
          .doc(login)
          .set({
            [repo.id]: {
              tags: newTags,
            },
          });

        return {
          ...repo,
          tags: newTags,
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
        const newTags = [...repo.tags, tag];

        db.collection('users')
          .doc(login)
          .set({
            [repo.id]: {
              tags: newTags,
            },
          });

        return {
          ...repo,
          tags: newTags,
        };
      }
      return repo;
    });

    setRepos(newRepos);
  }

  async function loadTags(): Promise<IRepoTags[]> {
    const response = await db.collection('users').doc(login).get();

    return response.data() as IRepoTags[];
  }

  async function loadReposData(): Promise<void> {
    const response = await api.get<IRepo[]>(`users/${login}/starred`);

    const repoTags = await loadTags();

    const rRepos = response.data.map(repo => ({
      ...repo,
      tags: repoTags[repo.id] ? repoTags[repo.id].tags : [],
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
