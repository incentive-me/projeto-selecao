import { createContext, useState, useContext } from "react";

export const DataContext = createContext({});

export function DataContextProvider({ children }) {
  const [dataUserContext, setDataUserContext] = useState([]);

  return (
    <DataContext.Provider value={{ dataUserContext, setDataUserContext }}>
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => {
  return useContext(DataContext);
};
