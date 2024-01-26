import React, { createContext, useContext, useState } from 'react';

const PagamentosContext = createContext();

export const PagamentosProvider = ({ children }) => {
  const [pagamentos, setPagamentos] = useState([]);

  const adicionarPagamento = (novoPagamento) => {
    setPagamentos([...pagamentos, novoPagamento]);
  };

  const excluirPagamento = (id) => {
    const pagamentosAtualizados = pagamentos.filter((pagamento) => pagamento.id !== id);
    setPagamentos(pagamentosAtualizados);
  };

  const getPagamentoPorId = (id) => {
    const pagamentoId = parseInt(id, 10);
    return pagamentos.find((pagamento) => pagamento.id === pagamentoId);
  };

  const atualizarPagamento = (novoPagamento) => {
    const pagamentosAtualizados = pagamentos.map((pagamento) =>
      pagamento.id === novoPagamento.id ? novoPagamento : pagamento
    );
    setPagamentos(pagamentosAtualizados);
  };

  const verificarPagamentosVinculados = (id) => {
    const saldoId = parseInt(id, 10);
    return pagamentos.find((pagamento) => pagamento.saldoId === saldoId);
  };

  return (
    <PagamentosContext.Provider value={{ pagamentos, adicionarPagamento, excluirPagamento, getPagamentoPorId, atualizarPagamento, verificarPagamentosVinculados }}>
      {children}
    </PagamentosContext.Provider>
  );
};

export const usePagamentos = () => {
  const context = useContext(PagamentosContext);
  if (!context) {
    throw new Error('usePagamentos deve ser usado dentro de um PagamentosProvider');
  }
  return context;
};
