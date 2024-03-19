"use client"

import { useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';

function AuthLogin() {  
  localStorage.setItem('user-auth', Math.round(Math.random() * 1000))
}
function AuthLogout() {
  // XXX TODO :: Add http request to logout here
  localStorage.removeItem('user-auth')
}
function AuthIsAuthorized() {
  return !!localStorage.getItem('user-auth')
}

function RouteGuard({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    authCheck(pathname)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  function authCheck(url) {
    const publicPath = ['/login']
    const path = url.split('?')[0]

    if (!AuthIsAuthorized() && !publicPath.includes(path)) {
      // XXX TODO :: Deixar false quando implementar o login
      setAuthorized(false)

      router.push('/login')
    } else {
      setAuthorized(true)
    }
  }

  return (authorized && children)
}

export {
  AuthLogin,
  AuthLogout,
  AuthIsAuthorized,

  RouteGuard
}