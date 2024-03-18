import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthApi } from 'services/api/auth';

import type { LoginRequest } from 'services/api/auth/types';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'Preencha um email valido.' }),
  password: z
    .string()
    .min(1, { message: 'Campo de preenchimento obrigatório' }),
});

type LoginForm = z.infer<typeof loginSchema>;

export function useRegister() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { login } = useAuthApi();

  const { enqueueSnackbar } = useSnackbar();

  const [_, setCookies] = useCookies();

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['user', 'create'],
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess(data) {
      enqueueSnackbar('Usuário logado com sucesso!', {
        variant: 'success',
      });

      setCookies('token', data.access_token);

      navigate('/payment');
    },
    onError() {
      enqueueSnackbar('Erro ao logar.', {
        variant: 'error',
      });
    },
  });

  const onSubmit = async ({ email, password }: LoginRequest) =>
    await mutateAsync({
      email,
      password,
    });

  return {
    onSubmit,
    isPending,
    form,
  };
}
