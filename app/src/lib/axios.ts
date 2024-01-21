import authStore from '@/stores/auth.store'
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { LOCAL_STORAGE_KEYS } from '@/config'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
})

const getGraphqlErrorMessage = (error: any[]) => {
  const errors = error.map(error => error?.extensions?.originalError?.message || error?.message)
  if (!errors.length) return 'Ops, algo deu errado. Tente novamente mais tarde.'
  const errorMessage = errors.join('\n')
  if (errorMessage?.length > 100) return 'Ops, algo deu errado.'
  return errorMessage
}

const getErrorMessage = (error: any) => {
  const message = error.response?.data?.message || error.message
  if (message) {
    let errorMessage = ''
    const isArrayOfMessages = Array.isArray(message)
    if (isArrayOfMessages) {
      errorMessage = message.join(', ')
    } else {
      errorMessage = message
    }
    return errorMessage?.length > 100 ? 'Ops, algo deu errado.' : errorMessage
  }

  return 'Ops, algo deu errado. Tente novamente mais tarde.'
}

const accessTokenInterceptor = async (config: InternalAxiosRequestConfig<any>) => {
  const accessToken = await localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY)
  config.headers['Authorization'] = accessToken
  if (!accessToken) return config

  return config
}

const responseInterceptorOnFulfilled = async (response: AxiosResponse<any, any>) => {
  const errors = response?.data?.errors

  if (errors) {
    const status = errors[0]?.extensions?.originalError?.statusCode

    if (status === 401) {
      if (authStore.getState().user) {
        await authStore.getState().logout()
      }
      throw new Error('Usuário não autorizado.')
    }

    const errorMessage = getGraphqlErrorMessage(errors)

    throw new Error(errorMessage)
  }
  return response
}

const responseInterceptorOnRejected = (error: any) => {
  if (error.response?.status === 401 && authStore.getState().user) {
    return authStore.getState().logout()
  }
  const message = getErrorMessage(error)
  throw new Error(message)
}

api.interceptors.request.use(accessTokenInterceptor)
api.interceptors.response.use(responseInterceptorOnFulfilled, responseInterceptorOnRejected)
