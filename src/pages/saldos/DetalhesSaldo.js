import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Layout from '../../components/Layout';
import { useSaldos } from '../../context/SaldosContext';

const DetalhesSaldo = () => {
  const { id } = useParams();
  const { getSaldoPorId } = useSaldos();
  const saldo = getSaldoPorId(id);

  useEffect(() => {
  }, [id]);

  if (!saldo) {
    return (
      <Layout>
        <div>
          <Typography variant="h6">Saldo não encontrado</Typography>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <Typography variant="h6">Detalhes do Saldo</Typography>
        <Typography>ID: {saldo.id}</Typography>
        <Typography>Nome: {saldo.nome}</Typography>
        <Typography>Valor Inicial: {saldo.valor}</Typography>
        <Typography>Saldo Atual: {saldo.saldoAtual}</Typography>
      </div>
    </Layout>
  );
};

export default DetalhesSaldo;
