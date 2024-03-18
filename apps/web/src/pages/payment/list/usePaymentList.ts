import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { usePaymentApi } from 'services/api/payment';

export function usePaymentList() {
  const { deleteById, findAll } = usePaymentApi();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    data: payments,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['payment', 'findAll'],
    queryFn: () => findAll(),
  });

  const { mutateAsync: deletePaymentById, isPending: isPendingDelete } =
    useMutation({
      mutationKey: ['payment', 'delete'],
      mutationFn: (id: string) => deleteById(id),
      onSuccess() {
        enqueueSnackbar('Saldo deletado com sucesso!', {
          variant: 'success',
        });

        refetch();
      },
    });

  const isLoading = useMemo(
    () => isFetching || isPendingDelete,
    [isFetching, isPendingDelete],
  );

  const goToEditPaymentPageById = (id: string) =>
    navigate(generatePath('/payment/edit/:id', { id }));

  const goToCreatePaymentPage = () => navigate('/payment/edit');

  return {
    isLoading,
    payments,
    deletePaymentById,
    goToEditPaymentPageById,
    goToCreatePaymentPage,
  };
}
