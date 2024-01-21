import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { useLoadUser } from '@/hooks/useLoadUser'
import useAuthStore from '@/stores/auth.store'
import { Fingerprint } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Login: React.FC = () => {
  useLoadUser()
  const [values, setValues] = React.useState({ email: '', password: '' })
  const { user, login, isLoading } = useAuthStore()
  const router = useRouter()

  async function onSubmit() {
    const { email, password } = values
    await login(email, password)
  }

  useEffect(() => {
    if (user?.id) {
      router.push('/')
    }
  }, [user])

  return (
    <main className={`flex min-h-screen bg-zinc-100`}>
      <div className='flex-1 bg-zinc-900 items-center justify-center flex'>
        <Fingerprint color='white' size={200} />
      </div>

      <div className='flex-1 flex flex-col justify-center items-center'>
        <form
          onSubmit={e => {
            e.preventDefault()
            onSubmit()
          }}
          className='flex flex-col flex-1 space-y-8 justify-center items-center bg-zinc-100 w-full px-6'
        >
          <Input
            label='Email'
            name='email'
            type='email'
            variant='filled'
            fullWidth
            onChange={e => setValues({ ...values, email: e.target.value })}
            value={values.email}
          />
          <Input
            label='Senha'
            name='password'
            type='password'
            variant='filled'
            fullWidth
            onChange={e => setValues({ ...values, password: e.target.value })}
            value={values.password}
          />

          <Button type='submit' fullWidth isLoading={isLoading}>
            Login
          </Button>

          <div className='flex justify-center items-center gap-2'>
            <span className='text-sm'>Não tem uma conta?</span>
            <Button
              variant='text'
              className='bg-transparent'
              onClick={e => {
                e.preventDefault()
                router.push('/auth/register')
              }}
            >
              <span className='text-sm font-bold text-violet-600 hover:underline'>Registre-se</span>
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Login
