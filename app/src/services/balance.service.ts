import { api } from '@/lib/axios'

export type Balance = {
  id?: string
  userId?: string
  name?: string
  description?: string
  initialValue?: number
  total?: number
  usedValue?: number
}

export const findAllBalances = async ({ page, pageSize }: { page: number; pageSize: number }) => {
  const response = await api.get(`/balance?page=${page}&pageSize=${pageSize}`)
  return response.data
}

export const createBalance = async (data: any) => {
  const response = await api.post('/balance', data)
  return response.data
}

export const updateBalance = async (data: any) => {
  const response = await api.patch('/balance', data)
  return response.data
}

export const deleteBalance = async (id: string) => {
  const response = await api.delete(`/balance/${id}`)
  return response.data
}

export const findBalanceById = async (id: string) => {
  const response = await api.get(`/balance/${id}`)
  return response.data
}
