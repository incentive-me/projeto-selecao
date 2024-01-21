import LoginFeature from '@/features/auth/login'

const Login = () => {
  return <LoginFeature />
}

Login.getLayout = function getLayout(page: React.ReactElement) {
  return page
}

export default Login
