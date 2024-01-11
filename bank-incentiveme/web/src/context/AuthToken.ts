import { api } from '../lib/axios'

export async function AuthToken() {
  const response = await api.post('login', {
    email: 'usuario02@email.com',
    password: 'usr022024'
  })

  localStorage.setItem('authorization', JSON.stringify(response.data.token))

  return response
}