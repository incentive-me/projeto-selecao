import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function Root() {
  const [cookies] = useCookies();

  const { pathname } = useLocation();

  if (!cookies.token && !pathname.includes('auth'))
    return <Navigate to="auth/login" />;

  if (cookies.token && pathname.includes('auth'))
    return <Navigate to="payment" />;

  return <Outlet />;
}
