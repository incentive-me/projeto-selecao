import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Balance } from '../redux/balance.slice';
import { Link } from 'react-router-dom';

interface Column {
  id: 'balanceName' | 'description' | 'initialValue' | 'valueUsed' | 'totalValue';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'balanceName', label: 'Nome', minWidth: 40 },
  { id: 'description', label: 'Descrição', minWidth: 40 },
  {
    id: 'initialValue',
    label: 'Valor Inicial',
    minWidth: 40,
    align: 'right',
    format: (value: number) => `R$ ${value.toFixed(2)}`,
  },
  {
    id: 'valueUsed',
    label: 'Valor Utilizado',
    minWidth: 40,
    align: 'right',
    format: (value: number) => `R$ ${value.toFixed(2)}`,
  },
  {
    id: 'totalValue',
    label: 'Valor restante',
    minWidth: 40,
    align: 'right',
    format: (value: number) => `R$ ${value.toFixed(2)}`,
  }
];



export default function BalanceTable({rows}:{rows: Balance[]}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={style.container}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <Link to="/saldos/editar" state={row}>
                        <IconButton><Edit /></IconButton>
                      </Link>
                        <IconButton><Delete /></IconButton>
                    </TableCell>
                </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const style = {
  container: {
    width: '100%', 
    overflow: 'hidden'
  }
}