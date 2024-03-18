import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { generatePath, useNavigate } from 'react-router-dom';
import { usePaymentApi } from 'services/api/payment';
import {
  CreatePaymentRequest,
  UpdatePaymentRequest,
} from 'services/api/payment/types';
import { AxiosError } from 'axios';
import { z } from 'zod';

const requiredMessage = 'Campo de preenchimento obrigatório.';

const paymentSchema = z.object({
  name: z.string().min(1, { message: requiredMessage }),
  description: z.string().min(1, { message: requiredMessage }),
  value: z
    .number({ invalid_type_error: requiredMessage })
    .min(1, { message: requiredMessage }),
  balance: z.object({
    id: z.string().min(1, { message: requiredMessage }),
    name: z.string().min(1, { message: requiredMessage }),
  }),
});

export type PaymentForm = z.infer<typeof paymentSchema>;

export function usePaymentEdit(paymentId: string | undefined) {
  const { findOne, create, update } = usePaymentApi();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['payment', 'findOne', paymentId],
    queryFn: () => findOne(paymentId!),
    enabled: Boolean(paymentId),
  });

  const form = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      name: '',
      description: '',
      value: 0,
      balance: {
        id: '',
        name: '',
      },
    },
    values: {
      name: data?.name || '',
      description: data?.description || '',
      value: data?.value || 0,
      balance: data?.balance || {
        id: '',
        name: '',
      },
    },
  });

  const { mutateAsync: createPayment, isPending: isPendingCreate } =
    useMutation({
      mutationKey: ['payment', 'create'],
      mutationFn: (data: CreatePaymentRequest) => create(data),
      onSuccess(data) {
        enqueueSnackbar('Sucesso ao criar pagamento!', { variant: 'success' });

        navigate(generatePath('/payment/edit/:id', { id: data.id }));
      },
      onError(error: AxiosError<{ error: string }>) {
        if (
          error.response?.data.error ===
          'The remaining value of this balance is not enough for this value'
        )
          return enqueueSnackbar(
            'O saldo não tem valor o suficiente para efetuar este pagamento.',
            {
              variant: 'error',
            },
          );

        enqueueSnackbar('Erro ao criar pagamento.', { variant: 'error' });
      },
    });

  const { mutateAsync: updatePayment, isPending: isPendingUpdate } =
    useMutation({
      mutationKey: ['payment', 'update', paymentId],
      mutationFn: (data: UpdatePaymentRequest) => update(paymentId!, data),
      onSuccess(data) {
        enqueueSnackbar('Sucesso ao editar pagamento!', { variant: 'success' });

        form.reset({
          description: data.description,
          name: data.name,
          balance: {
            id: data.balance.id,
            name: data.balance.name,
          },
          value: data.value,
        });
      },
      onError() {
        enqueueSnackbar('Erro ao editar pagamento.', { variant: 'error' });
      },
    });

  const onSubmit = (data: CreatePaymentRequest | UpdatePaymentRequest) => {
    if (paymentId)
      return updatePayment({
        description: data.description,
        name: data.name,
      });

    return createPayment(data as CreatePaymentRequest);
  };

  const isPending = useMemo(
    () => isPendingCreate || isPendingUpdate,
    [isPendingCreate, isPendingUpdate],
  );

  return {
    form,
    onSubmit,
    isPending,
    isLoading,
  };
}
