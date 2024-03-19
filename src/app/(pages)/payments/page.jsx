"use client"

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FirstPageIcon  from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft  from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight  from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableFooter,
  TablePagination,
  Button,
} from '@mui/material';

import { onListPayments, onRemovePaymentByUuid } from '@/domain/payments'
import { setAlertShow } from '@/app/store'

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => onPageChange(event, 0);
  const handleBackButtonClick = (event) => onPageChange(event, page - 1);
  const handleNextButtonClick = (event) => onPageChange(event, page + 1);
  const handleLastPageButtonClick = (event) => onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));

  return (
    <div className="flex">
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="primeira página">
        <FirstPageIcon />
      </IconButton>

      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="página anterior">
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="próxima página">
        <KeyboardArrowRight />
      </IconButton>

      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="ultima página">
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

export default function Payments() {
  const router = useRouter()
  const dispatch = useDispatch()

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [payments, setPayments] = useState([]);

  // impede que o layout "se perca" quando chegar na ultima página
  const emptyRows = page > 0
    ? Math.max(0, (1 + page) * rowsPerPage - payments.length)
    : 0;

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleEditPayment = (uuid) => router.push(`payments/${uuid}`)
  const handleRemovePayment = async (uuid) => {
    const result = await onRemovePaymentByUuid(uuid)

    if (result.status !== 200) {
      dispatch(setAlertShow({
        open: true, 
        message: result.data.message,
        variant: 'error'
      }))
      return
    }

    setPayments(result.data)
    dispatch(setAlertShow({
      open: true, 
      message: 'Pagamento removido!',
      variant: 'success'
    }))
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    onListPayments().then(resolve => {
      if (resolve.status === 200) {
        setPayments(resolve.data)
      }
    })
  }, [])

  return (
    <div>
      <div className="px-6 pt-6">
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={8} sm={10}>
            <h5 className="text-2xl">Pagamentos</h5>
          </Grid>

          <Grid item xs={4} sm={2}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              onClick={() => router.push('payments/create')}>
              Criar
            </Button>
          </Grid>
        </Grid>
      </div>

      <div className="px-6 pt-8">
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table sx={{ minWidth: 650, boxShadow: 'none' }}>
            <TableHead sx={{ 'td, th': { border: 'none' } }}>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : payments).map((row) => (
                  <TableRow key={row.uuid} sx={{ 'td, th': { border: 'none' } }}>
                    <TableCell component="th" scope="row">
                      {row.display_name}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="delete" size="small" onClick={() => handleEditPayment(row.uuid)}>
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton aria-label="delete" size="small" onClick={() => handleRemovePayment(row.uuid)}>
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }} sx={{ 'td, th': { border: 'none' } }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
            </TableBody>

            <TableFooter sx={{ 'td, th': { border: 'none' } }}>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  count={payments.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: { 'aria-label': 'Itens por página' },
                      native: true,
                    },
                  }}
                  labelRowsPerPage="Pagamentos por página"
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions} />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
