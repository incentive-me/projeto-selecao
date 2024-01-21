import { api } from '@/lib/axios'

export const findLoggedUser = async (id: string) => {
  const response = await api.get(`/user/${id}`)
  return response.data
}

export const createUser = async (data: any) => {
  const response = await api.post('/user', data)
  return response.data
}
