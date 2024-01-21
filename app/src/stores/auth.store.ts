import { login, logout } from '@/services/auth.service'
import { findLoggedUser } from '@/services/user.service'
import { create } from 'zustand'

interface AuthState {
  isLoading: boolean
  error: string
  user?: { id: string; name: string; email: string }
  login: (email: string, password: string) => void
  logout: () => void
  findLoggedUser: (id: string) => Promise<void>
}

const useAuthStore = create<AuthState>(set => ({
  user: undefined,
  isLoading: false,
  error: '',

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: '' })
    try {
      const response = await login(email, password)
      set({ user: response?.user })
      return response?.user
    } catch (error) {
      set({ error: 'Credenciais inválidas', user: undefined })
    } finally {
      set({ isLoading: false })
    }
  },

  logout: async () => {
    try {
      await logout()
    } catch (error) {
      console.error(error)
    } finally {
      set({ user: undefined })
      set({ isLoading: false })
    }
  },

  findLoggedUser: async (id: string) => {
    try {
      set({ isLoading: true })
      const res = await findLoggedUser(id)
      set({ user: res })
    } catch (error) {
      console.error(error)
      set({ user: undefined })
    } finally {
      set({ isLoading: false })
    }
  },
}))

export default useAuthStore
