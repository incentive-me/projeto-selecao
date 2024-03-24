import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { usePaymentApi } from 'services/api/payment';

export function usePaymentDeleteDialog(handleClose: () => void) {
  const { deleteById } = usePaymentApi();
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const { mutateAsync: deletePaymentById, isPending } = useMutation({
    mutationKey: ['payment', 'delete'],
    mutationFn: (id: string) => deleteById(id),
    onSuccess() {
      enqueueSnackbar('Pagamento deletado com sucesso!', {
        variant: 'success',
      });

      queryClient.invalidateQueries({ queryKey: ['payment', 'findAll'] });

      handleClose();
    },
    onError() {
      enqueueSnackbar('Erro ao deletar pagamento.', {
        variant: 'error',
      });
    },
  });

  return {
    deletePaymentById,
    isPending,
  };
}
