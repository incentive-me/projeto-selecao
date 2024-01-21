import { api } from '@/lib/axios'

export type Payments = {
  id?: string
  name?: string
  description?: string
  value?: number
  balanceId?: string
  userId?: string
}

export const findAllPayments = async ({ page, pageSize }: { page: number; pageSize: number }) => {
  const response = await api.get(`/payment?page=${page}&pageSize=${pageSize}`)
  return response.data
}

export const createPayment = async (data: any) => {
  const response = await api.post('/payment', data)
  return response.data
}

export const updatePayment = async (data: any) => {
  const response = await api.patch('/payment', data)
  return response.data
}

export const deletePayment = async (id: string) => {
  const response = await api.delete(`/payment/${id}`)
  return response.data
}
