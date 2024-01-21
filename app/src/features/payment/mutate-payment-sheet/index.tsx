import React, { useEffect, useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import Drawer from '@mui/joy/Drawer'

import { DialogContent, ModalClose } from '@mui/joy'
import { DialogTitle } from '@mui/material'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Balance, findAllBalances, findBalanceById } from '@/services/balance.service'
import { Payments, createPayment, updatePayment } from '@/services/payment.service'
import { toast } from 'react-toastify'
import { validateFormPayment } from './validate-form-payment'

type MutatePaymentSheetProps = {
  open: boolean
  onClose: () => void
  title?: string
  refetch?: () => void
  payment?: Payments | null
}

type FormValues = {
  name: string
  description: string
  amount: number
  balance: Balance | null
}

export default function MutatePaymentSheet({
  open,
  onClose,
  title,
  refetch,
  payment,
}: MutatePaymentSheetProps) {
  const [values, setValues] = useState<FormValues>({
    name: '',
    description: '',
    amount: 0,
    balance: null,
  })
  const [isLoading, setIsLoading] = useState(false)

  const loadOptions = async (searchQuery: any, loadedOptions: any, { page }: any) => {
    const response = await findAllBalances({ page: page, pageSize: 10 })

    return {
      options: response || [],
      hasMore: Math.ceil(response.totalResults / 10) > page,
      additional: {
        page: searchQuery ? 1 : page + 1,
      },
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const { name, description, amount, balance } = values
      const errors = validateFormPayment(values)
      if (!errors?.isValid) {
        return toast.error('Preencha os campos corretamente')
      }
      payment
        ? await updatePayment({
            payment: {
              id: payment.id,
            },
            name,
            description,
            amount,
            balanceId: balance?.id,
          })
        : await createPayment({
            payment: { name, description, amount, balanceId: balance?.id },
          })
      refetch?.()
      onClose()
    } catch (error) {
      toast.error(`Erro ao ${payment ? 'atualizar' : 'criar'} pagamento`)
    } finally {
      setIsLoading(false)
    }
  }

  const defaultsValues = async () => {
    if (!payment?.balanceId) return
    try {
      const balance = await findBalanceById(payment.balanceId)
      setValues({
        name: payment.name || '',
        description: payment.description || '',
        amount: payment.value || 0,
        balance,
      })
      return balance
    } catch (error) {
      toast.error(`Erro ao buscar saldo`)
    }
  }

  useEffect(() => {
    if (payment) {
      defaultsValues()
    }
  }, [payment])

  return (
    <React.Fragment>
      <Drawer anchor='right' open={open} onClose={onClose} size='md'>
        <ModalClose />
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <form
            className='flex flex-col space-y-4 px-4'
            onSubmit={e => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <Input
              label='Nome'
              name='name'
              type='text'
              variant='filled'
              fullWidth
              onChange={e => setValues({ ...values, name: e.target.value })}
              value={values.name}
              error={!!validateFormPayment(values)?.newErrors?.name}
            />
            <Input
              label='Descrição'
              name='description'
              type='text'
              variant='filled'
              fullWidth
              onChange={e => setValues({ ...values, description: e.target.value })}
              value={values.description}
              error={!!validateFormPayment(values)?.newErrors?.description}
            />
            <Input
              label='Valor'
              name='amount'
              type='number'
              variant='filled'
              fullWidth
              onChange={e => setValues({ ...values, amount: Number(e.target.value) })}
              value={values.amount}
              error={!!validateFormPayment(values)?.newErrors?.amount}
            />
            <AsyncPaginate
              id='balances'
              loadOptions={loadOptions}
              value={values.balance}
              getOptionValue={(option: any) => option}
              getOptionLabel={(option: any) => option.name}
              onChange={value => setValues({ ...values, balance: value })}
              additional={{
                page: 1,
              }}
              placeholder='Selecione um saldo'
              debounceTimeout={500}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderColor: state.isFocused
                    ? '#000'
                    : !!validateFormPayment(values)?.newErrors?.balance
                    ? '#f44336'
                    : '#000',
                }),
              }}
            />
            <Button
              type='submit'
              fullWidth
              isLoading={isLoading}
              disabled={
                isLoading ||
                ['name', 'description', 'amount', 'balance'].some(
                  key => !!validateFormPayment(values)?.newErrors?.[key as keyof typeof values]
                )
              }
            >
              Salvar
            </Button>
          </form>
        </DialogContent>
      </Drawer>
    </React.Fragment>
  )
}
