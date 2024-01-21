import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useAuthStore from '@/stores/auth.store'
import { LOCAL_STORAGE_KEYS } from '@/config'

export function useLoadUser() {
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  const { user, findLoggedUser, isLoading: isLoadingAuthStore } = useAuthStore()
  const router = useRouter()

  const isLoading = isLoadingAuthStore || isLoadingUser

  const shouldRedirectToLogin = !isLoading && !user

  useEffect(() => {
    if (shouldRedirectToLogin) {
      void router.push('/auth/login')
    }
  }, [shouldRedirectToLogin, router])

  useEffect(() => {
    ;(async () => {
      const userStorage = await localStorage.getItem(LOCAL_STORAGE_KEYS.USER_LOGGED_KEY)
      const userId = JSON.parse(String(userStorage))?.id
      try {
        await findLoggedUser(userId)
        setIsLoadingUser(false)
      } catch (error) {
        console.error('error', error)
        setIsLoadingUser(false)
      } finally {
        setIsLoadingUser(false)
      }
    })()
  }, [findLoggedUser])
}
