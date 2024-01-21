import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Fingerprint } from 'lucide-react'

import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { createUser } from '@/services/user.service'

const Register: React.FC = () => {
  const [values, setValues] = useState({ email: '', password: '', name: '' })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      const { email, password, name } = values
      await createUser({ email, password, name })
      router.push('/auth/login')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

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
          className='flex flex-col flex-1 space-y-6 justify-center items-center bg-zinc-100 w-full px-6'
        >
          <Input
            label='Nome'
            name='name'
            type='text'
            variant='filled'
            fullWidth
            onChange={e => setValues({ ...values, name: e.target.value })}
            value={values.name}
          />
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
            Registrar
          </Button>
        </form>
      </div>
    </main>
  )
}

export default Register
