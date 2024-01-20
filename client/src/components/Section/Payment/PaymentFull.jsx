import { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  Typography,
  TableBody,
  IconButton,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PaymentFull = (paymentList) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <Typography sx={{ fontSize: 20 }}>Pagamentos</Typography>
        <Button variant="contained" href="/pagamentos/criarPagamento">
          CRIAR
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentList.list.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.value}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <IconButton>
                      <EditIcon color="action" />
                    </IconButton>

                    <IconButton>
                      <DeleteIcon color="action" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={paymentList.list.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Linhas por página"}
        />
      </Box>
    </Box>
  );
};

export default PaymentFull;
