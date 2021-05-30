import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextData {
  login: string;
  setLogin: (login: string) => void;
}

export const UserContext = createContext<UserContextData>(
  {} as UserContextData,
);

export function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [login, setLogin] = useState('');

  useEffect(() => {
    setLogin('gustavocrvls'); // REFATORAR AO CRIAR TELA DE LOGIN
  }, []);

  return (
    <UserContext.Provider value={{ login, setLogin }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextData {
  const context = useContext(UserContext);

  return context;
}
