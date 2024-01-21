import React, { useEffect } from 'react'
import useAuthStore from '@/stores/auth.store'
import { useRouter } from 'next/router'

const Logout: React.FC = () => {
  const { logout } = useAuthStore()
  const router = useRouter()
  useEffect(() => {
    logout()
    router.push('/auth/login')
  }, [])
  return <></>
}

export default Logout
