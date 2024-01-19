import { Outlet } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="pt-20 px-4 w-full min-h-screen h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
