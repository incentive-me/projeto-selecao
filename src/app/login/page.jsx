"use client"

import {
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
} from '@mui/material';

import { AuthLogin } from '@/domain/authentication'

import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter()
  const { handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data) => {
    AuthLogin()

    router.push('/payments')
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card variant="outlined">
        <CardContent>
          <div className="flex flex-col items-center">
            <h1 className="text-xl">Entre com sua conta</h1>

            <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-6">
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'this field is required!'
                      }
                    }}
                    render={({ field: { onChange, onBlur, value }}) => (
                      <TextField
                        fullWidth
                        required
                        label="Email"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!errors.email}
                        helperText={!!errors.email && errors.email.message}/>
                    )} />
                </Grid>
                <Grid item xs={12}>
                <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'this field is required!'
                      }
                    }}
                    render={({ field: { onChange, onBlur, value }}) => (
                      <TextField
                        required
                        fullWidth
                        onChange={onChange}
                        onBlur={onBlur}
                        label="Senha"
                        type="password"
                        value={value}
                        error={!!errors.password}
                        helperText={!!errors.password && errors.password.message} />
                    )} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button fullWidth type="submit" variant="contained">
                    Entrar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}