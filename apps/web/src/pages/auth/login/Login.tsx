import { LoadingButton } from '@mui/lab';
import { Container, Link, Stack, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { PasswordInput } from '../components';
import { useRegister } from './useLogin';

export function Login() {
  const {
    isPending,
    onSubmit,
    form: {
      register,
      handleSubmit,
      formState: { errors, isDirty },
    },
  } = useRegister();

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="xs" sx={{ pt: 8 }}>
        <Stack spacing={3} alignItems="center">
          <Typography variant="h1" fontSize={50}>
            Payments
          </Typography>

          <TextField
            variant="standard"
            required
            size="small"
            fullWidth
            placeholder="Digite seu e-mail"
            label="E-mail"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register('email')}
          />

          <PasswordInput
            required
            size="small"
            fullWidth
            variant="standard"
            placeholder="Digite sua senha"
            label="Senha"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            inputProps={{ ...register('password') }}
          />

          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            disabled={!isDirty}
            loading={isPending}
          >
            Entrar
          </LoadingButton>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Ainda não possui uma conta?</Typography>
            <Link component={RouterLink} to="/auth/register">
              Cadastre-se
            </Link>
          </Stack>
        </Stack>
      </Container>
    </form>
  );
}
