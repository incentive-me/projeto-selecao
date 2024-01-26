import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Layout from '../../components/Layout';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ValidacaoSaldoModal from '../../components/ValidacaoSaldoModal';
import ExclusaoSucessoModal from '../../components/ExclusaoSucessoModal';
import { useSaldos } from '../../context/SaldosContext';
import { usePagamentos } from '../../context/PagamentosContext';

const formatarValorMonetario = (valor) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
};

const Saldos = () => {
  const { saldos, excluirSaldo } = useSaldos();
  const { verificarPagamentosVinculados } = usePagamentos();
  const [exclusaoSucessoModalOpen, setExclusaoSucessoModalOpen] = useState(false);
  const [validacaoSaldoModalOpen, setValidacaoSaldoModalOpen] = useState(false);
  const [idExclusao, setIdExclusao] = useState(null);

  const handleExcluir = async (id) => {
    setIdExclusao(id);

    const temPagamentosVinculados = verificarPagamentosVinculados(id);

    if (temPagamentosVinculados) {
      setValidacaoSaldoModalOpen(true);
    } else {
      excluirSaldo(id);
      setExclusaoSucessoModalOpen(true);
    }
  };

  return (
    <Layout>
      <div>
        <h2>Lista de Saldos</h2>
        <Button component={Link} to="/home/saldos/cadastro" variant="contained" color="primary">
          Novo Saldo
        </Button>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Valor inicial</TableCell>
                <TableCell>Saldo atual</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {saldos.map((saldo) => (
                <TableRow key={saldo.id}>
                  <TableCell>{saldo.id}</TableCell>
                  <TableCell>{saldo.nome}</TableCell>
                  <TableCell>{formatarValorMonetario(saldo.valor)}</TableCell>
                  <TableCell>{formatarValorMonetario(saldo.saldoAtual)}</TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`/home/saldos/detalhes/${saldo.id}`} aria-label="Visualizar detalhes">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton component={Link} to={`/home/saldos/edicao/${saldo.id}`} aria-label="Editar">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleExcluir(saldo.id)} color="secondary" aria-label="Excluir">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ValidacaoSaldoModal open={validacaoSaldoModalOpen} onClose={() => setValidacaoSaldoModalOpen(false)} />
        <ExclusaoSucessoModal open={exclusaoSucessoModalOpen} onClose={() => setExclusaoSucessoModalOpen(false)} />
      </div>
    </Layout>
  );
};

export default Saldos;
