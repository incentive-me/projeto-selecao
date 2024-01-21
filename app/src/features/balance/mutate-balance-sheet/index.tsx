import React, { useEffect, useState } from 'react'
import Drawer from '@mui/joy/Drawer'

import { DialogContent, ModalClose } from '@mui/joy'
import { DialogTitle } from '@mui/material'
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'
import { Balance, createBalance, updateBalance } from '@/services/balance.service'
import { toast } from 'react-toastify'
import { validateFormBalance } from './validate-form-balance'

type MutateBalanceSheetProps = {
  open: boolean
  onClose: () => void
  title?: string
  refetch?: () => void
  balanceSelected?: Balance | null
}

export default function MutateBalanceSheet({
  open,
  onClose,
  title,
  refetch,
  balanceSelected,
}: MutateBalanceSheetProps) {
  const [values, setValues] = useState({ name: '', description: '', amount: 0 })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const { name, description, amount } = values
      const errors = validateFormBalance(values)
      if (!errors?.isValid) {
        return toast.error('Preencha os campos corretamente')
      }
      balanceSelected
        ? await updateBalance({
            balance: {
              id: balanceSelected.id,
            },
            name,
            description,
            amount,
          })
        : await createBalance({ name, description, amount })
      refetch?.()
      onClose()
    } catch (error) {
      toast.error(`Erro ao ${balanceSelected ? 'atualizar' : 'criar'} saldo`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (balanceSelected) {
      setValues({
        name: balanceSelected.name || '',
        description: balanceSelected.description || '',
        amount: balanceSelected.initialValue || 0,
      })
    }
  }, [balanceSelected])

  return (
    <React.Fragment>
      <Drawer anchor='right' open={open} onClose={onClose}>
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
              error={!!validateFormBalance(values)?.newErrors?.name}
            />
            <Input
              label='Descrição'
              name='description'
              type='text'
              variant='filled'
              fullWidth
              onChange={e => setValues({ ...values, description: e.target.value })}
              value={values.description}
              error={!!validateFormBalance(values)?.newErrors?.description}
            />
            <Input
              label='Valor'
              name='amount'
              type='number'
              variant='filled'
              fullWidth
              onChange={e => setValues({ ...values, amount: Number(e.target.value) })}
              value={values.amount}
              error={!!validateFormBalance(values)?.newErrors?.amount}
            />
            <Button
              type='submit'
              fullWidth
              isLoading={isLoading}
              disabled={
                isLoading ||
                ['name', 'description', 'amount'].some(
                  key => !!validateFormBalance(values)?.newErrors?.[key as keyof typeof values]
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
