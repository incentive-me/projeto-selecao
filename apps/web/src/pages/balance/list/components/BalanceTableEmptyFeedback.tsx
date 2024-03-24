import { Button, ButtonProps, Typography } from '@mui/material';
import { TableFeedback } from 'components/table';

type BalanceTableEmptyFeedbackProps = {
  buttonProps: ButtonProps;
};

export function BalanceTableEmptyFeedback({
  buttonProps,
}: BalanceTableEmptyFeedbackProps) {
  return (
    <TableFeedback>
      <Typography variant="h6">Não há saldos para exibir</Typography>

      <Button variant="contained" {...buttonProps}>
        Clique aqui para criar um saldo
      </Button>
    </TableFeedback>
  );
}
