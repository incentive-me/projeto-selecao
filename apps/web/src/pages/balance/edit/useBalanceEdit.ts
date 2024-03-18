import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { generatePath, useNavigate } from 'react-router-dom';
import { useBalanceApi } from 'services/api/balance';
import {
  CreateBalanceRequest,
  UpdateBalanceRequest,
} from 'services/api/balance/types';
import { z } from 'zod';

const requiredMessage = 'Campo de preenchimento obrigatório.';

const balanceSchema = z.object({
  name: z.string().min(1, { message: requiredMessage }),
  description: z.string().min(1, { message: requiredMessage }),
  initialValue: z
    .number({ invalid_type_error: requiredMessage })
    .min(1, { message: requiredMessage }),
});

type BalanceForm = z.infer<typeof balanceSchema>;

export function useBalanceEdit(balanceId: string | undefined) {
  const { findOne, create, update } = useBalanceApi();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['balance', 'findOne', balanceId],
    queryFn: () => findOne(balanceId!),
    enabled: Boolean(balanceId),
  });

  const form = useForm<BalanceForm>({
    resolver: zodResolver(balanceSchema),
    defaultValues: {
      name: '',
      description: '',
      initialValue: 0,
    },
    values: {
      name: data?.name || '',
      description: data?.description || '',
      initialValue: data?.initialValue || 0,
    },
  });

  const { mutateAsync: createBalance, isPending: isPendingCreate } =
    useMutation({
      mutationKey: ['balance', 'create'],
      mutationFn: (data: CreateBalanceRequest) => create(data),
      onSuccess(data) {
        enqueueSnackbar('Sucesso ao criar saldo!', { variant: 'success' });

        navigate(generatePath('/balance/edit/:id', { id: data.id }));
      },
      onError() {
        enqueueSnackbar('Erro ao criar saldo.', { variant: 'error' });
      },
    });

  const { mutateAsync: updateBalance, isPending: isPendingUpdate } =
    useMutation({
      mutationKey: ['balance', 'update', balanceId],
      mutationFn: (data: UpdateBalanceRequest) => update(balanceId!, data),
      onSuccess(data) {
        enqueueSnackbar('Sucesso ao editar saldo!', { variant: 'success' });

        form.reset({
          description: data.description,
          initialValue: data.initialValue,
          name: data.name,
        });
      },
      onError() {
        enqueueSnackbar('Erro ao editar saldo.', { variant: 'error' });
      },
    });

  const onSubmit = (data: CreateBalanceRequest | UpdateBalanceRequest) => {
    if (balanceId) return updateBalance(data);

    return createBalance(data as CreateBalanceRequest);
  };

  const isPending = useMemo(
    () => isPendingCreate || isPendingUpdate,
    [isPendingCreate, isPendingUpdate],
  );

  return {
    form,
    onSubmit,
    isPending,
  };
}
