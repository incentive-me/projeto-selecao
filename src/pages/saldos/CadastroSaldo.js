import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useSaldos } from '../../context/SaldosContext';
import Layout from '../../components/Layout';

const CadastroSaldo = () => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [saldoAtual, setSaldoAtual] = useState('');
  const navigate = useNavigate();
  const { adicionarSaldo, getSaldoPorId, atualizarSaldo } = useSaldos();
  const { id } = useParams();
  const modoEdicao = Boolean(id);

  useEffect(() => {
    if (modoEdicao) {
      const saldoEditado = getSaldoPorId(id);
      setNome(saldoEditado.nome);
      setValor(saldoEditado.valor);
      setSaldoAtual(saldoEditado.saldoAtual);
    }
  }, [id, getSaldoPorId, modoEdicao]);

  const validarDuasCasasDecimais = (value) => {
    return /^(\d*\.\d{1,2}|\d+,\d{1,2})$/.test(value);
  };

  const handleValorChange = (e) => {
    const newValue = e.target.value;

    if (/^\d{0,6}(\.\d{0,2})?$/.test(newValue)) {
      setValor(newValue);
    }
  };

  const handleSalvar = () => {
    if (validarDuasCasasDecimais(valor)) {
      setNome((prevNome) => prevNome);
      const novoSaldo = { id: new Date().getTime(), nome, valor, saldoAtual: modoEdicao ? saldoAtual : valor };

      if (modoEdicao) {
        atualizarSaldo(novoSaldo);
      } else {
        adicionarSaldo(novoSaldo);
      }

      navigate('/home/saldos');
    } else {
      console.error('Valor inválido');
    }
  };

  return (
    <Layout>
      <div>
        <h2>{modoEdicao ? 'Edição de Saldo' : 'Cadastro de Saldo'}</h2>
        <form onSubmit={handleSalvar}>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <TextField
            label="Valor"
            variant="outlined"
            fullWidth
            margin="normal"
            value={valor}
            onChange={handleValorChange}
            required
            disabled={modoEdicao}
            error={!validarDuasCasasDecimais(valor)}
            helperText={!validarDuasCasasDecimais(valor) && 'Informe até duas casas decimais'}
          />
          {modoEdicao && (
            <TextField
              label="Saldo Atual"
              variant="outlined"
              fullWidth
              margin="normal"
              value={saldoAtual}
              disabled
            />
          )}
          <Button type="submit" variant="contained" color="primary">
            {modoEdicao ? 'Salvar Edição' : 'Cadastrar'}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default CadastroSaldo;