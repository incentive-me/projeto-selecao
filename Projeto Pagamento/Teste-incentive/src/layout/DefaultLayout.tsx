import { Outlet } from "react-router-dom";
import "./index.css";
import Header from "../components/header";

export function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
