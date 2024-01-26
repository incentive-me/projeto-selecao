import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './pages/Login';
import Home from './pages/Home';
import Pagamentos from './pages/pagamentos/Pagamentos';
import CadastroPagamento from './pages/pagamentos/CadastroPagamento';
import DetalhesPagamento from './pages/pagamentos/DetalhesPagamento';
import Saldos from './pages/saldos/Saldos';
import CadastroSaldo from './pages/saldos/CadastroSaldo';
import DetalhesSaldo from './pages/saldos/DetalhesSaldo';
import { SaldosProvider } from './context/SaldosContext';
import { PagamentosProvider } from './context/PagamentosContext';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SaldosProvider>
          <PagamentosProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/home/*" element={<Home />} />
              <Route path="/home/pagamentos" element={<Pagamentos />} />
              <Route path="/home/pagamentos/cadastro" element={<CadastroPagamento />} />
              <Route path="/home/saldos" element={<Saldos />} />
              <Route path="/home/saldos/cadastro" element={<CadastroSaldo />} />
              <Route path="/home/saldos/edicao/:id" element={<CadastroSaldo />} />
              <Route path="/home/pagamentos/detalhes/:id" element={<DetalhesPagamento />} />
              <Route path="/home/pagamentos/edicao/:id" element={<CadastroPagamento />} />
              <Route path="/home/saldos/detalhes/:id" element={<DetalhesSaldo />} />
            </Routes>
          </PagamentosProvider>
        </SaldosProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
