import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const user = false  

  return user ? <Outlet /> : <Navigate to="/entrar" />;
};