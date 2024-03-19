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

import { setAlertShow } from '@/app/store'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export default function EditBalance({ params }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { handleSubmit, setValue, formState: { errors }, control } = useForm({
    defaultValues: { name: '' }
  })

  const [value, setInitialValue] = useState(0)
  const [description, setDescription] = useState('')

  const onGoBack = () => router.push('/balances')
  const onSubmit = async (data) => {
    const result = await onEditBalanceByUuid({ uuid: params.uuid, ...data })

    if (result.status !== 200) {
      dispatch(setAlertShow({
        open: true, 
        message: result.data.message,
        variant: 'error'
      }))
      return
    }

    dispatch(setAlertShow({
      open: true, 
      message: result.data.message,
      variant: 'success'
    }))

    router.push('/balances')
  }

  useEffect(() => {
    onShowBalanceByUuid(params.uuid)
      .then(resolve => {
        setValue('name', resolve.display_name)
        setDescription(resolve?.description || '')

        setInitialValue(resolve.value.initial)
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <TextField
              fullWidth
              disabled
              label="Descrição"
              value={description} />
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
