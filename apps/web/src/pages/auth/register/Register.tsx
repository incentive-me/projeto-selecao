import { LoadingButton } from '@mui/lab';
import { Container, Link, Stack, TextField, Typography } from '@mui/material';
import { PasswordInput } from '../components';
import { useRegister } from './useRegister';
import { Link as RouterLink } from 'react-router-dom';

export function Register() {
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
            required
            size="small"
            variant="standard"
            fullWidth
            placeholder="Digite seu nome"
            label="Nome"
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            {...register('name')}
          />

          <TextField
            required
            size="small"
            variant="standard"
            fullWidth
            placeholder="Digite seu e-mail"
            label="E-mail"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register('email')}
          />

          <PasswordInput
            required
            variant="standard"
            size="small"
            fullWidth
            placeholder="Digite a senha"
            label="Senha"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            inputProps={{ ...register('password') }}
          />

          <PasswordInput
            required
            variant="standard"
            size="small"
            fullWidth
            placeholder="Confirme a senha"
            label="Digite a senha novamente"
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
            inputProps={{ ...register('confirmPassword') }}
          />

          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            disabled={!isDirty}
            loading={isPending}
          >
            Cadastrar-se
          </LoadingButton>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Já possui uma conta?</Typography>
            <Link component={RouterLink} to="/auth/login">
              Conecte-se
            </Link>
          </Stack>
        </Stack>
      </Container>
    </form>
  );
}
