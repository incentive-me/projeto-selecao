"use client"

import {
  Grid,
  Button,
  TextField,
} from '@mui/material';

import {
  onShowBalanceByUuid,
  onEditBalanceByUuid
} from '@/domain/balances'

import { handleMaskPrice } from '@/support/handlers'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function EditBalance({ params }) {
  const router = useRouter()

  // const [name, setName] = useState('')
  // const [description, setDescription] = useState('')
  const [value, setInitialValue] = useState(0)

  const { register, handleSubmit, setValue, formState: { errors }, control } = useForm({
    defaultValues: { name: '', description: '' }
  })

  const onGoBack = () => router.push('/balances')
  const onSubmit = async (data) => {
    const result = await onEditBalanceByUuid({ uuid: params.uuid, ...data })

    if (result.status === 200 && result.data?.message) {
      // XXX TODO :: Add tooltip aqui
      console.log(result.data.message)
    }
  }

  useEffect(() => {
    onShowBalanceByUuid(params.uuid)
      .then(resolve => {
        setValue('name', resolve.display_name)
        setValue('description', resolve?.description || '')

        setInitialValue(handleMaskPrice(resolve.value.initial))
      })
  })

  return (
    <div className="p-6 relative h-full">
      <h5 className="text-xl">Editar saldo</h5>

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
              )}
            />
            
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
              )}/>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled
              label="Valor"
              type="text"
              value={value} />
          </Grid>
        </Grid>

        <div className="absolute bottom-0 left-0 w-full flex justify-between p-6">
          <Button variant="outlined" onClick={onGoBack}>
            Cancelar
          </Button>

          <Button type="submit" variant="contained">
            Salvar
          </Button>
        </div>
      </form>

    </div>
  );
}
