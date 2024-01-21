import RegisterFeature from '@/features/auth/register'

const Register = () => {
  return <RegisterFeature />
}

Register.getLayout = function getLayout(page: React.ReactElement) {
  return page
}

export default Register
