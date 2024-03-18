"use client";

// IMPORTS
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

// SERVICES
import {
  getUserCookie,
  removeUserCookie,
  setUserCookie,
} from "@/services/session";

// COMPONENTS
import { toast } from "@/components/ui/use-toast";

interface UserContextData {
  isLoading: boolean;
  user?: string;

  setUser: (value: string) => void;
  setIsLoading: (value: boolean) => void;

  logOutUser: () => void;
}

const UserContext = createContext<UserContextData>({
  isLoading: false,
  user: "",

  setUser: () => {},
  setIsLoading: () => {},

  logOutUser: () => {},
});

function UserProvider({ children }: { children: ReactNode }) {
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState("");

  function logOutUser() {
    setUser("");
    removeUserCookie();
    push("/");
  }

  return (
    <UserContext.Provider
      value={{
        isLoading,
        user,

        setIsLoading,
        setUser,

        logOutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
