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
import { useState } from 'react';

function mask (value)  {
  // XXX TODO :: move to support
  value = value.toString().replace('.', '').replace(',', '').replace(/\D/g, '')

  const result = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 })
    .format(parseFloat(value) / 100)

  return 'R$ ' + result
}

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
  const payments = [
    { uuid: '1213ads21asd', display_name: 'Pedido de pagamento', description: 'Uma descrição', value: 2500 },
    { uuid: '1dsadd213ads21asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213as2ds21asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd21s3ads21mnasd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd2132ads21asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213adsd2z1asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads2x1asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads21casd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads21zxvasd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads21acsd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads21mcsd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads21vasd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads21basd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads212asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads211asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads21nasd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads21fdsdfasd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads21as21d', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads2q1asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads2123asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads251asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads27651asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: 'd1dsadd213ads21asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads2681asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads201asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads321asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads5421asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
    { uuid: '1dsadd213ads231asd', display_name: 'Pedido de pagamento 2', description: 'Uma descrição 2', value: 2500.55 },
  ].sort((a, b) => (a.price < b.price ? -1 : 1))

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0
    ? Math.max(0, (1 + page) * rowsPerPage - payments.length)
    : 0;

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div className="px-6 pt-6">
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={8} sm={10}>
            <h5 className="text-2xl">Pagamentos</h5>
          </Grid>

          <Grid item xs={4} sm={2}>
            {/* XXX TODO :: Adicionar a ação para criar pagamentos */}
            <Button
              fullWidth
              type="submit"
              variant="contained">
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
                    <TableCell>{mask(row.value)}</TableCell>
                    <TableCell align="right">
                      {/* XXX TODO :: Adicionar as ações para editar e remover */}
                      <IconButton aria-label="delete" size="small">
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton aria-label="delete" size="small">
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
