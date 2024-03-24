import { useQuery } from '@tanstack/react-query';
import { useModal } from 'mui-modal-provider';
import { generatePath, useNavigate } from 'react-router-dom';
import { usePaymentApi } from 'services/api/payment';
import { PaymentDeleteDialog } from './components';

export function usePaymentList() {
  const { findAll } = usePaymentApi();
  const { showModal } = useModal();

  const navigate = useNavigate();

  const {
    data: payments,
    isFetching,
    refetch,
    isError,
  } = useQuery({
    queryKey: ['payment', 'findAll'],
    queryFn: () => findAll(),
  });

  const goToEditPaymentPageById = (id: string) =>
    navigate(generatePath('/payment/edit/:id', { id }));

  const goToCreatePaymentPage = () => navigate('/payment/edit');

  const openDeleteDialog = (paymentId: string) => {
    const modal = showModal(PaymentDeleteDialog, {
      paymentId,
      handleClose() {
        modal.hide();
      },
    });
  };

  return {
    isLoading: isFetching,
    payments,
    isError,
    refetch,
    goToEditPaymentPageById,
    goToCreatePaymentPage,
    openDeleteDialog,
  };
}
