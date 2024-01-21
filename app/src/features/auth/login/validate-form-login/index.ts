type FormValues = {
  email: string
  password: string
}

export const validateFormLogin = ({ email, password }: FormValues) => {
  const newErrors = {
    email: email ? '' : 'Digite seu e-mail',
    password: password ? '' : 'Digite sua senha',
  }

  const isValid = Object.values(newErrors).every(error => !error)

  return { isValid, newErrors }
}
