import { useQuery } from '@tanstack/react-query';
import { useModal } from 'mui-modal-provider';
import { generatePath, useNavigate } from 'react-router-dom';
import { useBalanceApi } from 'services/api/balance';
import { BalanceDeleteDialog } from './components';

export function useBalanceList() {
  const { findAll } = useBalanceApi();

  const navigate = useNavigate();

  const {
    data: balances,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['balance', 'findAll'],
    queryFn: () => findAll(),
  });

  const goToEditBalancePageById = (id: string) =>
    navigate(generatePath('/balance/edit/:id', { id }));

  const goToCreateBalancePage = () => navigate('/balance/edit');

  const { showModal } = useModal();

  const openDeleteDialog = (balanceId: string) => {
    const modal = showModal(BalanceDeleteDialog, {
      balanceId,
      handleClose() {
        modal.hide();
      },
    });
  };

  return {
    isLoading: isFetching,
    balances,
    isError,
    openDeleteDialog,
    refetch,
    goToEditBalancePageById,
    goToCreateBalancePage,
  };
}
