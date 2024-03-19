"use client"

import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

import { onShowPaymentByUuid, onEditPaymentByUuid } from '@/domain/payments'
import { setAlertShow } from '@/app/store'

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

export default function EditPayment({ params }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { handleSubmit, setValue,  formState: { errors }, control } = useForm({
    defaultValues: { name: '' }
  })

  const [value, setPaymentValue] = useState(0)
  const [description, setDescription] = useState('')
  const [balance, setBalance] = useState({})

  const onGoBack = () => router.push('/payments')
  const onSubmit = async (data) => {
    const result = await onEditPaymentByUuid({ uuid: params.uuid, ...data })

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
    onShowPaymentByUuid(params.uuid).then(resolve => {
      setValue('name', resolve.display_name)
      setDescription(resolve.description)
      setPaymentValue(resolve.value)
      setBalance(resolve?.balance || {})
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-6 relative h-full">
      <h5 className="text-xl">Editar pedido de pagamentos</h5>

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
            <TextField fullWidth disabled label="Descrição" value={description} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth disabled label="Valor" value={value} />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: '100%' }} disabled>
              <InputLabel id="label-balance">Saldo utilizado</InputLabel>
              <Select labelId="label-balance" label="Saldo utilizado" value={balance}>
                <MenuItem value={balance}>{balance?.display_name} - {balance?.value?.initial}</MenuItem>
              </Select>
            </FormControl>
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
