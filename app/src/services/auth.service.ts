import { LOCAL_STORAGE_KEYS } from '@/config'
import { api } from '@/lib/axios'

export const updateTokens = async ({ token }: { token: string }) => {
  return await localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY, token)
}

export const login = async (email: string, password: string) => {
  const response = await api.post('login', {
    email,
    password,
  })
  await localStorage.setItem(
    LOCAL_STORAGE_KEYS.USER_LOGGED_KEY,
    JSON.stringify(response.data?.user)
  )
  const token = response.data?.token
  await updateTokens({ token: token })
  return response?.data
}

export const logout = async () => {
  try {
    await localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_LOGGED_KEY)
    await localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY)
  } catch (error) {
    console.error(error)
  }
}
