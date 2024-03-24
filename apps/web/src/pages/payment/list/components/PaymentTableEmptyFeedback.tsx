import { Button, ButtonProps, Typography } from '@mui/material';
import { TableFeedback } from 'components/table';

type PaymentTableEmptyFeedbackProps = {
  buttonProps: ButtonProps;
};

export function PaymentTableEmptyFeedback({
  buttonProps,
}: PaymentTableEmptyFeedbackProps) {
  return (
    <TableFeedback>
      <Typography variant="h6">Não há pagamentos para exibir</Typography>

      <Button variant="contained" {...buttonProps}>
        Clique aqui para criar um pagamento
      </Button>
    </TableFeedback>
  );
}
