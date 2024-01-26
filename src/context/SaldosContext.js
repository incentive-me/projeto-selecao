import React, { createContext, useContext, useState } from 'react';

const SaldosContext = createContext();

export const SaldosProvider = ({ children }) => {
  const [saldos, setSaldos] = useState([]);

  const adicionarSaldo = (novoSaldo) => {
    setSaldos([...saldos, { ...novoSaldo, saldoInicial: novoSaldo.valor, saldoAtual: novoSaldo.valor }]);
  };

  const atualizarSaldo = (novoSaldo) => {
    const saldosAtualizados = saldos.map((saldo) =>
      saldo.id === novoSaldo.id ? novoSaldo : saldo
    );
    setSaldos(saldosAtualizados);
  };

  const excluirSaldo = (id) => {
    const saldosAtualizados = saldos.filter((saldo) => saldo.id !== id);
    setSaldos(saldosAtualizados);
  };

  const getSaldosDoContexto = () => {
    return saldos;
  };

  const atualizarSaldos = (novosSaldos) => {
    setSaldos(novosSaldos);
  };

  const getSaldoPorId = (id) => {
    const saldoId = parseInt(id, 10);
    return saldos.find((saldo) => saldo.id === saldoId);
  };

  const devolverValorConsumido = (id, valorDevolucao) => {
    const saldoId = parseInt(id, 10);

    const saldosAtualizados = saldos.map((saldo) =>
      saldo.id === saldoId
        ? {
          ...saldo,
          saldoAtual: saldo.saldoAtual + valorDevolucao,
        }
        : saldo
    );
    setSaldos(saldosAtualizados);
  };

  return (
    <SaldosContext.Provider
      value={{
        saldos,
        adicionarSaldo,
        atualizarSaldo,
        getSaldosDoContexto,
        atualizarSaldos,
        getSaldoPorId,
        excluirSaldo,
        devolverValorConsumido,
      }}
    >
      {children}
    </SaldosContext.Provider>
  );
};

export const useSaldos = () => {
  const context = useContext(SaldosContext);
  if (!context) {
    throw new Error('useSaldos deve ser usado dentro de um SaldosProvider');
  }
  return context;
};
