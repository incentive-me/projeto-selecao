import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const user = useSelector((state: any) => state.user.user)

  return user ? <Outlet /> : <Navigate to="/entrar" />;
};