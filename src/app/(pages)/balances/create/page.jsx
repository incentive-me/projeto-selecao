"use client"

import {
  Grid,
  Button,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import { onCreateBalance } from '@/domain/balances'
import { handleMaskPrice } from '@/support/handlers'

import { Controller, useForm } from 'react-hook-form';

export default function CreateBalance({ params }) {
  const router = useRouter()

  const { handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      name: '',
      description: '',
      value: ''
    }
  })

  const onGoBack = () => router.push('/balances')
  const onSubmit = async (data) => {
    const result = await onCreateBalance(data)

    if (result.status === 200 && result.data?.message) {
      // XXX TODO :: Add tooltip aqui
      console.log(result.data.message)
    }
  }

  return (
    <div className="p-6 relative h-full">
      <h5 className="text-xl">Criar saldo</h5>

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'This field is required'
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  fullWidth
                  required
                  label="Nome"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors.name}
                  helperText={!!errors.name && errors.name.message} />
              )} />            
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'this field is required!'
                }
              }}
              render={({ field: { onBlur, onChange, value }}) => (
                <TextField
                  fullWidth
                  required
                  label="Descrição"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors.description}
                  helperText={!!errors.description && errors.description.message} />
              )} />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="value"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'this field is required!'
                }
              }}
              render={({ field: { onBlur, onChange, value }}) => (
                <TextField
                  fullWidth
                  required
                  label="Valor"
                  type="text"
                  name="value"
                  onChange={(e) => onChange(handleMaskPrice(e.target.value))}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors.value}
                  helperText={!!errors.value && errors.value.message} />
              )} />
          </Grid>
        </Grid>

        <div className="absolute bottom-0 left-0 w-full flex justify-between p-6">
          <Button variant="outlined" onClick={onGoBack}>
            Cancelar
          </Button>

          <Button type="submit" variant="contained">
            Criar
          </Button>
        </div>
      </form>

    </div>
  );
}
