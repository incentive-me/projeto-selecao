import { Outlet } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
    </>
  );
}

export default App;
