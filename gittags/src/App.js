import { DataContextProvider } from "./context/dataContext";
import { Routes } from "./routes/routes";

function App() {
  return (
    <DataContextProvider>
      <Routes />
    </DataContextProvider>
  );
}

export default App;
