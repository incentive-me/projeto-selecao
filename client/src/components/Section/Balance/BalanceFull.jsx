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

const BalanceFull = (balanceList) => {
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
        <Typography sx={{ fontSize: 20 }}>Saldos</Typography>
        <Button variant="contained" href="/saldos/criar">
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
                <TableCell>Valor Inicial</TableCell>
                <TableCell>Valor Utilizado</TableCell>
                <TableCell>Valor Restante</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {balanceList.list.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    R$ {row.initial_value}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    R$ {row.used_value}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    R$ {row.remaining_value}
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
          count={balanceList.list.length}
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

export default BalanceFull;
