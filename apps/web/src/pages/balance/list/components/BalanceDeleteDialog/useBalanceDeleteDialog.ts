import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useBalanceApi } from 'services/api/balance';

export function useBalanceDeleteDialog(handleClose: () => void) {
  const { deleteById } = useBalanceApi();
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const { mutateAsync: deleteBalanceById, isPending } = useMutation({
    mutationKey: ['balance', 'delete'],
    mutationFn: (id: string) => deleteById(id),
    onSuccess() {
      enqueueSnackbar('Saldo deletado com sucesso!', {
        variant: 'success',
      });

      queryClient.invalidateQueries({ queryKey: ['balance', 'findAll'] });

      handleClose();
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

  return {
    deleteBalanceById,
    isPending,
  };
}
