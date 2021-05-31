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
  tags: string[];
  selectedTag: string;
  searchTag: string;

  removeTag: (repoId: number, tag: string) => void;
  createTag: (repoId: number, tag: string) => void;
  setSelectedTag: (tag: string) => void;
  setSearchTag: (tag: string) => void;
}

export const RepositoriesContext = createContext<RepositoriesContextData>(
  {} as RepositoriesContextData,
);

export function RepositoriesProvider({
  children,
}: RepositoriesProviderProps): JSX.Element {
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [starreds, setStarreds] = useState(0);

  const { login } = useUser();

  function removeTag(repoId: number, tag: string): void {
    let newRepos = [...repos];

    newRepos = newRepos.map(repo => {
      if (repo.id === repoId) {
        const newTags = repo.tags.filter(t => t !== tag);

        db.collection('users')
          .doc(login)
          .update({
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
          .update({
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
    try {
      const responseStarreds = await api.get<IRepo[]>(
        `users/${login}/starred`,
        {
          params: {
            per_page: 1,
          },
        },
      );
      const starredsQtd = new URLSearchParams(
        responseStarreds.headers.link
          .split(',')[1]
          .split(';')[0]
          .substring(
            2,
            responseStarreds.headers.link.split(',')[1].split(';')[0].length -
              1,
          ),
      ).get('page');

      setStarreds(Number(starredsQtd));
    } catch (err) {
      console.log('Não foi possível encontrar o número de repositórios salvos');
    }

    const response = await api.get<IRepo[]>(`users/${login}/starred`);

    const repoTags = await loadTags();

    if (repoTags) {
      let newTags = Object.keys(repoTags)
        .map((key: string) => repoTags[Number(key)].tags)
        .flat();

      newTags = newTags.filter((tag, index) => newTags.indexOf(tag) === index);

      setTags(newTags);

      const rRepos = response.data.map(repo => ({
        ...repo,
        tags: repoTags[repo.id] ? repoTags[repo.id].tags : [],
      }));

      setRepos(rRepos);
    } else {
      const rRepos = response.data.map(repo => ({
        ...repo,
        tags: [],
      }));
      setRepos(rRepos);
    }
  }

  useEffect(() => {
    const reposState = [...repos];
    const newRepoTags = reposState.map(repo => repo.tags);
    let newTags = newRepoTags.flat();

    newTags = newTags.filter((tag, index) => newTags.indexOf(tag) === index);

    setTags(newTags);
  }, [repos]);

  useEffect(() => {
    loadReposData();
  }, []);

  return (
    <RepositoriesContext.Provider
      value={{
        repos,
        starreds,
        tags,
        selectedTag,
        searchTag,
        setSelectedTag,
        setSearchTag,
        removeTag,
        createTag,
      }}
    >
      {children}
    </RepositoriesContext.Provider>
  );
}

export function useRepositories(): RepositoriesContextData {
  const context = useContext(RepositoriesContext);

  return context;
}
