import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { TableBodyHandler } from 'components/table';
import {
  PaymentTableEmptyFeedback,
  PaymentTableRowSkeleton,
} from './components';
import { usePaymentList } from './usePaymentList';

export function PaymentList() {
  const {
    payments,
    isLoading,
    isError,
    refetch,
    openDeleteDialog,
    goToEditPaymentPageById,
    goToCreatePaymentPage,
  } = usePaymentList();

  return (
    <Stack spacing={4}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Pagamentos</Typography>

        <Button variant="contained" onClick={goToCreatePaymentPage}>
          Criar
        </Button>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ '> th': { fontWeight: 'bold' } }}>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableBodyHandler
              empty={{
                length: payments?.length || 0,
                feedback: (
                  <PaymentTableEmptyFeedback
                    buttonProps={{ onClick: goToCreatePaymentPage }}
                  />
                ),
              }}
              loading={{
                isLoading,
                loader: <PaymentTableRowSkeleton />,
              }}
              error={{
                isError,
                refetch,
              }}
            >
              {payments?.map(({ id, description, value, name }) => (
                <TableRow key={id}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell>
                    {value.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => goToEditPaymentPageById(id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => openDeleteDialog(id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBodyHandler>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
