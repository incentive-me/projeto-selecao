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
  BalanceTableEmptyFeedback,
  BalanceTableRowSkeleton,
} from './components';
import { useBalanceList } from './useBalanceList';

export function BalanceList() {
  const {
    balances,
    isLoading,
    isError,
    refetch,
    goToEditBalancePageById,
    goToCreateBalancePage,
    openDeleteDialog,
  } = useBalanceList();

  return (
    <Stack spacing={4}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Saldos</Typography>

        <Button variant="contained" onClick={goToCreateBalancePage}>
          Criar
        </Button>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ '> th': { fontWeight: 'bold' } }}>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Valor inicial</TableCell>
              <TableCell>Valor utilizado</TableCell>
              <TableCell>Valor restante</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableBodyHandler
              empty={{
                length: balances?.length || 0,
                feedback: (
                  <BalanceTableEmptyFeedback
                    buttonProps={{ onClick: goToCreateBalancePage }}
                  />
                ),
              }}
              loading={{
                isLoading,
                loader: <BalanceTableRowSkeleton />,
              }}
              error={{
                isError,
                refetch,
              }}
            >
              {balances?.map(
                ({
                  id,
                  description,
                  initialValue,
                  name,
                  remainingValue,
                  usedValue,
                }) => (
                  <TableRow key={id}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell>
                      {initialValue.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                    <TableCell>
                      {usedValue.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                    <TableCell>
                      {remainingValue.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => goToEditBalancePageById(id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => openDeleteDialog(id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBodyHandler>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
