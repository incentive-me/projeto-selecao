import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';
import { IRepo } from '../types';

interface RepositoriesProviderProps {
  children: ReactNode;
}

interface RepositoriesContextData {
  repos: IRepo[];
  starreds: number;
}

export const RepositoriesContext = createContext<RepositoriesContextData>(
  {} as RepositoriesContextData,
);

export function RepositoriesProvider({
  children,
}: RepositoriesProviderProps): JSX.Element {
  const [repos, setRepos] = useState<IRepo[]>([]);

  async function loadReposData(): Promise<void> {
    const response = await api.get<IRepo[]>('users/gustavocrvls/starred');

    setRepos(response.data);
  }

  useEffect(() => {
    loadReposData();
  }, []);

  return (
    <RepositoriesContext.Provider value={{ repos, starreds: repos.length }}>
      {children}
    </RepositoriesContext.Provider>
  );
}

export function useRepositories(): RepositoriesContextData {
  const context = useContext(RepositoriesContext);

  return context;
}
