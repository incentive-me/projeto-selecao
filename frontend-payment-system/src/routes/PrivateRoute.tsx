import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const user = true  

  return user ? <Outlet /> : <Navigate to="/entrar" />;
};