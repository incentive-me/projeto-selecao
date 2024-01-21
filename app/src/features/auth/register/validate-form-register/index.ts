type FormValues = {
  name: string
  email: string
  password: string
}

export const validateFormRegister = ({ name, email, password }: FormValues) => {
  const newErrors = {
    name: name ? '' : 'Digite seu nome',
    email: email ? '' : 'Digite seu e-mail',
    password: password ? '' : 'Digite sua senha',
  }

  const isValid = Object.values(newErrors).every(error => !error)

  return { isValid, newErrors }
}
