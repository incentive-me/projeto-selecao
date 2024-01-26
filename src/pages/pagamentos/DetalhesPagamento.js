import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Layout from '../../components/Layout';
import { usePagamentos } from '../../context/PagamentosContext';

const DetalhesPagamento = () => {
  const { id } = useParams();
  const { pagamentos } = usePagamentos();

  const pagamento = pagamentos.find((p) => p.id === parseInt(id, 10));

  if (!pagamento) {
    return (
      <Layout>
        <div>
          <Typography variant="h6">Pagamento não encontrado.</Typography>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <Typography variant="h4" gutterBottom>
          Detalhes do Pagamento
        </Typography>
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>
            ID: {pagamento.id}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Nome: {pagamento.nome}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Valor do Pagamento: {pagamento.valorPagamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Saldo Utilizado: {pagamento.saldoNome}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Descrição: {pagamento.descricao}
          </Typography>
        </Paper>
      </div>
    </Layout>
  );
};

export default DetalhesPagamento;
