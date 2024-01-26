import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate, useParams } from 'react-router-dom';
import { usePagamentos } from '../../context/PagamentosContext';
import { useSaldos } from '../../context/SaldosContext';
import Layout from '../../components/Layout';
import CadastroSucessoModal from '../../components/CadastroSucessoModal';
import EdicaoSucessoModal from '../../components/EdicaoSucessoModal';

const CadastroPagamento = () => {
  const [nome, setNome] = useState('');
  const [valorPagamento, setValorPagamento] = useState('');
  const [valorASerPago, setValorASerPago] = useState('');
  const [valorASerPagoId, setValorASerPagoId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [errors, setErrors] = useState({});
  const [saldoSelecionado, setSaldoSelecionado] = useState(null);
  const navigate = useNavigate();
  const { adicionarPagamento, getPagamentoPorId, atualizarPagamento } = usePagamentos();
  const { saldos, getSaldosDoContexto, atualizarSaldos } = useSaldos();
  const [saldoNome, setSaldoNome] = useState('');
  const [saldoId, setSaldoId] = useState('');
  const [modoEdicao, setModoEdicao] = useState(false);
  const { id } = useParams();
  const [modalAberta, setModalAberta] = useState(false);
  const [cadastroSucessoModalOpen, setCadastroSucessoModalOpen] = useState(false);
  const [edicaoSucessoModalOpen, setEdicaoSucessoModalOpen] = useState(false);

  useEffect(() => {
    if (id != null || id != undefined) {
      const pagamentoExistente = getPagamentoPorId(id);

      if (pagamentoExistente) {
        setNome(pagamentoExistente.nome);
        setDescricao(pagamentoExistente.descricao);
        setValorPagamento(pagamentoExistente.valorPagamento.toString());
        setValorASerPago(pagamentoExistente.valorASerPago.toString());
        setValorASerPagoId(pagamentoExistente.saldoId);
        setSaldoSelecionado(getSaldosDoContexto().find((saldo) => saldo.id === pagamentoExistente.saldoId));
        setModoEdicao(true);
      } else {
        navigate('/home/pagamentos/cadastro');
      }
    }
  }, [id, modoEdicao, navigate, getPagamentoPorId, getSaldosDoContexto]);

  const formatarMoeda = (value) => {
    return parseFloat(value.replace(',', '.')).toFixed(2);
  };

  const validarDuasCasasDecimais = (value) => {
    return /^(\d*\.\d{1,2}|\d+)$/.test(value);
  };

  const handleValorPagamentoChange = (e) => {
    const newValue = e.target.value;
    if (/^\d{0,6}(\.\d{0,2})?$/.test(newValue)) {
      setValorPagamento(newValue);
    }
  };

  const handleSalvar = (e) => {
    e.preventDefault();

    const saldoSelecionado = saldos.find((saldo) => saldo.id === valorASerPagoId);

    const newErrors = {};

    if (!nome) {
      newErrors.nome = 'Campo obrigatório';
    }

    if (!valorPagamento || !validarDuasCasasDecimais(valorPagamento) || parseFloat(valorPagamento) <= 0) {
      newErrors.valorPagamento = 'Informe um valor válido com até duas casas decimais';
    }

    if (!valorASerPagoId) {
      newErrors.valorASerPagoId = 'Selecione um saldo';
    }

    if (saldoSelecionado && saldoSelecionado.valor < parseFloat(valorPagamento)) {
      newErrors.valorASerPagoId = 'Saldo insuficiente para o pagamento';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const novoPagamento = {
        id: modoEdicao ? parseInt(id) : new Date().getTime(),
        nome,
        valorPagamento: parseFloat(formatarMoeda(valorPagamento)),
        valorASerPago: saldoSelecionado ? parseFloat(saldoSelecionado.valor) : 0,
        descricao,
        saldoNome: saldoSelecionado ? saldoSelecionado.nome : '',
        saldoId: saldoSelecionado.id,
      };

      if (modoEdicao) {
        atualizarPagamento(novoPagamento);
        setEdicaoSucessoModalOpen(true);
      } else {
        adicionarPagamento(novoPagamento);
        setCadastroSucessoModalOpen(true);
      }

      const saldoAtualizado = {
        ...saldoSelecionado,
        saldoAtual: saldoSelecionado.saldoAtual - parseFloat(valorPagamento),
      };

      const saldosAtualizados = getSaldosDoContexto().map((saldo) =>
        saldo.id === saldoSelecionado.id ? saldoAtualizado : saldo
      );

      atualizarSaldos(saldosAtualizados);

      setModalAberta(true);
    }
  };

  const handleFecharModal = () => {
    setModalAberta(false);
    navigate('/home/pagamentos');
  };

  return (
    <Layout>
      <div>
        <h2>{modoEdicao ? 'Edição de Pagamento' : 'Cadastro de Pagamento'}</h2>
        <form onSubmit={handleSalvar}>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <TextField
            label="Descrição"
            variant="outlined"
            fullWidth
            margin="normal"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <TextField
            label="Valor do Pagamento"
            variant="outlined"
            fullWidth
            margin="normal"
            value={valorPagamento}
            onChange={handleValorPagamentoChange}
            required
            error={!validarDuasCasasDecimais(valorPagamento)}
            helperText={!validarDuasCasasDecimais(valorPagamento) && 'Informe até duas casas decimais'}
            disabled={modoEdicao}
          />
          <FormControl fullWidth variant="outlined" margin="normal" error={Boolean(errors.valorASerPagoId)}>
            <InputLabel id="select-saldo-label">Selecione o Saldo</InputLabel>
            <Select
              labelId="select-saldo-label"
              id="select-saldo"
              value={valorASerPagoId}
              onChange={(e) => setValorASerPagoId(e.target.value)}
              label="Selecione o Saldo"
              disabled={modoEdicao}
            >
              <MenuItem value="">Selecione um Saldo</MenuItem>
              {saldos.map((saldo) => (
                <MenuItem key={saldo.id} value={saldo.id}>
                  {saldo.nome} - {saldo.saldoAtual}
                </MenuItem>
              ))}
            </Select>
            {errors.valorASerPagoId && <div style={{ color: 'red' }}>{errors.valorASerPagoId}</div>}
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            {modoEdicao ? 'Atualizar Pagamento' : 'Cadastrar Pagamento'}
          </Button>
        </form>
      </div>
      <CadastroSucessoModal open={cadastroSucessoModalOpen} onClose={handleFecharModal} />
      <EdicaoSucessoModal open={edicaoSucessoModalOpen} onClose={handleFecharModal} />
    </Layout>
  );
};

export default CadastroPagamento;
