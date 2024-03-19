"use client"

import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  FormControl,
} from '@mui/material';

import { onListBalances } from '@/domain/balances'
import { onCreatePayment } from '@/domain/payments'
import { handleMaskPrice } from '@/support/handlers'
import { setAlertShow } from '@/app/store'

import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function CreatePayment() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      name: '',
      description: '',
      value: '',
      balance_uuid: ''
    }
  })

  const [balances, setBalances] = useState([])

  const onGoBack = () => router.push('/payments')
  const onSubmit = async (data) => {
    const result = await onCreatePayment(data)

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
    router.push('/payments')
  }

  useEffect(() => {
    onListBalances().then(resolve => {
      if (resolve.status === 200) {
        setBalances(resolve.data)
      }
    })
  }, [])

  return (
    <div className="p-6 relative h-full">
      <h5 className="text-xl">Criar pedido de pagamento</h5>

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
          <Grid item xs={12}>
            <Controller
              name="balance_uuid"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'this field is required!'
                }
              }}
              render={({ field: { onChange, onBlur, value }}) => (
                <FormControl sx={{ width: '100%' }} required error={!!errors.balance_uuid}>
                  <InputLabel id="label-balance">Selecione o saldo a utilizar</InputLabel>
                  <Select
                    labelId="label-balance"
                    label="Selecione o saldo a utilizar"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}>
                    {balances.map(balance => <MenuItem key={balance.uuid} value={balance.uuid}>{balance.display_name}</MenuItem>)}
                    {!balances.length ? <MenuItem value="">Nenhum saldo disponível</MenuItem> : null}
                  </Select>
                  {errors.balance_uuid && (<FormHelperText>{errors.balance_uuid.message}</FormHelperText>)}
                </FormControl>
              )}/>
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
