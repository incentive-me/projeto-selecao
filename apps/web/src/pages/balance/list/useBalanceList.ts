import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { useBalanceApi } from 'services/api/balance';
import { AxiosError } from 'axios';

export function useBalanceList() {
  const { deleteById, findAll } = useBalanceApi();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    data: balances,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['balance', 'findAll'],
    queryFn: () => findAll(),
  });

  const { mutateAsync: deleteBalanceById, isPending: isPendingDelete } =
    useMutation({
      mutationKey: ['balance', 'delete'],
      mutationFn: (id: string) => deleteById(id),
      onSuccess() {
        enqueueSnackbar('Saldo deletado com sucesso!', {
          variant: 'success',
        });

        refetch();
      },
      onError(error: AxiosError<{ error: string }>) {
        if (
          error?.response?.data.error ===
          'This user is already linked with a payment'
        )
          return enqueueSnackbar(
            'Este saldo está vinculado a um pagamento e não pode ser excluido.',
            {
              variant: 'error',
            },
          );

        enqueueSnackbar('Erro ao deletar saldo.', {
          variant: 'error',
        });
      },
    });

  const isLoading = useMemo(
    () => isFetching || isPendingDelete,
    [isFetching, isPendingDelete],
  );

  const goToEditBalancePageById = (id: string) =>
    navigate(generatePath('/balance/edit/:id', { id }));

  const goToCreateBalancePage = () => navigate('/balance/edit');

  return {
    isLoading,
    balances,
    deleteBalanceById,
    goToEditBalancePageById,
    goToCreateBalancePage,
  };
}
