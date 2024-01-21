import { Balance } from '@/services/balance.service'

type FormValues = {
  name: string
  description: string
  amount: number
  balance: Balance | null
}

export const validateFormPayment = ({ name, description, amount, balance }: FormValues) => {
  const newErrors = {
    name: name ? '' : 'Digite seu nome',
    description: description ? '' : 'Digite sua descrição',
    amount: amount ? '' : 'Digite seu valor',
    balance: balance ? '' : 'Selecione um saldo',
  }

  const isValid = Object.values(newErrors).every(error => !error)

  return { isValid, newErrors }
}
