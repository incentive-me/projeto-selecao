import { DialogProps } from '@mui/material';
import { DeleteDialog } from 'components/dialog';
import { usePaymentDeleteDialog } from './usePaymentDeleteDialog';

type PaymentDeleteDialogProps = DialogProps & {
  paymentId: string;
  handleClose: () => void;
};

export function PaymentDeleteDialog({
  paymentId,
  handleClose,
  ...props
}: PaymentDeleteDialogProps) {
  const { isPending, deletePaymentById } = usePaymentDeleteDialog(handleClose);

  return (
    <DeleteDialog
      {...props}
      title="Excluir pagamento?"
      message="Se excluir este pagamento, esta ação não poderá ser revertida. Tem
            certeza que deseja excluir?"
      onCancel={handleClose}
      onConfirm={() => deletePaymentById(paymentId)}
      isLoading={isPending}
    />
  );
}
