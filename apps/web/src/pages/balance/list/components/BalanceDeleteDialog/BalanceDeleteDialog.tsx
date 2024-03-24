import { DialogProps } from '@mui/material';
import { DeleteDialog } from 'components/dialog';
import { useBalanceDeleteDialog } from './useBalanceDeleteDialog';

type BalanceDeleteDialogProps = DialogProps & {
  balanceId: string;
  handleClose: () => void;
};

export function BalanceDeleteDialog({
  balanceId,
  handleClose,
  ...props
}: BalanceDeleteDialogProps) {
  const { isPending, deleteBalanceById } = useBalanceDeleteDialog(handleClose);

  return (
    <DeleteDialog
      {...props}
      title="Excluir saldo?"
      message="Se excluir este saldo, esta ação não poderá ser revertida. Tem
            certeza que deseja excluir?"
      onCancel={handleClose}
      onConfirm={() => deleteBalanceById(balanceId)}
      isLoading={isPending}
    />
  );
}
