type FormValues = {
  name: string
  description: string
  amount: number | string
}

export const validateFormBalance = ({ name, description, amount }: FormValues) => {
  const newErrors = {
    name: name ? '' : 'Digite seu nome',
    description: description ? '' : 'Digite sua descrição',
    amount: amount ? '' : 'Digite seu valor',
  }

  const isValid = Object.values(newErrors).every(error => !error)

  return { isValid, newErrors }
}
