import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { useBalanceApi } from 'services/api/balance';

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
