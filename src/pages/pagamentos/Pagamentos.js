import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Layout from '../../components/Layout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExclusaoSucessoModal from '../../components/ExclusaoSucessoModal';
import { usePagamentos } from '../../context/PagamentosContext';
import { useSaldos } from '../../context/SaldosContext';

const Pagamentos = () => {
  const { pagamentos, excluirPagamento } = usePagamentos();
  const { devolverValorConsumido } = useSaldos(); 
  const [exclusaoSucessoModalOpen, setExclusaoSucessoModalOpen] = useState(false);
  const [idExclusao, setIdExclusao] = useState(null);
  const navigate = useNavigate();

  const handleExcluir = async (id) => {
    setIdExclusao(id);

    const pagamento = pagamentos.find((p) => p.id === id);

    await excluirPagamento(id);
    setExclusaoSucessoModalOpen(true);
    devolverValorConsumido(pagamento.saldoId, pagamento.valorPagamento);
  };

  const handleCloseExclusaoSucessoModal = () => {
    setExclusaoSucessoModalOpen(false);
    navigate(`/home/pagamentos/edicao/${idExclusao}`);
  };

  return (
    <Layout>
      <div>
        <h2>Lista de Pagamentos</h2>
        <Button component={Link} to="/home/pagamentos/cadastro" variant="contained" color="primary">
          Novo Pagamento
        </Button>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Valor do Pagamento</TableCell>
                <TableCell>Saldo Utilizado</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagamentos.map((pagamento) => (
                <TableRow key={pagamento.id}>
                  <TableCell>{pagamento.id}</TableCell>
                  <TableCell>
                    <Link to={`/home/pagamentos/detalhes/${pagamento.id}`}>{pagamento.nome}</Link>
                  </TableCell>
                  <TableCell>{pagamento.valorPagamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                  <TableCell>{pagamento.saldoNome}</TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`/home/pagamentos/detalhes/${pagamento.id}`} aria-label="Visualizar detalhes">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton component={Link} to={`/home/pagamentos/edicao/${pagamento.id}`} aria-label="Editar">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleExcluir(pagamento.id)} color="secondary" aria-label="Excluir">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ExclusaoSucessoModal open={exclusaoSucessoModalOpen} onClose={handleCloseExclusaoSucessoModal} />
      </div>
    </Layout>
  );
};

export default Pagamentos;
