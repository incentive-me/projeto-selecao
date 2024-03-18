import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useUserApi } from 'services/api/user';
import { CreateUserRequest } from 'services/api/user/types';
import { passwordSchema } from '../schemas';

const registerSchema = z
  .object({
    name: z.string().min(1, { message: 'Campo de preenchimento obrigatório.' }),
    email: z.string().email({ message: 'Preencha um email valido.' }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export function useRegister() {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { create } = useUserApi();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['user', 'create'],
    mutationFn: (data: CreateUserRequest) => create(data),
    onSuccess() {
      enqueueSnackbar('Usuário criada com sucesso!', {
        variant: 'success',
      });

      navigate('/auth/login');
    },
    onError() {
      enqueueSnackbar('Erro ao criar usuário.', {
        variant: 'error',
      });
    },
  });

  const onSubmit = async ({ name, email, password }: CreateUserRequest) =>
    await mutateAsync({
      name,
      email,
      password,
    });

  return {
    onSubmit,
    isPending,
    form,
  };
}
