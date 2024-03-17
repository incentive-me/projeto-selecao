"use client"

import {
  Card,
  CardContent,
  Grid,
  Button,
  Box,

  styled,
  TextField,
} from '@mui/material';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CustomButton = styled(Button)({ background: '#424242' })

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    // XXX TODO :: Add login domain authentication here
  })

  return (
    <div className="flex items-center justify-center h-screen">
      <Card variant="outlined">
        <CardContent>
          <div className="flex flex-col items-center">
            <h1 className="text-xl">Entre com sua conta</h1>

            <form noValidate onSubmit={onSubmit} className="mt-6">

              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="email"
                    label="Email"
                    value={email}
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'this field is required!'
                      }
                    })}
                    error={!!errors.email}
                    helperText={!!errors.email && errors.email.message}
                    onChange={(e) => setEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    value={password}
                    {...register('password', {
                      required: 'this field is required!'
                    })}
                    error={!!errors.password}
                    helperText={!!errors.password && errors.password.message}
                    onChange={(e) => setPassword(e.target.value)}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomButton
                    fullWidth
                    type="submit"
                    variant="contained"
                  >
                    Entrar
                  </CustomButton>
                </Grid>
              </Grid>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}